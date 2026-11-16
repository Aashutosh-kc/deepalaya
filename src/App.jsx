
import { useState } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import House from "./components/House";
import Whiteboard from "./components/Whiteboard";

export default function App() {
  const [view, setView] = useState("home");

  return (
    <div className="app">
      <Navbar
        view={view}
        onNavigate={setView}
      />

      {view === "home" && (
        <main className="home">
          <h1 className="home-title">
            Deepalaya
          </h1>

          <p className="home-tagline">
            Welcome Lakshmi home this Tihar
          </p>

          <House />

          <button
            className="home-btn"
            type="button"
            onClick={() => setView("maker")}
          >
            Make your Rangoli
            <span aria-hidden="true"> ↗</span>
          </button>
        </main>
      )}

      {view === "maker" && (
        <main className="maker-page">
          <Whiteboard onBack={() => setView("home")} />
        </main>
      )}
    </div>
  );
}
