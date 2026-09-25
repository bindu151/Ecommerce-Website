import "../css/payment.css";

function PaymentSuccess() {
  return (
    <div className="success-page">

      <div className="success-box">

        <div className="success-icon">✓</div>

        <h1>Payment Successful!</h1>

        <p>Your order has been placed successfully.</p>

        <p>
          Order ID: <strong>ORD1001</strong>
        </p>

        <button onClick={() => window.location.href = "/"}>
          Continue Shopping
        </button>

      </div>

    </div>
  );
}

export default PaymentSuccess;