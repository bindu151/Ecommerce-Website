import { useState } from "react";

function NetBanking() {
  const [bank, setBank] = useState("");
  const [message, setMessage] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();

    if (!bank) {
      setMessage("Please select a bank");
      return;
    }

    setMessage("Payment successful! This is a demo payment.");
  };

  return (
    <div className="payment-option">

      <h3>Net Banking</h3>

      <form onSubmit={handlePayment}>

        <label>Select Bank</label>

        <select
          value={bank}
          onChange={(e) => setBank(e.target.value)}
        >
          <option value="">-- Select Bank --</option>
          <option value="SBI">State Bank of India</option>
          <option value="HDFC">HDFC Bank</option>
          <option value="ICICI">ICICI Bank</option>
          <option value="Axis">Axis Bank</option>
        </select>

        <button type="submit">
          Pay ₹2,050
        </button>

      </form>

      {message && <p className="payment-message">{message}</p>}

    </div>
  );
}

export default NetBanking;