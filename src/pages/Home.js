import React, { useRef,useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Item from '../components/Item';
import LandingPage from './LandingPage';
import '../stylesheet/Home.css';

import { foodContext } from '../Context/food';

export default function Home() {
  const foodState = useContext(foodContext);
  const { foods, fetchAllFood } = foodState;

  let { tableno } = useParams();

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    fetchAllFood();
    // eslint-disable-next-line
  }, []);

  tableno = parseInt(tableno, 10);
  if (typeof tableno === 'number' && !isNaN(tableno)) {
    sessionStorage.setItem('tableno', tableno);
  }

  // Filter foods based on search term
  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  

  return (
    <div className='home-container'>
      <LandingPage />
    <br></br>
    <br></br>
    

      {/* Centered Search Bar */}
      <div className="search-bar-container">
        <div className="search-bar">
        <input
            type='text'
            placeholder='Search Dishes '
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputRef}
          />
           <span className="search-icon" onClick={handleIconClick}>🔍</span>

        </div>
      </div>

      {/* Filtered Food Items */}
      <div className='item-container' style={{ display: filteredFoods.length !== 0 ? '' : 'none' }}>
        {filteredFoods.map(food => (
          <Item key={food._id} id={food._id} food={food} />
        ))}
      </div>
    </div>
  );
}
