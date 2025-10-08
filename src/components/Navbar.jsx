import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

const Navbar = () => {
  const { getWishlistCount } = useWishlist();
  const wishlistCount = getWishlistCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🛍️ ShopApp
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          
          <Link to="/wishlist" className="navbar-link wishlist-link">
            <span className="heart-icon">❤️</span>
            Wishlist
            {wishlistCount > 0 && (
              <span className="wishlist-badge">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
