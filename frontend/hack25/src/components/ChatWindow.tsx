import React from "react";
import "./Chat_bot.css";

export default function ChatWindow({ conversation }) {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <h4>{conversation?.title}</h4>
      </div>
      <div className="chat-messages">
        {conversation?.messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <textarea placeholder="Type your message..." />
        <button>Send</button>
      </div>
    </div>
  );
}
