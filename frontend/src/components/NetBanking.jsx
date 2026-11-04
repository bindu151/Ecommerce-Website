import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NetBanking() {
  const navigate = useNavigate();
  const [bank, setBank] = useState("");
  const [message, setMessage] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();

    if (!bank) {
      setMessage("Please select a bank");
      return;
    }

    navigate("/payment-success");
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