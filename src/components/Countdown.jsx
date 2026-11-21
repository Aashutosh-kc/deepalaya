import { useEffect, useState } from "react";
import diya from "../assets/diya_pink.svg";
import "./Countdown.css";

const TARGET_DATE = new Date("2027-10-27T00:00:00+05:45").getTime();

const units = [
  { label: "Days", color: "teal" },
  { label: "Hours", color: "coral" },
  { label: "Minutes", color: "pink" },
  { label: "Seconds", color: "orange" },
];

export default function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const remaining = Math.max(0, TARGET_DATE - now);

  const values = [
    Math.floor(remaining / 86400000),
    Math.floor((remaining / 3600000) % 24),
    Math.floor((remaining / 60000) % 60),
    Math.floor((remaining / 1000) % 60),
  ];

  return (
    <section id="countdown" className="countdown-section">
      <div className="countdown-stars" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <span className={`countdown-star star-${i + 1}`} key={i}>✦</span>
        ))}
      </div>

      <svg
        className="countdown-rope"
        viewBox="0 0 1200 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="rope-dashed" d="M0 0 C280 155 920 155 1200 0" />
      </svg>

      <img src={diya} className="countdown-diya diya-left" alt="" aria-hidden="true" />
      <img src={diya} className="countdown-diya diya-right" alt="" aria-hidden="true" />

      <div className="countdown-bookmarks">
        {remaining > 0 ? (
          units.map((unit, index) => (
            <div className={`countdown-slot slot-${unit.color}`} key={unit.label}>
              <span className="countdown-string" aria-hidden="true" />
              <div className={`countdown-bookmark bookmark-${unit.color}`}>
                <span className="bookmark-pin" aria-hidden="true" />
                <span className="countdown-number">
                  {String(values[index]).padStart(2, "0")}
                </span>
                <span className="countdown-label">{unit.label}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="countdown-celebration">
            <span>✦ Happy Tihar! ✦</span>
            <p>May your home shine with happiness and light.</p>
          </div>
        )}
      </div>

      <p className="countdown-date">Next year's tihar · 27 OCTOBER 2027</p>
    </section>
  );
}