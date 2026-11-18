import "./FiveDays.css";
import { ArrowLeft } from "lucide-react";
import DayCard from "./DayCard";
import crow from "../../assets/crow_card.png";
import dog from "../../assets/dog_card.png";
import cow from "../../assets/ox_card.png";
import diya from "../../assets/laxmi.svg";
import thali from "../../assets/vaitika.png";

const days = [
  {
    number: "01",
    label: "THE FIRST DAY",
    name: "Kaag Tihar",
    subtitle: "A message from the skies",
    description:
      "The festival begins by honouring crows, traditionally regarded as messengers. Families offer food to these birds as a gesture of respect and gratitude.",
    tradition: "Food offerings are placed for crows.",
    image: crow,
    color: "var(--pack-pink-light)",
  },
  {
    number: "02",
    label: "THE SECOND DAY",
    name: "Kukur Tihar",
    subtitle: "Celebrating our loyal friends",
    description:
      "Dogs are celebrated for their loyalty and companionship. They receive flower garlands, a tika on their foreheads, and special treats.",
    tradition: "Garlands, tika, and treats for dogs.",
    image: dog,
    color: "var(--saffron)",
  },
  {
    number: "03",
    label: "THE THIRD DAY",
    name: "Gai Tihar & Laxmi Puja",
    subtitle: "A home filled with light",
    description:
      "Cows are honoured during the day. As evening arrives, homes glow with oil lamps as families worship Goddess Laxmi and welcome prosperity.",
    tradition: "Diyas, rangoli, lights, and Laxmi Puja.",
    image: cow,
    color: "var(--pack-yellow)",
  },
  {
    number: "04",
    label: "THE FOURTH DAY",
    name: "Govardhan & Mha Puja",
    subtitle: "Honouring life and new beginnings",
    description:
      "Govardhan Puja celebrates the bond between people and nature. Mha Puja, observed by the Newar community, honours the self and marks a new beginning.",
    tradition: "Celebrating nature, life, and the self.",
    image: diya,
    color: "var(--pack-blue)",
  },
  {
    number: "05",
    label: "THE FIFTH DAY",
    name: "Bhai Tika",
    subtitle: "A bond that shines forever",
    description:
      "The final day celebrates the bond between brothers and sisters. Sisters apply colourful tika, offer prayers for their brothers' wellbeing, and exchange gifts and blessings.",
    image: thali,
    color: "var(--accent-soft)",
  },
];

export default function FiveDays({ setOnSelect }) {
  return (
    <div className="five-days">
      <button type="button" className="days-back" onClick={() => setOnSelect("home")}>
        <ArrowLeft size={18} />
      
      </button>

      {days.map((day, i) => (
        <DayCard key={day.number} day={day} reverse={i % 2 === 1} />
      ))}
    </div>
  );
}