import React from 'react';
import MenuItem from './MenuItem';
import '../styles/MenuSection.scss';

const MenuSection = ({ itemName, itemOptions, vietnameseName }) => {
  return (
    <div className="menu-section">
      <h3>{itemName}</h3>
      <h3>{vietnameseName}</h3> {/* Display the Vietnamese name here */}
      <div className="section-content">
        <div className="menu-items">
          <MenuItem itemOptions={itemOptions} />
        </div>
      </div>
    </div>
  );
};


export default MenuSection;
