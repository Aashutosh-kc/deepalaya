
export default function ShapeDivider() {
  return (
    <svg
      className="shape-divider"
      viewBox="0 0 1000 65"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 0 H1000 C850 0 850 30 650 30 Q530 30 500 60 Q470 30 350 30 C150 30 150 0 0 0 Z"
        fill="#4B1F6F"
      />
      <path
        d="M0 0 C150 0 150 30 350 30 Q470 30 500 60 Q530 30 650 30 C850 30 850 0 1000 0"
        fill="none"
        stroke="#F7AD37"
        strokeWidth="2"
      />
    </svg>
  );
}
