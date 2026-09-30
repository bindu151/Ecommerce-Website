function AdminOrders() {
  const orders = [
    {
      id: 1,
      customer: "Rahul",
      product: "Laptop",
      amount: 55000,
      status: "Delivered",
    },
    {
      id: 2,
      customer: "Priya",
      product: "Smartphone",
      amount: 25000,
      status: "Pending",
    },
    {
      id: 3,
      customer: "Amit",
      product: "Headphones",
      amount: 2500,
      status: "Shipped",
    },
  ];

  return (
    <div>
      <h1>Orders Management</h1>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>₹{order.amount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;