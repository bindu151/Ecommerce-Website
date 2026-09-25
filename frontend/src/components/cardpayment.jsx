import { useState } from "react";

function CardPayment() {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();

    if (!cardNumber || !name || !expiry || !cvv) {
      setMessage("Please fill all fields");
      return;
    }

    setMessage("Payment successful! This is a demo payment.");
  };

  return (
    <div className="payment-option">

      <h3>Card Payment</h3>

      <form onSubmit={handlePayment}>

        <label>Card Holder Name</label>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Card Number</label>

        <input
          type="text"
          placeholder="XXXX XXXX XXXX XXXX"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <div className="card-row">

          <div>
            <label>Expiry</label>

            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>

          <div>
            <label>CVV</label>

            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>

        </div>

        <button type="submit">
          Pay ₹2,050
        </button>

      </form>

      {message && <p className="payment-message">{message}</p>}

    </div>
  );
}

export default CardPayment;