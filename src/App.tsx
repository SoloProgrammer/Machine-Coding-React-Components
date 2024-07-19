import { useState } from "react";
import AutoComplete from "./components/AutoCompleteOrTypeahead/Typeahead";
import GridLights from "./components/GridLights/GridLights";
import ThrottleWindowResize from "./components/Throttle-Events/ThrottleEvents";
import "./App.css";
import axios from "axios";
import { Toaster } from "./components/Toastify/Toast";
import useToast from "./components/Toastify";

const App = () => {
  const API_URL = "https://dummyjson.com/recipes";
  const data = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Pineapple",
    "Strawberry",
    "Blueberry",
    "Raspberry",
    "Blackberry",
    "Cherry",
    "Peach",
    "Plum",
    "Grapes",
    "Watermelon",
    "Cantaloupe",
    "Honeydew",
    "Kiwi",
    "Papaya",
    "Guava",
    "Pomegranate",
    "Dragon Fruit",
    "Lychee",
    "Durian",
    "Jackfruit",
    "Coconut",
    "Lemon",
    "Lime",
    "Grapefruit",
    "Tangerine",
    "Clementine",
    "Apricot",
    "Fig",
    "Date",
    "Pear",
    "Persimmon",
    "Quince",
    "Nectarine",
    "Passion Fruit",
    "Starfruit",
    "Gooseberry",
  ];
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = async (q: string) => {
    try {
      setError("");
      setLoading(true);
      const { data } = await axios.get(API_URL + `/search?q=${q}`);
      setResults(data.recipes.map((r: any) => r.name));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const { toast } = useToast();
  return (
    <div className="app">
      <Toaster position="bottom-right" animation="fade-in"/>
      {/* <ThrottleWindowResize /> */}
      {/* <GridLights/> */}
      {/* <div className="autocomplete_wrapper">
        <AutoComplete
          results={results}
          onChange={handleChange}
          isLoading={loading}
          error={error}
          // staticSuggesstions={data}
        />
      </div> */}
      {/* <ToastContainer /> */}
      <div className="mt-3">
        <button
          onClick={() => {
            toast({ duration: 3000, message: "Email sent" });
          }}
          className="bg-zinc-800 border border-zinc-100 p-2 rounded text-white"
        >
          Success toast
        </button>
        <button
          onClick={() => {
            toast({ duration: 3000, message: "Email sent", type: "error" });
          }}
          className="bg-zinc-800 border ml-2 border-zinc-100 p-2 rounded text-white"
        >
          Error toast
        </button>
        <button
          onClick={() => {
            toast({ duration: 3000, message: "Email sent", type: "warning" });
          }}
          className="bg-zinc-800 border ml-2 border-zinc-100 p-2 rounded text-white"
        >
          Warning toast
        </button>
        <button
          onClick={() => {
            toast({ duration: 3000, message: "Email sent", type: "info" });
          }}
          className="bg-zinc-800 border ml-2 border-zinc-100 p-2 rounded text-white"
        >
          Info toast
        </button>
      </div>
    </div>
  );
};

export default App;
