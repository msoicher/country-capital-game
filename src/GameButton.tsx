type GameButtonProps = {
  value: string;
  type: "capital" | "country";
  onClick: (value: string, type: string) => void;
  getBackgroundColor: (value: string, type: string) => string;
};

const GameButton = ({ value, type, onClick, getBackgroundColor }: GameButtonProps) => (
  <button style={{ color: getBackgroundColor(value, type) }} onClick={() => onClick(value, type)}>
    {value}
  </button>
);

export default GameButton;
