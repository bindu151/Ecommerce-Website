import { useState } from "react";
import UPI from "./UPI";
import CardPayment from "./CardPayment";
import NetBanking from "./NetBanking";
import COD from "./COD";

function PaymentMethod() {
  const [method, setMethod] = useState("UPI");

  return (
    <div className="payment-method">

      <div className="method-options">

        <label>
          <input
            type="radio"
            value="UPI"
            checked={method === "UPI"}
            onChange={(e) => setMethod(e.target.value)}
          />
          UPI
        </label>

        <label>
          <input
            type="radio"
            value="Card"
            checked={method === "Card"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Card
        </label>

        <label>
          <input
            type="radio"
            value="Net Banking"
            checked={method === "Net Banking"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Net Banking
        </label>

        <label>
          <input
            type="radio"
            value="COD"
            checked={method === "COD"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

      </div>

      <div className="payment-form">

        {method === "UPI" && <UPI />}

        {method === "Card" && <CardPayment />}

        {method === "Net Banking" && <NetBanking />}

        {method === "COD" && <COD />}

      </div>

    </div>
  );
}

export default PaymentMethod;