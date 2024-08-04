import React from 'react';

const OrderConfirmation = ({ order }) => {
  return (
    <div className="order-confirmation">
      <h1>Thank you. Your order has been received.</h1>
      <div className="order-summary">
        <div className="order-info">
          <div>
            <strong>Order number:</strong><br/> {order.number}
          </div>
          <div>
            <strong>Date:</strong><br/> {order.date}
          </div>
          <div>
            <strong>Total:</strong><br/> ${order.total}
          </div>
          <div>
            <strong>Payment method:</strong> {order.paymentMethod}
          </div>
        </div>
        <h2>Order Details</h2>
        <table className="order-details">
          <thead>
            <tr>
              <th>Product</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name} × {item.quantity}</td>
                <td>${item.total}</td>
              </tr>
            ))}
            <tr>
              <td><strong>Subtotal:</strong></td>
              <td>${order.subtotal}</td>
            </tr>
            <tr>
              <td><strong>Payment method:</strong></td>
              <td>{order.paymentMethod}</td>
            </tr>
            <tr>
              <td><strong>Total:</strong></td>
              <td><strong>${order.total}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Billing Address</h2>
      <div className="billing-address">
        {order.billingAddress}
      </div>
    </div>
  );
};

export default OrderConfirmation;
