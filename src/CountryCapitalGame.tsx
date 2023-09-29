import { useEffect, useState } from "react";
import GameButton from "./GameButton";

type ButtonType = { value: string; type: string };

const CountryCapitalGame = ({ data }: { data: Record<string, string> }) => {
  const [randomisedCountries, setRandomisedCountries] = useState<string[]>([]);
  const [randomisedCapitals, setRandomisedCapitals] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setRandomisedCountries(Object.keys(data).sort(() => Math.random() - 0.5));
      setRandomisedCapitals(Object.values(data).sort(() => Math.random() - 0.5));
    }
  }, [data]);

  const [hasWon, setHasWon] = useState(false);
  const [gameState, setGameState] = useState<"nothing" | "waiting" | "error">("nothing");
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
    randomisedCountries.length === 0 ? setHasWon(true) : setHasWon(false);
  }, [randomisedCountries]);

  const hasClickedOnSameTile = (value: string, type: string) =>
    buttonsClicked.length === 1 && buttonsClicked[0].type === type && buttonsClicked[0].value === value;

  const onTileClick = (value: string, type: string) => {
    if (hasClickedOnSameTile(value, type)) {
      setButtonsClicked([]);
      setGameState("nothing");
      return;
    }

    if (gameState === "error") {
      setButtonsClicked([{ value, type }]);
    } else {
      setButtonsClicked((prev: ButtonType[]) => [...prev, { type, value }]);
    }
  };

  const isSelected = (value: string, type: string) =>
    buttonsClicked && buttonsClicked.some((b: ButtonType) => b.value === value && b.type === type);

  const getBackgroundColor = (value: string, type: string): string => {
    if (!isSelected(value, type) || gameState === "nothing") return "inherit";
    if (gameState === "waiting") return "blue";
    if (gameState === "error") return "red";
    return "inherit";
  };

  return (
    <div>
      {hasWon ? (
        <h1>Congrats! You won</h1>
      ) : (
        randomisedCountries.map((country: string, index: number) => (
          <>
            <GameButton value={country} type="country" onClick={onTileClick} getBackgroundColor={getBackgroundColor} />
            <GameButton
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
