import './RangoliCard.css'
import rangoliArt from '../assets/peacock_rangoli.png'

export default function RangoliCard({ setOnSelect }) {
  return (
    <section className="rangoli-card">
      <img src={rangoliArt} alt="A colourful rangoli pattern" className="rangoli-card-art" />

      <div className="rangoli-card-text">
        <h2>Colour the doorway</h2>
        <p>
          Rangoli is drawn at the threshold to welcome guests and Goddess Laxmi.
          Pick your colours, draw your own pattern, and save it as an image.
        </p>
        <button type="button" className="rangoli-card-btn" onClick={() => setOnSelect('maker')}>
          Make your own rangoli
        </button>
      </div>
    </section>
  )
}