// ChatWindow.jsx
import React, { useState } from "react";
import "../pages/Chat_bot.css";
import NavBar from "./NavBar";
export default function ChatWindow({ conversation, onSendMessage }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    onSendMessage(input);
    setInput("");
  };

  return (
    
    
    <>
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
    </>
  );
  
}

