import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchBar({ onSearch }) {
  const [id, setId] = useState('');

  const handleChange = (event) => {
    setId(event.target.value);
  };
  
  return (
    <div>
      <input type="search" value={id} onChange={handleChange}/>
      <Link to='/home'><button onClick={() => {
        onSearch(id) 
        setId('')
        }}>Agregar</button></Link>
    </div>
  );
}