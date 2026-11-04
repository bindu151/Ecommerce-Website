import { useState } from 'react'
import './Checkout.css'

function Checkout({
  cartItems = [],
  onContinueToPayment,
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [errors, setErrors] = useState({})

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  const deliveryCharge = subtotal > 0 ? 50 : 0

  const total = subtotal + deliveryCharge

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        'Full name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        'Phone number is required'
    } else if (
      !/^[0-9]{10}$/.test(formData.phone)
    ) {
      newErrors.phone =
        'Enter a valid 10-digit phone number'
    }

    if (!formData.address.trim()) {
      newErrors.address =
        'Address is required'
    }

    if (!formData.city.trim()) {
      newErrors.city =
        'City is required'
    }

    if (!formData.state.trim()) {
      newErrors.state =
        'State is required'
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode =
        'Pincode is required'
    } else if (
      !/^[0-9]{6}$/.test(formData.pincode)
    ) {
      newErrors.pincode =
        'Enter a valid 6-digit pincode'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    if (cartItems.length === 0) {
      return
    }

    const checkoutData = {
      customer: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
      },

      items: cartItems,

      subtotal,

      deliveryCharge,

      total,
    }

    if (onContinueToPayment) {
      onContinueToPayment(checkoutData)
    }
  }

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        <div className="checkout-header">

          <h1>Checkout</h1>

          <p>
            Enter your delivery details to continue.
          </p>

        </div>

        <div className="checkout-layout">

          {/* Delivery Details */}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <h2>Delivery Address</h2>

            {/* Full Name */}

            <div className="form-group">

              <label htmlFor="fullName">
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
              />

              {errors.fullName && (
                <p className="error-message">
                  {errors.fullName}
                </p>
              )}

            </div>

            {/* Phone */}

            <div className="form-group">

              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                maxLength="10"
                inputMode="numeric"
                autoComplete="tel"
              />

              {errors.phone && (
                <p className="error-message">
                  {errors.phone}
                </p>
              )}

            </div>

            {/* Address */}

            <div className="form-group">

              <label htmlFor="address">
                Address
              </label>

              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House number, street, area"
                rows="4"
                autoComplete="street-address"
              />

              {errors.address && (
                <p className="error-message">
                  {errors.address}
                </p>
              )}

            </div>

            {/* City + State */}

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  autoComplete="address-level2"
                />

                {errors.city && (
                  <p className="error-message">
                    {errors.city}
                  </p>
                )}

              </div>

              <div className="form-group">

                <label htmlFor="state">
                  State
                </label>

                <input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  autoComplete="address-level1"
                />

                {errors.state && (
                  <p className="error-message">
                    {errors.state}
                  </p>
                )}

              </div>

            </div>

            {/* Pincode */}

            <div className="form-group">

              <label htmlFor="pincode">
                Pincode
              </label>

              <input
                id="pincode"
                name="pincode"
                type="text"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6-digit pincode"
                maxLength="6"
                inputMode="numeric"
                autoComplete="postal-code"
              />

              {errors.pincode && (
                <p className="error-message">
                  {errors.pincode}
                </p>
              )}

            </div>

            {/* Continue to Payment */}

            <button
              type="submit"
              className="place-order-button"
              disabled={cartItems.length === 0}
            >
              Continue to Payment
            </button>

          </form>

          {/* Order Summary */}

          <div className="checkout-summary">

            <h2>Order Summary</h2>

            {cartItems.length === 0 ? (
              <p>
                Your cart is empty.
              </p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div
                    className="checkout-product"
                    key={item.id}
                  >

                    <div>

                      <strong>
                        {item.name}
                      </strong>

                      <p>
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <span>
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString('en-IN')}
                    </span>

                  </div>
                ))}

                <hr />

                <div className="checkout-summary-row">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹
                    {subtotal.toLocaleString(
                      'en-IN'
                    )}
                  </span>

                </div>

                <div className="checkout-summary-row">

                  <span>
                    Delivery
                  </span>

                  <span>
                    ₹
                    {deliveryCharge.toLocaleString(
                      'en-IN'
                    )}
                  </span>

                </div>

                <div className="checkout-total">

                  <span>
                    Total
                  </span>

                  <span>
                    ₹
                    {total.toLocaleString(
                      'en-IN'
                    )}
                  </span>

                </div>
              </>
            )}

          </div>

        </div>

      </div>

    </div>
  )
}

export default Checkout