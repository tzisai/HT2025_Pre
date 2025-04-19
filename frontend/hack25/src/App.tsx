import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatBot from "./pages/Chatbot";
function App() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    
    null
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat_bot" element={<ChatBot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
