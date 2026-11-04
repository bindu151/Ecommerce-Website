import { useState } from "react";
import { useNavigate } from "react-router-dom";

function COD() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleCOD = () => {
  navigate("/payment-success");
};

  return (
    <div className="payment-option">

      <h3>Cash on Delivery</h3>

      <p>
        Pay when your order is delivered to your address.
      </p>

      <button onClick={handleCOD}>
        Place Order
      </button>

      {message && <p className="payment-message">{message}</p>}

    </div>
  );
}

export default COD;