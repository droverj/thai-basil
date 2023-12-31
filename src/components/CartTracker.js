import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../providers/CartContext';
// Styling for CartTracker.js included in Navbar.scss

const CartTracker = () => {
  const { totalItems } = useCart();

  return (
    <div className="cart-tracker">
      <span className="cart-count">{totalItems}</span>
      <Link to="/cart">
        <FontAwesomeIcon icon={faCartShopping} className="cart-icon" style={{ color: 'white' }} size="xl" />
      </Link>
    </div>
  );
};

export default CartTracker;
