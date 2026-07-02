import "./ChatMessage.css";

const ChatMessage = ({ message }) => {
  return (
    <div
      className={`chat-message ${
        message.sender === "user"
          ? "user-message"
          : "ai-message"
      }`}
    >
      <div className="message-avatar">
        {message.sender === "user" ? "👤" : "🤖"}
      </div>

      <div className="message-bubble">
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;