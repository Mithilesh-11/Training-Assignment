import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="home-hero__badge">✦ Simple. Fast. Organised.</div>
        <h1 className="home-hero__title">
          Your contacts,<br />
          <span className="home-hero__accent">all in one place.</span>
        </h1>
        <p className="home-hero__subtitle">
          Search, manage and organise your contacts effortlessly.
          Sign in to get started — it only takes a second.
        </p>
        <div className="home-hero__actions">
          <button
            className="btn btn--primary btn--lg"
            onClick={() => navigate("/login")}
          >
            Get Started →
          </button>
          <button
            className="btn btn--ghost btn--lg"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <span className="feature-card__icon">🔍</span>
          <h3>Instant Search</h3>
          <p>Find any contact in milliseconds with debounced live filtering.</p>
        </div>
        <div className="feature-card">
          <span className="feature-card__icon">🔒</span>
          <h3>Secure Access</h3>
          <p>Protected routes keep your contacts private and safe.</p>
        </div>
        <div className="feature-card">
          <span className="feature-card__icon">⚡</span>
          <h3>Fast Loading</h3>
          <p>Optimised API fetching with smart loading and error states.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;