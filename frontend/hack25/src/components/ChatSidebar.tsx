import React from "react";
import "../pages/Chat_bot.css";
import { Conversation } from "./types/chat"; // Si separaste las interfaces

interface ChatSidebarProps {
  conversations: Conversation[];
  onSelectChat: (id: number) => void;
  activeChatId: number;
  onNewChat: () => void;
  onDeleteChat: (id: number) => void;
}

export default function ChatSidebar({
  conversations,
  onSelectChat,
  activeChatId,
  onNewChat,
  onDeleteChat
}: ChatSidebarProps) {
  return (
    <aside className="chat-sidebar">
      <button className="new-chat-btn" onClick={onNewChat}>
        + New Chat
      </button>
      <ul className="chat-list">
        {conversations.map((chat) => (
          <li
            key={chat.id}
            className={`chat-item ${chat.id === activeChatId ? "active" : ""}`}
          >
            <div
              className="chat-content"
              onClick={() => onSelectChat(chat.id)}
            >
              {chat.title}
            </div>
            <button
              className="delete-chat-btn"
              onClick={(e) => {
                e.stopPropagation(); // evita que se seleccione el chat al borrar
                onDeleteChat(chat.id);
              }}
              title="Delete Chat"
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}