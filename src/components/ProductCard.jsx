import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleWishlistToggle = () => {
    const wasAdded = toggleWishlist(product);
    const message = wasAdded ? 'Added to Wishlist ✅' : 'Removed from Wishlist ❌';
    setToastMessage(message);
    setShowToast(true);
    
    
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <div className="product-overlay">
          <button 
            className={`wishlist-btn ${inWishlist ? 'in-wishlist' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {inWishlist ? '❤️' : '🤍'}
            <span className="wishlist-text">
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </span>
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <span className="product-category">{product.category}</span>
          <span className="product-price">${product.price}</span>
        </div>
      </div>

      {showToast && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
