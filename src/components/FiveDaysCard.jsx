import './FiveDaysCard.css'
import crow from '../assets/crow.svg'
import dog from '../assets/dog.svg'
import cow from '../assets/cow.svg'
import diya from '../assets/diya.svg'
import thali from '../assets/thali.svg'

const days = [
  { name: 'Kaag Tihar', img: crow },
  { name: 'Kukur Tihar', img: dog },
  { name: 'Gai Tihar', img: cow },
  { name: 'Govardhan & Mha Puja', img: diya },
  { name: 'Bhai Tika', img: thali },
]

const RADIUS = 36   // distance from the centre, in % of the container

function pointAt(i) {
  const angle = ((-90 + i * 72) * Math.PI) / 180
  return { x: 50 + RADIUS * Math.cos(angle), y: 52 + RADIUS * Math.sin(angle) }
}

const points = days.map((_, i) => pointAt(i))

export default function FiveDaysCard({ setOnSelect }) {
  return (
    <section className="days-card">
      <div className="days-card-text">
        <p className="days-card-kicker">Five days · Five stories</p>
        <h2>Experience the five-day journey</h2>
        <p>
          From crows and dogs to cows, light and siblings, each day of Tihar
          honours someone. Walk through them one by one.
        </p>
        <button type="button" className="days-card-btn" onClick={() => setOnSelect('fivedays')}>
          Visit the five days
        </button>
      </div>

     <div className="pentagon">
  <svg className="pentagon-lines" viewBox="0 0 100 100" aria-hidden="true">
    <polygon points={points.map((p) => `${p.x},${p.y}`).join(' ')} />
  </svg>

  {days.map((day, i) => (
    <div
      key={day.name}
      className="pentagon-item"
      style={{ left: `${points[i].x}%`, top: `${points[i].y}%` }}
    >
      <img src={day.img} alt={day.name} title={day.name} />
    </div>
  ))}
</div>
    </section>
  )
}