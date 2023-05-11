import { useState, useEffect } from 'react';
import Card from './Card'

function Pagination({recipes, loading}) {

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
        if(event.target.innerHTML === 'First') return setCurrentPage(1)
        return setCurrentPage(pagesNumber)
    }


    return(
        <>
        {find === false ? <h1>Che, no hay recetas así!</h1> : ''}
        <Card recipes={currentRecipes} loading={loading}/>
        <div className='pagination'>
            <button disabled={currentPage === 1 || currentPage < 1} onClick={(event) => onSpecificPage(event)}>First</button>
            <button disabled={currentPage === 1 || currentPage < 1} onClick={onPreviusPage}>Previous</button>
            <h1>Page {currentPage} of {pagesNumber}</h1>
            <button disabled={currentPage === pagesNumber || currentPage > pagesNumber} onClick={onNextPage}>Next</button>
            <button disabled={currentPage === pagesNumber || currentPage > pagesNumber} onClick={(event) => onSpecificPage(event)}>Last</button>
        </div>
        </>
    )
}

export default Pagination