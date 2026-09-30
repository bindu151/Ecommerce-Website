import { useState } from "react";
import "../../styles/admin.css";

function AdminProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 55000,
      stock: 20,
    },
    {
      id: 2,
      name: "Smartphone",
      category: "Electronics",
      price: 25000,
      stock: 35,
    },
    {
      id: 3,
      name: "Headphones",
      category: "Accessories",
      price: 2500,
      stock: 50,
    },
  ]);

  const handleEdit = (product) => {
    const name = prompt("Enter product name:", product.name);
    if (name === null) return;

    const category = prompt("Enter category:", product.category);
    if (category === null) return;

    const price = prompt("Enter price:", product.price);
    if (price === null) return;

    const stock = prompt("Enter stock:", product.stock);
    if (stock === null) return;

    setProducts(
      products.map((item) =>
        item.id === product.id
          ? {
              ...item,
              name,
              category,
              price: Number(price),
              stock: Number(stock),
            }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div>
      <h1>Products Management</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>

              <td>
                <button onClick={() => alert("Edit button clicked")}>
                Edit
                </button>

                <button onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;