import PaymentMethod from "../components/paymentMethod";
import "../css/payment.css";

function Payment() {
  return (
    <div className="payment-page">

      <h1>Secure Payment</h1>

      <div className="payment-container">

        {/* Payment Methods */}
        <div className="payment-box">
          <h2>Choose Payment Method</h2>

          <PaymentMethod />
        </div>

        {/* Order Summary */}
        <div className="order-summary">

          <h2>Order Summary</h2>

          <p>Product Total: ₹2,000</p>
          <p>Delivery Fee: ₹50</p>

          <hr />

          <h3>Total Amount: ₹2,050</h3>

        </div>

      </div>

    </div>
  );
}

export default Payment;