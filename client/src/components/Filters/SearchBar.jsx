import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {searchRecipe, resetFilters} from '../../redux/actions'
import styles from './Filters.module.css'

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

  const handleReset = () =>{
    dispatch(resetFilters())
    setTitle('')
  }
  
  return (
    <>
      <div className={styles.search}>
        <input type="search" value={title} onChange={handleChange} className={styles.bar} placeholder='Write a name...'/>
        <Link to='/home'><button onClick={(e) => {handleAdd(e)}} className={styles.button}>Search</button></Link>
      </div>
      <button onClick={handleReset} className={styles.reset}>🗑</button>
    </>
    
  );
}