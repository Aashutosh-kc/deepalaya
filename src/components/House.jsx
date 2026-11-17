
import { useState } from "react";
import "./House.css";

const COLORS = {
  plum: "#4B1F6F",
  purple: "#A23FD0",
  pink: "#F0509B",
  coral: "#F0504A",
  orange: "#F7941D",
  yellow: "#FFD21F",
  blue: "#4A9BD9",
  green: "#4C9A2A",
  cream: "#FFF4E6",
  darkGreen: "#28652F",
};

const bulbs = Array.from({ length: 17 }, (_, i) => {
  const t = i / 16;

  return {
    x: 82 + t * 396,
    y: 157 + 27 * Math.sin(t * Math.PI),
    color: [
      COLORS.pink,
      COLORS.yellow,
      COLORS.blue,
      COLORS.orange,
      COLORS.purple,
      COLORS.green,
    ][i % 6],
  };
});

const garlandFlowers = Array.from({ length: 13 }, (_, i) => ({
  x: 115 + i * 27,
  y: 207 + (i % 2) * 5,
}));

export default function House() {
  const [lightsOn, setLightsOn] = useState(true);

  return (
    <div className={`house ${lightsOn ? "lights-on" : "lights-off"}`}>
      <svg
        className="house-art"
        viewBox="0 0 560 440"
        role="img"
        aria-label="A colourful Nepali house decorated with Tihar lights, flower garlands, and oil lamps"
      >
        <defs>
          <radialGradient id="house-window-glow">
            <stop offset="0%" stopColor="#FFD21F" stopOpacity=".8" />
            <stop offset="100%" stopColor="#FFD21F" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="house-wall-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF4E6" />
            <stop offset="100%" stopColor="#F2D9BB" />
          </linearGradient>

          <filter id="house-bulb-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* Ground and shadows */}
        <ellipse cx="280" cy="411" rx="224" ry="17" fill="#4B1F6F" opacity=".13" />

        {/* Rangoli */}
        <g className="house-rangoli">
          <circle cx="280" cy="402" r="30" fill={COLORS.purple} />
          <circle cx="280" cy="402" r="22" fill={COLORS.blue} />
          <circle cx="280" cy="402" r="13" fill={COLORS.pink} />
          <circle cx="280" cy="402" r="6" fill={COLORS.yellow} />

          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse
              key={angle}
              cx="280"
              cy="382"
              rx="5"
              ry="11"
              fill={COLORS.yellow}
              transform={`rotate(${angle} 280 402)`}
            />
          ))}

          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={280 + Math.cos(angle) * 39}
                cy={402 + Math.sin(angle) * 17}
                r="3"
                fill={i % 2 ? COLORS.pink : COLORS.orange}
              />
            );
          })}
        </g>

        {/* House foundation */}
        <path
          d="M82 374 L82 174 L280 63 L478 174 L478 374 Q478 389 462 389 H98 Q82 389 82 374Z"
          fill={COLORS.green}
          stroke={COLORS.plum}
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Main walls */}
        <path
          d="M103 184 L280 84 L457 184 V367 H103Z"
          fill="url(#house-wall-gradient)"
          stroke={COLORS.plum}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Roof */}
        <path
          d="M60 178 L280 48 L500 178 L478 190 L280 77 L82 190Z"
          fill={COLORS.plum}
          stroke={COLORS.plum}
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Roof tile bands */}
        <path
          d="M83 164 L280 54 L477 164"
          fill="none"
          stroke={COLORS.pink}
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M101 171 L280 72 L459 171"
          fill="none"
          stroke={COLORS.orange}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M123 178 L280 91 L437 178"
          fill="none"
          stroke={COLORS.yellow}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Roof decorative dots */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <g key={i}>
            <circle
              cx={139 + i * 47}
              cy={132 - Math.abs(3 - i) * 15}
              r="4"
              fill={COLORS.yellow}
            />
          </g>
        ))}

        {/* Roof edge */}
        <path
          d="M67 179 L280 57 L493 179"
          fill="none"
          stroke={COLORS.yellow}
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Side wall decorative panels */}
        <g>
          <path d="M103 205 H133 V350 H103Z" fill={COLORS.blue} />
          <path d="M427 205 H457 V350 H427Z" fill={COLORS.blue} />

          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <path
                d={`M${103 + i * 7} 205 V350`}
                stroke={COLORS.cream}
                strokeWidth="2"
                opacity=".65"
              />
              <path
                d={`M${427 + i * 7} 205 V350`}
                stroke={COLORS.cream}
                strokeWidth="2"
                opacity=".65"
              />
            </g>
          ))}
        </g>

        {/* Window glow */}
        <g className="house-window-glows">
          <circle cx="172" cy="275" r="65" fill="url(#house-window-glow)" />
          <circle cx="388" cy="275" r="65" fill="url(#house-window-glow)" />
        </g>

        {/* Left window */}
        <g>
          <rect x="137" y="235" width="70" height="81" rx="4" fill={COLORS.plum} />
          <rect x="144" y="242" width="56" height="67" rx="2" fill={COLORS.orange} />
          <rect x="150" y="248" width="44" height="55" fill={COLORS.yellow} />
          <path d="M172 248 V303 M150 275 H194" stroke={COLORS.plum} strokeWidth="5" />
          <path d="M137 235 H207" stroke={COLORS.pink} strokeWidth="8" />
          <path d="M143 321 H201" stroke={COLORS.purple} strokeWidth="6" />
        </g>

        {/* Right window */}
        <g>
          <rect x="353" y="235" width="70" height="81" rx="4" fill={COLORS.plum} />
          <rect x="360" y="242" width="56" height="67" rx="2" fill={COLORS.orange} />
          <rect x="366" y="248" width="44" height="55" fill={COLORS.yellow} />
          <path d="M388 248 V303 M366 275 H410" stroke={COLORS.plum} strokeWidth="5" />
          <path d="M353 235 H423" stroke={COLORS.pink} strokeWidth="8" />
          <path d="M359 321 H417" stroke={COLORS.purple} strokeWidth="6" />
        </g>

        {/* Doorway */}
        <g>
          <path
            d="M239 367 V280 Q280 247 321 280 V367Z"
            fill={COLORS.plum}
            stroke={COLORS.purple}
            strokeWidth="5"
          />
          <path
            d="M248 367 V284 Q280 260 312 284 V367Z"
            fill="#6A3285"
            stroke={COLORS.yellow}
            strokeWidth="3"
          />
          <path d="M280 275 V367" stroke={COLORS.purple} strokeWidth="2" />
          <circle cx="301" cy="327" r="4" fill={COLORS.yellow} />
          <circle cx="259" cy="327" r="4" fill={COLORS.yellow} />

          {/* Door ornament */}
          <path
            d="M280 290 L290 305 L280 320 L270 305Z"
            fill={COLORS.pink}
            stroke={COLORS.yellow}
            strokeWidth="2"
          />
        </g>

        {/* Entrance steps */}
        <path d="M224 369 H336 V380 H224Z" fill={COLORS.orange} />
        <path d="M213 380 H347 V391 H213Z" fill={COLORS.pink} />
        <path d="M205 391 H355" stroke={COLORS.plum} strokeWidth="4" />

        {/* Flower garland above windows */}
        <path
          d="M111 214 Q280 244 449 214"
          fill="none"
          stroke={COLORS.green}
          strokeWidth="4"
        />

        {garlandFlowers.map((flower, i) => (
          <g key={i} transform={`translate(${flower.x} ${flower.y})`}>
            <circle r="7" fill={COLORS.orange} />
            <circle cx="-5" cy="0" r="4" fill={COLORS.pink} />
            <circle cx="5" cy="0" r="4" fill={COLORS.pink} />
            <circle cy="-5" r="4" fill={COLORS.yellow} />
            <circle cy="5" r="4" fill={COLORS.yellow} />
          </g>
        ))}

        {/* Hanging marigold strings */}
        {[118, 150, 410, 442].map((x, i) => (
          <g key={x}>
            <path
              d={`M${x} 185 Q${x + (i < 2 ? -8 : 8)} 218 ${x} 246`}
              fill="none"
              stroke={COLORS.green}
              strokeWidth="2"
            />
            {[0, 1, 2, 3].map((j) => (
              <circle
                key={j}
                cx={x + Math.sin(j * 2) * 4}
                cy={197 + j * 11}
                r="4"
                fill={j % 2 ? COLORS.yellow : COLORS.orange}
              />
            ))}
          </g>
        ))}

        {/* Decorative flower medallions */}
        {[115, 445].map((x) => (
          <g key={x} transform={`translate(${x} 339)`}>
            <circle r="20" fill={COLORS.purple} />
            <circle r="14" fill={COLORS.blue} />
            <circle r="6" fill={COLORS.yellow} />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-11"
                rx="4"
                ry="7"
                fill={COLORS.pink}
                transform={`rotate(${angle})`}
              />
            ))}
          </g>
        ))}

        {/* Light string */}
        <g className="house-lights">
          <path
            d="M79 157 Q280 214 481 157"
            fill="none"
            stroke={COLORS.plum}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {bulbs.map((bulb, i) => (
            <g key={i} className="house-bulb" style={{ "--bulb-delay": `${i * 0.13}s` }}>
              <path
                d={`M${bulb.x} ${bulb.y - 2} v7`}
                stroke={COLORS.plum}
                strokeWidth="2"
              />
              <circle
                cx={bulb.x}
                cy={bulb.y + 10}
                r="9"
                fill={bulb.color}
                className="bulb-glow"
              />
              <circle
                cx={bulb.x}
                cy={bulb.y + 10}
                r="4"
                fill={COLORS.cream}
                className="bulb-core"
              />
            </g>
          ))}
        </g>

        {/* Diyas */}
        {[175, 280, 385].map((x, i) => (
          <g key={x} className="house-diya">
            <path
              d={`M${x - 15} 390 Q${x} 407 ${x + 15} 390 Q${x} 397 ${x - 15} 390Z`}
              fill={COLORS.orange}
              stroke={COLORS.plum}
              strokeWidth="2"
            />
            <path
              d={`M${x} 389 Q${x - 8} 377 ${x} 367 Q${x + 8} 377 ${x} 389Z`}
              fill={COLORS.yellow}
              className="diya-flame"
            />
            <circle cx={x} cy="391" r="3" fill={COLORS.pink} />
          </g>
        ))}

        {/* Small floating festive details */}
        {[
          [67, 244],
          [493, 244],
          [72, 304],
          [488, 304],
          [220, 112],
          [340, 112],
        ].map(([x, y], i) => (
          <g key={i}>
            <path
              d={`M${x} ${y - 6} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2}Z`}
              fill={i % 2 ? COLORS.yellow : COLORS.pink}
            />
          </g>
        ))}
      </svg>

      <button
        type="button"
        className="house-toggle"
        onClick={() => setLightsOn((current) => !current)}
        aria-pressed={lightsOn}
      >
        <span className="house-toggle-indicator" />
        Lights {lightsOn ? "on" : "off"}
      </button>
    </div>
  );
}
