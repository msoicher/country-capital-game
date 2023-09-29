import { useEffect, useState } from "react";

const CountryCapitalGame = ({ data }: { data: Record<string, string> }) => {
  const [randomisedCountries, setRandomisedCountries] = useState<string[]>(
    Object.keys(data).sort(() => Math.random() - 0.5)
  );
  const [randomisedCapitals, setRandomisedCapitals] = useState<string[]>(
    Object.values(data).sort(() => Math.random() - 0.5)
  );
  const [hasWon, setHasWon] = useState(false);
  const [gameState, setGameState] = useState<"nothing" | "waiting" | "error">("nothing");

  type ButtonType = { value: string; type: string };
  const [buttonsClicked, setButtonsClicked] = useState<ButtonType[]>([]);

  useEffect(() => {
    if (buttonsClicked?.length === 0) return;
    if (buttonsClicked?.length === 1) {
      setGameState("waiting");
      return;
    }
    const country = buttonsClicked.find((b: ButtonType) => b.type === "country")?.value || "";
    const capital = buttonsClicked.find((b: ButtonType) => b.type === "capital")?.value || "";

    if (data[country] === capital) {
      setRandomisedCountries((prev) => prev.filter((c) => c !== country));
      setRandomisedCapitals((prev) => prev.filter((c) => c !== capital));
      setGameState("nothing");
      setButtonsClicked([]);
    } else {
      setGameState("error");
    }
  }, [buttonsClicked]);

  useEffect(() => {
    if (randomisedCountries.length === 0) setHasWon(true);
  }, [randomisedCountries]);

  const onTileClick = (value: string, type: string) => {
    if (gameState === "error") {
      setButtonsClicked([{ value, type }]);
    } else {
      setButtonsClicked((prev: any) => [...prev, { type, value }]);
    }
  };

  const isSelected = (value: string, type: string) =>
    buttonsClicked && buttonsClicked.some((b: any) => b.value === value && b.type === type);

  const getBackgroundColor = (value: string, type: string): string => {
    if (!isSelected(value, type)) return "green";
    if (gameState === "nothing") return "inherit";
    if (gameState === "waiting") return "blue";
    if (gameState === "error") return "red";
    return "inherit";
  };

  return (
    <div className="w-full flex flex-col">
      {hasWon ? (
        <h1>Congrats! You won</h1>
      ) : (
        randomisedCountries.map((country: string, index: number) => (
          <>
            <Tile value={country} type="country" onClick={onTileClick} getBackgroundColor={getBackgroundColor} />
            <Tile
              value={randomisedCapitals[index]}
              type="capital"
              onClick={onTileClick}
              getBackgroundColor={getBackgroundColor}
            />
          </>
        ))
      )}
    </div>
  );
};

export default CountryCapitalGame;

const Tile = ({
  value,
  type,
  onClick,
  getBackgroundColor
}: {
  value: string;
  type: "capital" | "country";
  onClick: (value: string, type: string) => void;
  getBackgroundColor: (value: string, type: string) => string;
}) => (
  <button style={{ color: getBackgroundColor(value, type) }} onClick={() => onClick(value, type)}>
    {value}
  </button>
);