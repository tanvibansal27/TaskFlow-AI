import { useState } from "react";
import "./ChatInput.css";

const ChatInput = ({ onSend }) => {

  const [text, setText] = useState("");

  const handleSend = () => {

    if (!text.trim()) return;

    onSend(text);

    setText("");

  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      handleSend();

    }

  };

  return (

    <div className="chat-input-container">

      <input
        type="text"
        placeholder="Ask anything about your project..."
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSend}>
        ➜
      </button>

    </div>

  );

};

export default ChatInput;