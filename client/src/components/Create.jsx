import { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
//import Steps from './Steps';


function Create() {
    const [input, setInput] = useState({
        title: '',
        summary: '',
        healthScore: 0,
        image: '',
        diets: [],
        steps: []
    })

    const [inputValue, setInputValue] = useState('');


    const handleInputs = (event) =>{
        setInput({...input, 
            [event.target.name]: event.target.value})
    }
    const handleDiet = (event) => {
        setInput({...input, diets: [...input.diets, event.target.value]})
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };

    const handleClick = (event) => {
        event.preventDefault()
        if (inputValue.trim()) {
            setInput({...input, steps: [...input.steps, inputValue]})
            setInputValue('');
        }
      };
    
      

    return(
        <>
        <h1>Create your own recipe</h1>
        <form>
            <label>Title</label>
            <input value={input.title} onChange={handleInputs} type="text" name='title' /><br />
            <label>Summary</label>
            <textarea value={input.summary} onChange={handleInputs} name="summary" placeholder='Add a bit desription of the recipe...'></textarea><br />

            <label for="healthScore">Health Score: </label>
            <input onChange={handleInputs} value={input.healthScore} type="range" name="healthScore" min="10" max="100"/>
            <h5>{input.healthScore}</h5><br />

            <label>Image</label>
            <input value={input.image} onChange={handleInputs} type="text" name='image' placeholder='Image Url...'/><br />


            {/* Diets */}
            <label>Select Diets</label><br />
            <label>
            <input onClick={handleDiet} type="checkbox" name="Gluten Free" value="gluten free" />
            <img src="#" alt="Gluten Free"/>
            </label>
            <label>
            <input onClick={handleDiet} type="checkbox" name="Ketogenic" value="ketogenic"/>
            <img src="#" alt="Ketogenic"/>
            </label>
            <label>
            <input onClick={handleDiet} type="checkbox" name="Vegetarian" value="vegetarian"/>
            <img src="#" alt="Vegetarian"/>
            </label>
            <label>
            <input onClick={handleDiet} type="checkbox" name="Lacto-Vegetarian" value="lacto-vegetarian"/>
            <img src="#" alt="Lacto-Vegetarian"/>
            </label>
            <label>
            <input onClick={handleDiet} type="checkbox" name="Pescetarian" value="pescetarian"/>
            <img src="#" alt="Pescetarian"/>
            </label>
            <label>
            <input onClick={handleDiet} type="checkbox" name="Vegan" value="vegan"/>
            <img src="#" alt="Vegan"/>
            </label>
            


            {/* Steps */}
            <div>
            <h1>Steps</h1>
                <input type="text" value={inputValue} onChange={handleInputChange} placeholder='Escriba el paso a seguir...'/>
                <button onClick={handleClick} >Agregar</button>
            <ol>
                {input.steps.map((item, index) => (
                <li key={index}>{item}</li>
                ))}
            </ol>
            </div>

            <button type='submit'>Create</button>
        </form>

        



        
        </>
    )
}

export default Create