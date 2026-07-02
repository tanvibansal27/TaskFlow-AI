import { useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";

import ChatMessage from "../../components/ai/ChatMessage";
import PromptCard from "../../components/ai/PromptCard";
import ChatInput from "../../components/ai/ChatInput";
import { chatWithAI } from "../../services/aiService";

import "./AI.css";

const AI = () => {
const [loading, setLoading] = useState(false);
const [showCards, setShowCards] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "Hello Tanvi 👋\n\nI'm TaskFlow AI.\n\nI can help you generate tasks, debug code, create documentation and plan your projects.",
    },
  ]);

  const handlePrompt = (prompt) => {
  handleSend(prompt);
};

  const handleSend = async (text) => {

  if (!text.trim()) return;
    setShowCards(false);
  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text,
    },
  ]);

  setLoading(true);

  try {

    const data = await chatWithAI(text);

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: data.reply,
      },
    ]);

  } catch (error) {

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "❌ Unable to connect with AI.",
      },
    ]);

  } finally {

    setLoading(false);

  }

};

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="dashboard-main ai-page">

          {/* Header */}

          <div className="ai-header">

            <h1>🤖 AI Assistant</h1>

            <p>
              Your intelligent project management assistant.
            </p>

          </div>

          {/* Prompt Cards */}

{showCards && (

<div className="prompt-grid">

  <PromptCard
    icon="📝"
    title="Generate Tasks"
    prompt="Generate tasks for my project"
    onClick={handlePrompt}
  />

  <PromptCard
    icon="🐞"
    title="Debug Code"
    prompt="Help me debug my code"
    onClick={handlePrompt}
  />

  <PromptCard
    icon="📅"
    title="Project Timeline"
    prompt="Create a project timeline"
    onClick={handlePrompt}
  />

  <PromptCard
    icon="📄"
    title="Documentation"
    prompt="Generate project documentation"
    onClick={handlePrompt}
  />

  <PromptCard
    icon="💻"
    title="React Code"
    prompt="Generate React component"
    onClick={handlePrompt}
  />

  <PromptCard
    icon="📧"
    title="Professional Email"
    prompt="Write a professional email"
    onClick={handlePrompt}
  />

</div>

)}
{!showCards && (

<button
  className="back-btn"
  onClick={() => {
    setShowCards(true);

    setMessages([
      {
        sender: "ai",
        text:
          "Hello Tanvi 👋\n\nI'm TaskFlow AI.\n\nI can help you generate tasks, debug code, create documentation and plan your projects.",
      },
    ]);
  }}
>
  ← Back to AI Tools
</button>

)}
          {/* Chat */}

          <div className="chat-box">

            {messages.map((msg, index) => (

              <ChatMessage
                key={index}
                message={msg}
              />

            ))}
            {loading && (

  <ChatMessage
    message={{
      sender: "ai",
      text: "🤖 Thinking..."
    }}
  />

)}
          </div>

          {/* Input */}

          <ChatInput
            onSend={handleSend}
          />

        </div>

      </div>

    </div>

  );

};

export default AI;
