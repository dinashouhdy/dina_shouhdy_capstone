import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './ItemList.scss';

function ItemList() {

  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/ItemList')
      .then(response => {
        setLeftItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleMoveToRight = () => {
    if (selectedItem) {
      setLeftItems(leftItems.filter(item => item !== selectedItem));
      setRightItems([...rightItems, selectedItem]);
      setSelectedItem(null);
    }
  };

  const handleMoveToLeft = () => {
    if (selectedItem) {
      setRightItems(rightItems.filter(item => item !== selectedItem));
      setLeftItems([...leftItems, selectedItem]);
      setSelectedItem(null);
    }
  };

  return (
    <section className="item-list">
      <div className="item-list__container">
        <div className="item-list__left item-list__box">
          <h2>Left List</h2>
          <ul>
            {leftItems.map((item, index) => (
              <li 
                key={index} 
                onClick={() => handleItemClick(item)}
                className={selectedItem === item ? 'selected' : ''}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="item-list__buttons">
          <button onClick={handleMoveToRight}>&rarr;</button>
          <button onClick={handleMoveToLeft}>&larr;</button>
        </div>
        <div className="item-list__right item-list__box">
          <h2>Right List</h2>
          <ul>
            {rightItems.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ItemList;