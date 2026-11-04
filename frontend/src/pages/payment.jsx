
import PaymentMethod from "../components/paymentMethod";
import "../css/payment.css";

function Payment() {
  let cartItems = [];

  try {
    cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  } catch {
    cartItems = [];
  }

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const deliveryCharge = subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryCharge;

  return (
    <div className="payment-page">
      <h1>Secure Payment</h1>

      <div className="payment-container">
        <div className="payment-box">
          <h2>Choose Payment Method</h2>
          <PaymentMethod />
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          <p>
            Product Total: ₹{subtotal.toLocaleString("en-IN")}
          </p>

          <p>
            Delivery Fee: ₹{deliveryCharge.toLocaleString("en-IN")}
          </p>

          <hr />

          <h3>
            Total Amount: ₹{total.toLocaleString("en-IN")}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Payment;
