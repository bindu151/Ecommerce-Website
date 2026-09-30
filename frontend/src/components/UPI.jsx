import { useState } from "react";

function UPI() {
  const [upiId, setUpiId] = useState("");
  const [message, setMessage] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();

    if (upiId.trim() === "") {
      setMessage("Please enter a UPI ID");
      return;
    }

    setMessage("Payment successful! This is a demo payment.");
  };

  return (
    <div className="payment-option">

      <h3>UPI Payment</h3>

      <form onSubmit={handlePayment}>

        <label>Enter UPI ID</label>

        <input
          type="text"
          placeholder="example@upi"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
        />

        <button type="submit">
          Pay ₹2,050
        </button>

      </form>

      {message && <p className="payment-message">{message}</p>}

    </div>
  );
}

export default UPI;