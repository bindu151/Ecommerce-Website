function SideBar({ onCategory }) {
  return (
    <aside>
      <h3>Categories</h3>

      <button onClick={() => onCategory("All")}>
        All Products
      </button>

      <button onClick={() => onCategory("Electronics")}>
        Electronics
      </button>

      <button onClick={() => onCategory("Fashion")}>
        Clothing
      </button>

      <button onClick={() => onCategory("Books")}>
        Books
      </button>
    </aside>
  );
}

export default SideBar;