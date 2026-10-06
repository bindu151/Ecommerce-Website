import "../css/home.css";
import heroImage from "../assets/hero.png";
function Home() {
  return (
    <main className="home">
      <section className="hero">
        <img src={heroImage} alt="ShopEasy products" className="hero-image" />
        <h1>Welcome to ShopEasy</h1>
        <p>Discover products you'll love.</p>
        <button>Shop Now</button>
      </section>

      <section className="featured">
  <h2>Featured Products</h2>

  <div className="product-preview">
    <div className="product-card">
      <h3>Product One</h3>
      <p>Discover something you’ll love.</p>
      <button>View Product</button>
    </div>

    <div className="product-card">
      <h3>Product Two</h3>
      <p>Explore our latest collection.</p>
      <button>View Product</button>
    </div>

    <div className="product-card">
      <h3>Product Three</h3>
      <p>Find your next favorite item.</p>
      <button>View Product</button>
    </div>
  </div>
</section>
    </main>
  );
}

export default Home;