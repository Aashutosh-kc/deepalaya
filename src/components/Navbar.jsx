
import "./Navbar.css";

export default function Navbar({ view, onNavigate }) {
  return (
    <header className="navbar">
      <button
        className="nav-brand"
        type="button"
        onClick={() => onNavigate("home")}
        aria-label="Deepalaya home"
      >
        <span className="brand-flower" aria-hidden="true">✿</span>

        <span className="brand-name">
          Deepalaya
          <small>A FESTIVAL OF LIGHTS</small>
        </span>
      </button>

      <nav className="nav-links" aria-label="Main navigation">
        <button
          type="button"
          className={`nav-link ${view === "home" ? "active" : ""}`}
          onClick={() => onNavigate("home")}
          aria-current={view === "home" ? "page" : undefined}
        >
          Home
        </button>

        <button
          type="button"
          className={`nav-link ${view === "maker" ? "active" : ""}`}
          onClick={() => onNavigate("maker")}
          aria-current={view === "maker" ? "page" : undefined}
        >
          Playgrounds
        </button>
      </nav>

      <button
        className="nav-cta"
        type="button"
        onClick={() => onNavigate("maker")}
      >
        Create Rangoli
        <span aria-hidden="true">↗</span>
      </button>
    </header>
  );
}
