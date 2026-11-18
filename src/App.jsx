import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RangoliCard from "./components/RangoliCard";
import FiveDaysCard from "./components/FiveDaysCard";
import Whiteboard from "./components/Whiteboard";
import FiveDays from "./components/FiveDays/FiveDays";
import FootprintTrail from "./components/FootprintTrail";

export default function App() {
  const [onSelect, setOnSelect] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [onSelect]);

  return (
    <div className="app">
      <Header setOnSelect={setOnSelect} />
      <FootprintTrail screen={onSelect} />
      {onSelect === "home" && (
        <>
          <Hero />
          <RangoliCard setOnSelect={setOnSelect} />
          <FiveDaysCard setOnSelect={setOnSelect} />
        </>
      )}

      {onSelect === "maker" && <Whiteboard setOnSelect={setOnSelect} />}
      {onSelect === "fivedays" && <FiveDays setOnSelect={setOnSelect} />}
    </div>
  );
}