import React, { useState } from 'react';
import axios from 'axios';
// import './ItemList.scss';

function ItemList() {
  return (
    <section className="item-list">
      <div className="item-list__container">
        <div className="item-list__left">
          <h2>Left List</h2>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
        <div className="item-list__right">
          <h2>Right List</h2>
          <ul>
            <li>Item A</li>
            <li>Item B</li>
            <li>Item C</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ItemList;