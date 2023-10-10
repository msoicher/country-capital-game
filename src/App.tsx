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
    const response = await fetch("https://restcountries.com/v3.1/independent?fields=name,capital");
    const countries = await response.json();
    const randomisedCountries = countries.sort(() => Math.random() - 0.5)

    const upper = Math.floor(Math.random() * (randomisedCountries.length - PAIRS_TO_SHOW + 1)) + PAIRS_TO_SHOW;
    setData(randomisedCountries.slice(upper - PAIRS_TO_SHOW, upper));
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const refresh = () => {
    getData();
  };

  return (
    <div className="w-full text-center align-center m-auto">
      <h1 style={{ marginBottom: "1rem" }}>Country to Capital Quiz</h1>
      <a href="https://github.com/msoicher/country-capital-game" target="_blank">
        View the source code here
      </a>
      <br />
      <br />
      <button onClick={refresh} style={{ backgroundColor: "grey" }}>
        Get fresh data
      </button>
      <br />
      <br />
      {!isLoading && (
        <CountryCapitalGame
          data={data.reduce((prev, curr) => ({ ...prev, [curr.name.common]: curr.capital[0] }), {})}
        />
      )}
    </div>
  );
}

export default App;
