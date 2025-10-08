import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();


const WISHLIST_ACTIONS = {
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
  LOAD_WISHLIST: 'LOAD_WISHLIST',
  CLEAR_WISHLIST: 'CLEAR_WISHLIST'
};


const initialState = {
  items: [],
  isLoading: false
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case WISHLIST_ACTIONS.ADD_TO_WISHLIST:
      const isAlreadyInWishlist = state.items.some(item => item.id === action.payload.id);
      if (isAlreadyInWishlist) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    
    case WISHLIST_ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case WISHLIST_ACTIONS.LOAD_WISHLIST:
      return {
        ...state,
        items: action.payload,
        isLoading: false
      };
    
    case WISHLIST_ACTIONS.CLEAR_WISHLIST:
      return {
        ...state,
        items: []
      };
    
    default:
      return state;
  }
};

const WISHLIST_STORAGE_KEY = 'wishlist-items';


const loadWishlistFromStorage = () => {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading wishlist from storage:', error);
    return [];
  }
};

const saveWishlistToStorage = (items) => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving wishlist to storage:', error);
  }
};


export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  
  useEffect(() => {
    const storedItems = loadWishlistFromStorage();
    dispatch({ type: WISHLIST_ACTIONS.LOAD_WISHLIST, payload: storedItems });
  }, []);


  useEffect(() => {
    if (state.items.length > 0 || localStorage.getItem(WISHLIST_STORAGE_KEY)) {
      saveWishlistToStorage(state.items);
    }
  }, [state.items]);

  
  const addToWishlist = (product) => {
    dispatch({ type: WISHLIST_ACTIONS.ADD_TO_WISHLIST, payload: product });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: WISHLIST_ACTIONS.REMOVE_FROM_WISHLIST, payload: productId });
  };

  const toggleWishlist = (product) => {
    const isInWishlist = state.items.some(item => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    return !isInWishlist;
  };

  const clearWishlist = () => {
    dispatch({ type: WISHLIST_ACTIONS.CLEAR_WISHLIST });
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const getWishlistCount = () => {
    return state.items.length;
  };

  const value = {
    wishlistItems: state.items,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount,
    isLoading: state.isLoading
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};


export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;
