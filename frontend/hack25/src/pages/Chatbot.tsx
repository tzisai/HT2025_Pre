import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import "./Chat_bot.css";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome! Nova is here to help you 😊" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    // Simulación de respuesta
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "(Aqui va lo que escupa la IA :D)" },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-container">
      <NavBar />
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="card" id="chat1" style={{ borderRadius: "15px" }}>
                <div className="card-header bg-info text-white">
                  <p className="mb-0 fw-bold">Nova Chat</p>
                </div>
                <div
                  className="card-body overflow-auto"
                  style={{ height: "400px" }}
                >
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`d-flex mb-3 ${
                        msg.sender === "user"
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className={`p-2 ${
                          msg.sender === "user"
                            ? "bg-light text-dark"
                            : "bg-primary text-white"
                        } rounded`}
                        style={{ maxWidth: "75%" }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="card-footer">
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <button
                    className="btn btn-info mt-2 float-end"
                    onClick={handleSend}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
