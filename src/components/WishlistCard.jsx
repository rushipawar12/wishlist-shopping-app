import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';
import './WishlistCard.css';

const WishlistCard = ({ product }) => {
  const { removeFromWishlist } = useWishlist();
  const [showToast, setShowToast] = useState(false);

  const handleRemove = () => {
    removeFromWishlist(product.id);
    setShowToast(true);
    
    
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const handleMoveToCart = () => {
    
    alert(`"${product.name}" would be added to cart! (Cart feature not implemented yet)`);
  };

  return (
    <div className="wishlist-card">
      <div className="wishlist-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="wishlist-image"
          loading="lazy"
        />
      </div>
      
      <div className="wishlist-info">
        <h3 className="wishlist-name">{product.name}</h3>
        <p className="wishlist-description">{product.description}</p>
        <div className="wishlist-details">
          <span className="wishlist-category">{product.category}</span>
          <span className="wishlist-price">${product.price}</span>
        </div>
      </div>

      <div className="wishlist-actions">
        <button 
          className="remove-btn"
          onClick={handleRemove}
          aria-label="Remove from wishlist"
        >
          ❌ Remove
        </button>
        
        <button 
          className="move-to-cart-btn"
          onClick={handleMoveToCart}
          aria-label="Move to cart"
        >
          🛒 Move to Cart
        </button>
      </div>

      {showToast && (
        <div className="toast-notification">
          Removed from Wishlist ❌
        </div>
      )}
    </div>
  );
};

export default WishlistCard;
