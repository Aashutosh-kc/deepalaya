import Header from "./components/Header";
import Hero from "./components/Hero";
import { useState } from "react";
import Whiteboard from "./components/Whiteboard"
import RangoliCard from "./components/RangoliCard";
import FiveDaysCard from "./components/FiveDaysCard";
import FiveDays from "./components/FiveDays/FiveDays";
export default function App() {
  const [onSelect,setOnSelect]= useState("home");
  return (
    <div className="app">
      <Header setOnSelect={setOnSelect}/>
      {onSelect === "home" && 
      <>
        
        <Hero />
        <RangoliCard setOnSelect={setOnSelect}/>
        <FiveDaysCard setOnSelect={setOnSelect} />
      </>
    }
    {onSelect === "maker" && <Whiteboard setOnSelect={setOnSelect}/>}
    {onSelect === "fivedays" && <FiveDays setOnSelect={setOnSelect}/>}
    </div>
    
    
  )
}
