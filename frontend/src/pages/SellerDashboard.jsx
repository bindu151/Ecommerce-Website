
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/seller.css";

function SellerDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sellerProducts")) || [];
    } catch {
      return [];
    }
  });

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    imageUrl: "",
    description: "",
  });

  // Save products in browser storage
  useEffect(() => {
    try {
      localStorage.setItem("sellerProducts", JSON.stringify(products));
    } catch {
      alert("Storage is full. Please use a smaller product image.");
    }
  }, [products]);

  // Logout and return to Home
  function handleLogout() {
    navigate("/");
  }

  // Calculate total stock
  const totalStock = products.reduce(
    (total, product) => total + (Number(product.stock) || 0),
    0
  );

  // Calculate total stock value
  const totalStockValue = products.reduce(
    (total, product) =>
      total +
      (Number(product.price) || 0) * (Number(product.stock) || 0),
    0
  );

  // Upload product image
  function handleImageUpload(event, isEditing = false) {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Please select an image smaller than 1 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (isEditing) {
        setEditForm((previous) => ({
          ...previous,
          imageUrl: reader.result,
        }));
      } else {
        setImageUrl(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }

  // Add product
  function addProduct(event) {
    event.preventDefault();

    if (
      !name.trim() ||
      !category.trim() ||
      price === "" ||
      stock === ""
    ) {
      alert("Please fill in all required product fields.");
      return;
    }

    if (Number(price) < 0 || Number(stock) < 0) {
      alert("Price and stock cannot be negative.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      stock: Number(stock),
      imageUrl,
      description: description.trim(),
    };

    setProducts((previous) => [...previous, newProduct]);

    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setImageUrl("");
    setDescription("");

    event.target.reset();
  }

  // Start editing a product
  function startEdit(product) {
    setEditingId(product.id);

    setEditForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      imageUrl: product.imageUrl ?? product.image ?? "",
      description: product.description || "",
    });
  }

  // Save edited product
  function saveEdit(event) {
    event.preventDefault();

    if (
      !editForm.name.trim() ||
      !editForm.category.trim() ||
      editForm.price === "" ||
      editForm.stock === ""
    ) {
      alert("Please fill in all required product fields.");
      return;
    }

    if (
      Number(editForm.price) < 0 ||
      Number(editForm.stock) < 0
    ) {
      alert("Price and stock cannot be negative.");
      return;
    }

    setProducts((previous) =>
      previous.map((product) =>
        product.id === editingId
          ? {
              ...product,
              ...editForm,
              name: editForm.name.trim(),
              category: editForm.category.trim(),
              price: Number(editForm.price),
              stock: Number(editForm.stock),
              description: editForm.description.trim(),
            }
          : product
      )
    );

    setEditingId(null);
  }

  // Cancel editing
  function cancelEdit() {
    setEditingId(null);
  }

  // Delete product
  function deleteProduct(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setProducts((previous) =>
      previous.filter((product) => product.id !== id)
    );

    if (editingId === id) {
      setEditingId(null);
    }
  }

  // Search products
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (
      (product.name || "").toLowerCase().includes(searchText) ||
      (product.category || "").toLowerCase().includes(searchText) ||
      (product.description || "").toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="seller-dashboard">
      {/* Dashboard heading and Logout */}
      <div className="seller-dashboard-header">
        <h1>Seller Dashboard</h1>

        <button
          type="button"
          onClick={handleLogout}
          className="seller-logout-button"
        >
          Logout
        </button>
      </div>

      <p className="seller-subtitle">
        Manage your products, stock and product details.
      </p>

      {/* Summary cards */}
      <div className="seller-stats">
        <div className="seller-stat">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>

        <div className="seller-stat">
          <h3>Total Stock</h3>
          <p>{totalStock}</p>
        </div>

        <div className="seller-stat">
          <h3>Stock Value</h3>
          <p>₹{totalStockValue.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Add product form */}
      <section className="seller-panel">
        <h2>Add New Product</h2>

        <form className="seller-form" onSubmit={addProduct}>
          <label>Product Name *</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label>Category *</label>
          <input
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />

          <label>Price (₹) *</label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />

          <label>Stock Quantity *</label>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="Enter stock quantity"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            required
          />

          <label>Product Image</label>
          <div className="seller-upload">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload(event)}
            />

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Product preview"
                className="seller-image-preview"
              />
            )}
          </div>

          <label>Product Description</label>
          <textarea
            className="seller-description-input"
            rows="3"
            placeholder="Describe your product"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <button type="submit" className="seller-add-button">
            Add Product
          </button>
        </form>
      </section>

      {/* Product list and search */}
      <section className="seller-panel">
        <h2>My Products</h2>

        <input
          className="seller-search"
          type="text"
          placeholder="Search by product, category or description..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="seller-table-wrapper">
          <table className="seller-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.imageUrl || product.image ? (
                      <img
                        src={product.imageUrl || product.image}
                        alt={product.name}
                        className="seller-product-image"
                      />
                    ) : (
                      <span className="seller-no-image">
                        No image
                      </span>
                    )}
                  </td>

                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </td>
                  <td>{product.stock}</td>

                  <td className="seller-product-description">
                    {product.description || "No description"}
                  </td>

                  <td className="seller-actions">
                    <button
                      type="button"
                      className="seller-edit"
                      onClick={() => startEdit(product)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="seller-delete"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="7" className="seller-empty">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Edit product form */}
      {editingId !== null && (
        <section className="seller-panel">
          <h2>Edit Product</h2>

          <form className="seller-form" onSubmit={saveEdit}>
            <label>Product Name *</label>
            <input
              value={editForm.name}
              onChange={(event) =>
                setEditForm({
                  ...editForm,
                  name: event.target.value,
                })
              }
              required
            />

            <label>Category *</label>
            <input
              value={editForm.category}
              onChange={(event) =>
                setEditForm({
                  ...editForm,
                  category: event.target.value,
                })
              }
              required
            />

            <label>Price (₹) *</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={editForm.price}
              onChange={(event) =>
                setEditForm({
                  ...editForm,
                  price: event.target.value,
                })
              }
              required
            />

            <label>Stock Quantity *</label>
            <input
              type="number"
              min="0"
              step="1"
              value={editForm.stock}
              onChange={(event) =>
                setEditForm({
                  ...editForm,
                  stock: event.target.value,
                })
              }
              required
            />

            <label>Change Product Image</label>
            <div className="seller-upload">
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  handleImageUpload(event, true)
                }
              />

              {editForm.imageUrl && (
                <img
                  src={editForm.imageUrl}
                  alt="Product preview"
                  className="seller-image-preview"
                />
              )}
            </div>

            <label>Product Description</label>
            <textarea
              className="seller-description-input"
              rows="3"
              value={editForm.description}
              onChange={(event) =>
                setEditForm({
                  ...editForm,
                  description: event.target.value,
                })
              }
            />

            <div className="seller-edit-actions">
              <button type="submit" className="seller-add-button">
                Save Changes
              </button>

              <button
                type="button"
                className="seller-cancel"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}

export default SellerDashboard;
