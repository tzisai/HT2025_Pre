import React, { useState } from "react";
import "../pages/Chat_bot.css";

// Tipos locales (o puedes importarlos si los tienes en types/chat.ts)
interface Message {
  sender: "user" | "bot";
  text: string;
}

interface Conversation {
  id: number;
  title: string;
  messages: Message[];
}

interface ChatWindowProps {
  conversation: Conversation | null | undefined;
  onSendMessage: (text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, onSendMessage }) => {
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>{conversation?.title || "Chat"}</h3>
      </div>
      <div className="chat-messages">
        {conversation?.messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <textarea
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
