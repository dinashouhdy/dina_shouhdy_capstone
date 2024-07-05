import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ItemList.scss';

function ItemList() {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { tripId, username } = useParams();

  useEffect(() => {
    axios.get('http://localhost:8080/get-remaining-items', {
      params: {
        tripId
      },
    })
      .then(response => {
        const { allItems, userSelectionMap, itemSelectionMap } = response.data;
        setLeftItems(allItems.map(item => ({ name: item, selectedBy: itemSelectionMap[item] })));
        setRightItems(userSelectionMap[username] ?? []);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, [username]); 

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleMoveToRight = () => {
    if (selectedItem) {
      axios.post('http://localhost:8080/select-items', { username, tripId, itemsToSelect: [selectedItem.name] })
        .then(() => {
          setLeftItems(leftItems.map(item =>
            item.name === selectedItem.name ? { ...item, selectedBy: username } : item
          ));
          setRightItems([...rightItems, selectedItem.name]);
          setSelectedItem(null);
        })
        .catch(error => {
          console.error('Error selecting item:', error);
        });
    }
  };

  const handleMoveToLeft = () => {
    if (selectedItem) {
      axios.post('http://localhost:8080/unselect-items', { username, tripId, itemsToUnselect: [selectedItem.name] })
        .then(() => {
          setRightItems(rightItems.filter(item => item !== selectedItem.name));
          setLeftItems(leftItems.map(item =>
            item.name === selectedItem.name ? { ...item, selectedBy: null } : item
          ));
          setSelectedItem(null);
        })
        .catch(error => {
          console.error('Error unselecting item:', error);
        });
    }
  };

  const handleInviteClick = () => {
    const subject = 'Join Our Next Camping Trip!';
    const body = `Hi there,\n\nYou're invited to join our next camping trip! The trip ID is: ${tripId}.\n\nLooking forward to seeing you there!\n\nBest regards,\n${username}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="item-list">
      <button className='item-list__invite' onClick={handleInviteClick}>Invite Campers!</button>
      <div className="item-list__container">
        <div className="item-list__left item-list__box">
          <h2>Camping Items</h2>
          <ul>
            {leftItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(item)}
                className={item.selectedBy ? 'shaded' : selectedItem === item ? 'selected' : ''}
              >
                {item.name} {item.selectedBy ? `(${item.selectedBy})` : ''}
              </li>
            ))}
          </ul>
        </div>
        <div className="item-list__buttons">
          <button onClick={handleMoveToRight}>&rarr;</button>
          <button onClick={handleMoveToLeft}>&larr;</button>
        </div>
        <div className="item-list__right item-list__box">
          <h2>My Items</h2>
          <ul>
            {rightItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(leftItems.find(leftItem => leftItem.name === item))}
                className={selectedItem && selectedItem.name === item ? 'unselected' : ''}
              >
                {item} ({username})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ItemList;