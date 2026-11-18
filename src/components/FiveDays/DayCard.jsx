export default function DayCard({ day, reverse }) {
  return (
    <article className={`day-card ${reverse ? "reverse" : ""}`}>
      <div className="day-text">
        <span className="day-number">{day.number}</span>
        <p className="day-label">{day.label}</p>
        <h2>{day.name}</h2>
        <p className="day-subtitle">{day.subtitle}</p>
        <p className="day-description">{day.description}</p>
        {day.tradition && <p className="day-tradition">{day.tradition}</p>}

        <svg className="day-wave" viewBox="0 0 80 600" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 0 H30 Q60 75 30 150 T30 300 T30 450 T30 600 H0Z"
            fill="var(--saffron)"
            transform="translate(14 0)"
          />
          <path d="M0 0 H30 Q60 75 30 150 T30 300 T30 450 T30 600 H0Z" fill="var(--panel)" />
        </svg>
      </div>

      <div className="day-image" style={{ "--day-bg": day.color }}>
        <img src={day.image} alt={day.name} />
      </div>
    </article>
  );
}