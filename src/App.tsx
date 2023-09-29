// import { useEffect, useState } from "react";
import CountryCapitalGame from "./CountryCapitalGame";
import "./App.css";
import "./index.css";
import { useEffect, useState } from "react";

const PAIRS_TO_SHOW = 10;

type CountryData = {
  name: { common: string };
  capital: string[];
};

function App() {
  const [data, setData] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital");
    const data = await response.json();
    const upper = Math.floor(Math.random() * (data.length - PAIRS_TO_SHOW + 1)) + PAIRS_TO_SHOW;
    setData(data.slice(upper - PAIRS_TO_SHOW, upper));
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full text-center align-center m-auto">
      {!isLoading && (
        <CountryCapitalGame
          data={data.reduce((prev, curr) => ({ ...prev, [curr.name.common]: curr.capital[0] }), {})}
        />
      )}
    </div>
  );
}

export default App;
