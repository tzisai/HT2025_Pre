import React from "react";
import "./Chat_bot.css";

export default function ChatSidebar({ conversations, onSelectChat, activeChatId }) {
  return (
    <div className="chat-sidebar">
      <h3>Chats</h3>
      <ul className="chat-list">
        {conversations.map(chat => (
          <li
            key={chat.id}
            className={`chat-item ${chat.id === activeChatId ? "active" : ""}`}
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
