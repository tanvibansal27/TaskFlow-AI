import "./PromptCard.css";

const PromptCard = ({
  icon,
  title,
  prompt,
  onClick,
}) => {
  return (
    <div
      className="prompt-card"
      onClick={() => onClick(prompt)}
    >
      <div className="prompt-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{prompt}</p>
    </div>
  );
};

export default PromptCard;