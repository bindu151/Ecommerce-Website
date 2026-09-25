import { useState } from "react";

function COD() {
  const [message, setMessage] = useState("");

  const handleCOD = () => {
    setMessage("Cash on Delivery selected successfully!");
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