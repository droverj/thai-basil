import React from 'react';
import MenuItems from './MenuItems';
import '../styles/MenuSections.scss';

const MenuSections = ({ groupedItems }) => {
  return (
    <div className="menu-sections">
      {groupedItems.map((section) => (
        <div key={section.id}>
          <div id={`S_${section.id}`} className='section-heading'>
            <h2 className='section-name'>{section.section}</h2>
          </div>
          <div className="menu-items">
            <MenuItems items={section.items} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuSections;