import { useState } from 'react'
import './Checkout.css'

function Checkout() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [errors, setErrors] = useState({})

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
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required'
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required'
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit pincode'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    alert('Address saved. Payment module will be connected next.')
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Enter your delivery details to continue.</p>
        </div>

        <div className="checkout-layout">

          {/* Delivery Details */}
          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <h2>Delivery Address</h2>

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
              />

              {errors.fullName && (
                <p className="error-message">
                  {errors.fullName}
                </p>
              )}
            </div>

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
              />

              {errors.phone && (
                <p className="error-message">
                  {errors.phone}
                </p>
              )}
            </div>

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
              />

              {errors.address && (
                <p className="error-message">
                  {errors.address}
                </p>
              )}
            </div>

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
                />

                {errors.state && (
                  <p className="error-message">
                    {errors.state}
                  </p>
                )}
              </div>

            </div>

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
              />

              {errors.pincode && (
                <p className="error-message">
                  {errors.pincode}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="place-order-button"
            >
              Continue to Payment
            </button>
          </form>

          {/* Order Summary */}
          <div className="checkout-summary">

            <h2>Order Summary</h2>

            <div className="checkout-product">
              <div>
                <strong>Wireless Headphones</strong>
                <p>Quantity: 1</p>
              </div>

              <span>₹1,499</span>
            </div>

            <div className="checkout-product">
              <div>
                <strong>Smart Watch</strong>
                <p>Quantity: 2</p>
              </div>

              <span>₹4,998</span>
            </div>

            <hr />

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <span>₹6,497</span>
            </div>

            <div className="checkout-summary-row">
              <span>Delivery</span>
              <span>₹50</span>
            </div>

            <div className="checkout-total">
              <span>Total</span>
              <span>₹6,547</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout