import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-header">
        <h1 className="home-title">🛍️ Welcome to ShopApp</h1>
        <p className="home-subtitle">
          Discover amazing products and add them to your wishlist!
        </p>
      </div>

      <div className="products-section">
        <h2 className="section-title">Featured Products</h2>
        
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
