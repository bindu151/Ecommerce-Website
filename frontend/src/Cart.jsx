import { useState } from 'react'
import './Cart.css'

function Cart({ cartItems: initialCartItems = [], onCartChange, onCheckout }) {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems)

    if (onCartChange) {
      onCartChange(updatedItems)
    }
  }

  const increaseQuantity = (id) => {
    updateCart(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    updateCart(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id) => {
    updateCart(
      cartItems.filter((item) => item.id !== id)
    )
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const deliveryCharge = subtotal > 0 ? 50 : 0
  const total = subtotal + deliveryCharge

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout({
        items: cartItems,
        subtotal,
        deliveryCharge,
        total,
      })
    }
  }

  return (
    <div className="cart-page">
      <div className="cart-container">

        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>
            {cartItems.reduce(
              (total, item) => total + item.quantity,
              0
            )}{' '}
            item(s) in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart to continue shopping.</p>
          </div>
        ) : (
          <div className="cart-layout">

            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-product-image"
                  />

                  <div className="cart-product-info">
                    <h2>{item.name}</h2>
                    <p className="cart-price">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="quantity-section">
                    <span>Quantity</span>

                    <div className="quantity-controls">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>

                </div>
              ))}
            </div>

            <div className="order-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <span>₹{deliveryCharge.toLocaleString('en-IN')}</span>
              </div>

              <hr />

              <div className="summary-total">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="button"
                className="checkout-button"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default Cart