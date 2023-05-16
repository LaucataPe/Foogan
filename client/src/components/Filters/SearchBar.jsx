import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {searchRecipe} from '../../redux/actions'

export default function SearchBar() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAdd = (e) =>{
    e.preventDefault()
    dispatch(searchRecipe(title))
  }
  
  return (
    <div>
      <input type="search" value={title} onChange={handleChange}/>
      <Link to='/home'><button onClick={(e) => {handleAdd(e)}}>🚽</button></Link>
    </div>
  );
}