import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "./Chat_bot.css";
import ChatWindow from "../components/ChatWindow";
import ChatSidebar from "../components/ChatSidebar";


// Dentro de tu archivo ChatBot.tsx o en un archivo de tipos aparte (e.g., types/chat.ts)

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface Conversation {
  id: number;
  title: string;
  messages: Message[];
}

interface ChatSidebarProps {
  conversations: Conversation[];
  onSelectChat: (id: number) => void;
  activeChatId: number;
  onNewChat: () => void;
  onDeleteChat: (id: number) => void;
}

interface ChatWindowProps {
  conversation: Conversation | undefined | null; // Puede ser undefined o null si no hay chat activo
  onSendMessage: (text: string) => void;
}

interface ChatBotState {
  sidebarVisible: boolean;
  conversations: Conversation[];
  activeChatId: number;
}

export default function ChatBot() {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const toggleSidebar = (): void => setSidebarVisible(!sidebarVisible);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      title: "New Chat",
      messages: [{ sender: "bot", text: "Hi! How can I help you today?" }],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState<number>(1);

  const deleteConversation = (id: number): void => {
    const filtered = conversations.filter(chat => chat.id !== id);
    setConversations(filtered);
  
    // Si eliminaste el chat activo, cambia al primero que quede (si hay)
    if (id === activeChatId && filtered.length > 0) {
      setActiveChatId(filtered[0].id);
    } else if (filtered.length === 0) {
      // Si ya no queda ninguno, crear uno nuevo automáticamente
      createNewConversation();
    }
  };


  const createNewConversation = (): void => {
    const newId = conversations.length + 1;
    const newConversation: Conversation = {
      id: newId,
      title: `New Chat ${newId}`,
      messages: [{ sender: "bot", text: "Hi! How can I help you today?" }],
    };

    setConversations([...conversations, newConversation]);
    setActiveChatId(newId);
  };

  const activeChat: Conversation | undefined = conversations.find((chat) => chat.id === activeChatId);

  const handleSelectChat = (id: number): void => setActiveChatId(id);

  const handleSendMessage = (text: string): void => {
    if (!text.trim()) return;

    const updatedConversations = conversations.map((chat) => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, { sender: "user", text }],
        };
      }
      return chat;
    });

    setConversations(updatedConversations);
  };

  return (
    <>
      <NavBar />

      {/* 🔘 Toggle para pantallas pequeñas */}
      <button className="sidebar-toggle-btn   estilo_toggle_Nova" onClick={toggleSidebar}>

      </button>

      <div className="chatbot-layout">
        {/* ✅ Sidebar solo si está visible */}
        {sidebarVisible && (
          <ChatSidebar
            conversations={conversations}
            onSelectChat={handleSelectChat}
            activeChatId={activeChatId}
            onNewChat={createNewConversation}
            onDeleteChat={deleteConversation}
          />
        )}

        <ChatWindow
          conversation={activeChat}
          onSendMessage={handleSendMessage}
        />
      </div>
    </>
  );
}