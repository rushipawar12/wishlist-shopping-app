import { useWishlist } from '../context/WishlistContext';
import WishlistCard from '../components/WishlistCard';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, clearWishlist, getWishlistCount } = useWishlist();
  const wishlistCount = getWishlistCount();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
    }
  };

  if (wishlistCount === 0) {
    return (
      <div className="wishlist-page">
        <div className="empty-wishlist">
          <div className="empty-icon">💔</div>
          <h2 className="empty-title">Your Wishlist is Empty</h2>
          <p className="empty-message">
            Start adding products to your wishlist by browsing our collection!
          </p>
          <a href="/" className="browse-btn">
            🛍️ Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div className="wishlist-title-section">
          <h1 className="wishlist-title">❤️ My Wishlist</h1>
          <p className="wishlist-count">
            {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        
        {wishlistCount > 0 && (
          <button 
            className="clear-all-btn"
            onClick={handleClearAll}
          >
            🗑️ Clear All
          </button>
        )}
      </div>

      <div className="wishlist-content">
        <div className="wishlist-grid">
          {wishlistItems.map((product) => (
            <WishlistCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
