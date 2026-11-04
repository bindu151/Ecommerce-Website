
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const products = [
    { icon: "🎧", name: "Wireless Headphones", category: "Electronics", price: "₹1,499", color: "#eee7ff" },
    { icon: "⌚", name: "Smart Watch", category: "Accessories", price: "₹2,299", color: "#e4f6f0" },
    { icon: "👟", name: "Casual Sneakers", category: "Fashion", price: "₹1,799", color: "#fff0e5" },
  ];

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#faf9ff",
      color: "#211936",
      fontFamily: "Arial, sans-serif",
    },
    navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 7%",
      background: "#fff",
      boxShadow: "0 3px 18px rgba(40,20,70,0.06)",
      position: "relative",
      zIndex: 1,
    },
    logo: { fontSize: "28px", fontWeight: 800, letterSpacing: "-1px", margin: 0 },
    links: { display: "flex", gap: "12px", alignItems: "center" },
    navButton: {
      padding: "11px 19px",
      border: "1px solid #8b35ed",
      borderRadius: "10px",
      background: "#fff",
      color: "#7627cf",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 600,
    },
    hero: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "50px",
      padding: "70px 7% 65px",
      flexWrap: "wrap",
    },
    content: { flex: "1 1 340px" },
    badge: {
      display: "inline-block",
      padding: "9px 15px",
      borderRadius: "30px",
      background: "#efe5ff",
      color: "#7928cf",
      fontSize: "12px",
      fontWeight: 700,
      letterSpacing: "1px",
    },
    heading: {
      fontSize: "clamp(42px, 5vw, 65px)",
      lineHeight: 1.12,
      letterSpacing: "-2px",
      margin: "24px 0 18px",
      color: "#20162e",
    },
    gradientText: {
      background: "linear-gradient(90deg, #913cf0, #e05aa8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    description: {
      maxWidth: "480px",
      fontSize: "16px",
      lineHeight: 1.9,
      color: "#71677f",
      marginBottom: "27px",
    },
    primaryButton: {
      padding: "15px 23px",
      border: "none",
      borderRadius: "11px",
      background: "linear-gradient(100deg, #8739e9, #b34de8)",
      color: "#fff",
      fontSize: "15px",
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 8px 20px rgba(137,57,233,0.22)",
    },
    secondaryButton: {
      padding: "14px 22px",
      border: "1px solid #e4d8f4",
      borderRadius: "11px",
      background: "#fff",
      color: "#562a86",
      fontWeight: 600,
      cursor: "pointer",
      marginLeft: "10px",
    },
    showcase: {
      flex: "1 1 340px",
      minHeight: "350px",
      borderRadius: "30px",
      padding: "30px",
      background: "linear-gradient(135deg, #eee3ff 0%, #fce7f3 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      boxSizing: "border-box",
      overflow: "hidden",
    },
    bag: {
      width: "125px",
      height: "125px",
      borderRadius: "35px",
      background: "rgba(255,255,255,0.75)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "76px",
      marginBottom: "20px",
      boxShadow: "0 12px 35px rgba(103,53,160,0.10)",
    },
    showcaseTitle: { fontSize: "25px", lineHeight: 1.4, margin: "0 0 10px" },
    showcaseText: { color: "#74627f", lineHeight: 1.7, margin: 0 },
    section: { padding: "12px 7% 65px" },
    sectionTop: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "15px",
      flexWrap: "wrap",
      marginBottom: "25px",
    },
    sectionTitle: { fontSize: "28px", margin: "0 0 8px", color: "#241936" },
    sectionSub: { color: "#81768e", margin: 0, fontSize: "14px" },
    viewButton: {
      background: "transparent",
      border: "none",
      color: "#812ee0",
      fontWeight: 700,
      cursor: "pointer",
      fontSize: "14px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
      gap: "22px",
    },
    productCard: {
      background: "#fff",
      border: "1px solid #f0eaf7",
      borderRadius: "20px",
      padding: "16px",
      boxShadow: "0 7px 24px rgba(39,18,65,0.04)",
    },
    productImage: {
      height: "155px",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "68px",
      marginBottom: "17px",
    },
    category: {
      color: "#9a70bd",
      fontSize: "12px",
      margin: "0 0 8px",
    },
    productName: { fontSize: "16px", margin: "0 0 12px", fontWeight: 700 },
    price: { color: "#772bd0", fontWeight: 800, fontSize: "18px", margin: 0 },
    footer: {
      textAlign: "center",
      padding: "25px",
      color: "#82768e",
      borderTop: "1px solid #eee7f5",
      background: "#fff",
      fontSize: "13px",
    },
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>
          Shop<span style={{ color: "#d95baf" }}>Ease</span>
        </h2>
        <div style={styles.links}>
          <button style={styles.navButton} onClick={() => navigate("/login")}>
            Login / Register
          </button>
          <button
            style={{ ...styles.navButton, background: "#8739e9", color: "#fff" }}
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </nav>

      <main>
        <section style={styles.hero}>
          <div style={styles.content}>
            <span style={styles.badge}>✦ YOUR HAPPINESS, OUR PRIORITY</span>
            <h1 style={styles.heading}>
              Shop Smarter,
              <br />
              <span style={styles.gradientText}>Live Better.</span>
            </h1>
            <p style={styles.description}>
              Discover products you'll love, find amazing deals, and enjoy
              a seamless shopping experience — all in one place.
            </p>
            <button
              style={styles.primaryButton}
              onClick={() => navigate("/products")}
            >
              Explore Products &nbsp; →
            </button>
            <button
              style={styles.secondaryButton}
              onClick={() => navigate("/login")}
            >
              Join Us
            </button>
          </div>

          <div style={styles.showcase}>
            <div style={styles.bag}>🛍️</div>
            <h2 style={styles.showcaseTitle}>
              Everything you love,
              <br />
              <span style={styles.gradientText}>all in one place.</span>
            </h2>
            <p style={styles.showcaseText}>
              Great finds. Great prices.
              <br />
              A shopping experience made for you.
            </p>
            <div style={{ marginTop: "20px", color: "#8c53c9", fontSize: "13px" }}>
              ✦ Fashion &nbsp; ✦ Electronics &nbsp; ✦ More
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionTop}>
            <div>
              <h2 style={styles.sectionTitle}>Popular Picks ✨</h2>
              <p style={styles.sectionSub}>
                A little inspiration for your next favourite find.
              </p>
            </div>
            <button
              style={styles.viewButton}
              onClick={() => navigate("/products")}
            >
              View All Products →
            </button>
          </div>

          <div style={styles.grid}>
            {products.map((product) => (
              <div style={styles.productCard} key={product.name}>
                <div
                  style={{
                    ...styles.productImage,
                    background: product.color,
                  }}
                >
                  {product.icon}
                </div>
                <p style={styles.category}>{product.category}</p>
                <h3 style={styles.productName}>{product.name}</h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <p style={styles.price}>{product.price}</p>
                  <button
                    onClick={() => navigate("/products")}
                    aria-label={`Explore ${product.name}`}
                    style={{
                      border: "none",
                      borderRadius: "9px",
                      background: "#f1e6ff",
                      color: "#772bd0",
                      padding: "9px 12px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Explore →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        © {new Date().getFullYear()} ShopEase · Better Products, Happier You
      </footer>
    </div>
  );
}

export default Home;
