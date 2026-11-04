
import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function AuthPage() {
  const [page, setPage] = useState("login");

  return (
    <div className="auth-page">
      <div className="left-panel">
        <div className="brand-name">
          Shop<span>Ease</span>
        </div>

        <p className="brand-tagline">
          Better Products • Happier You
        </p>

        <h1 className="left-main-title">
          Shop Smarter,
          <br />
          <span>Live Better</span>
        </h1>

        <p className="left-description">
          Discover amazing products, great deals
          <br />
          and a seamless shopping experience —
          <br />
          all in one place.
        </p>

        <div className="features">
          <div className="feature-item">
            <div className="feature-icon">🚚</div>
            <div>
              <b>Fast & Reliable Delivery</b>
              <p>Your order, on time</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🛡️</div>
            <div>
              <b>Secure Payments</b>
              <p>Shop with confidence</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">★</div>
            <div>
              <b>Personalized for You</b>
              <p>Because you're unique</p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-panel">
        {page === "login" ? (
          <Login onRegister={() => setPage("register")} />
        ) : (
          <Register onLogin={() => setPage("login")} />
        )}
      </div>
    </div>
  );
}

export default AuthPage;
