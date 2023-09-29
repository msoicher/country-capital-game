// import { useEffect, useState } from "react";
import CountryCapitalGame from "./CountryCapitalGame";
import './App.css'
import './index.css'

const data = {
  Réunion: "Saint-Denis",
  "El Salvador": "San Salvador",
  Dominica: "Roseau",
  Gibraltar: "Gibraltar",
  Kenya: "Nairobi",
  Brazil: "Brasília",
  Maldives: "Malé",
  "United States": "Washington, D.C.",
  "Cook Islands": "Avarua",
  Niue: "Alofi"
};

// const AMOUNT_OF_DATA_TO_SHOW = 10;

// type CountryData = {
//   name: { common: string };
//   capital: string[];
// };

function App() {
  // const [data, setData] = useState<CountryData[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const getData = async () => {
  //   const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital");
  //   const data = await response.json();
  //   const upper = Math.floor(Math.random() * (data.length - AMOUNT_OF_DATA_TO_SHOW + 1)) + AMOUNT_OF_DATA_TO_SHOW;
  //   // we want {AMOUNT_OF_DATA_TO_SHOW} values randomly, so slice data at an arbitrary point min (0, 10) max ()
  //   setData(data.slice(upper - AMOUNT_OF_DATA_TO_SHOW, upper));
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="w-full text-center align-center m-auto">
      <CountryCapitalGame data={data} />
    </div>
  );
}

export default App;
