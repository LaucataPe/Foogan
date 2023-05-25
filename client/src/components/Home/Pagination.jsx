import { useState, useEffect } from 'react';
import Card from '../Card/Card'
import styles from './Home.module.css'

function Pagination({recipes}) {

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setperPage] = useState(9)
    const [find, setFind] = useState()

    useEffect(() => {
       setCurrentPage(1)
       if(recipes.length === 0)setFind(false)
       if(recipes.length > 0)setFind(true)
    }, [recipes])

    //console.log(recipes);
    const pagesNumber = Math.ceil((recipes.length)/perPage)
   
    const lastPage = currentPage * perPage; 
    const firstPage = lastPage - perPage;
    const currentRecipes = recipes.slice(firstPage, lastPage);

    const onPreviusPage = () =>{
        setCurrentPage(currentPage-1)
    }

    const onNextPage = () =>{
        setCurrentPage(currentPage+1)
    }

    const onSpecificPage = (event) =>{
        if(event.target.value === 'First') return setCurrentPage(1)
        return setCurrentPage(pagesNumber)
    }


    return(
        <>
        {find === false ? <h2 className={styles.message}>Sorry! The recipe you were looking for does not exist</h2> : ''}
        <Card recipes={currentRecipes}/>
        <div className={styles.pagination}>
            <button disabled={currentPage === 1 || currentPage < 1} onClick={(event) => onSpecificPage(event)} value='First'>{'<<'}</button>
            <button disabled={currentPage === 1 || currentPage < 1} onClick={onPreviusPage}>{'<'}</button>
            <h3>Page {currentPage} of {pagesNumber}</h3>
            <button disabled={currentPage === pagesNumber || currentPage > pagesNumber} onClick={onNextPage}>{'>'}</button>
            <button disabled={currentPage === pagesNumber || currentPage > pagesNumber} onClick={(event) => onSpecificPage(event)}>{'>>'}</button>
        </div>
        </>
    )
}

export default Pagination