import './Hero.css'
import houseArt from '../assets/house.svg'
import fireworks from '../assets/fireworks.svg'

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-text">
        <p className="hero-kicker">Deepayal</p>
        <h1>A house filled with diyas</h1>
        <p className="hero-desc">
          In a quiet season, the sweet scent of sayapatri garlands drifts by the
          doorway, colourful rangoli welcomes every step, and diyas flicker,
          bringing warmth to the house.
        </p>

        <svg className="hero-text-wave" viewBox="0 0 60 600" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0 H30 Q60 75 30 150 T30 300 T30 450 T30 600 H0Z" fill="var(--panel)" />
        </svg>
      </div>

      <img src={houseArt} alt="A Nepali house decorated with diyas and sayapatri garlands" className="hero-art" />

      <img src={fireworks} alt="" aria-hidden="true" className="hero-deco hero-deco-a" />
      
      <svg className="hero-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40 Q180 0 360 40 T720 40 T1080 40 T1440 40 V80 H0Z" fill="var(--bg)" />
      </svg>
    </section>
  )
}