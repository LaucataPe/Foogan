import { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
//import Steps from './Steps';
import validate from './validation';
import {createRecipe} from '../redux/actions'
import { useDispatch} from 'react-redux'


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
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()

    const handleInputs = (event) =>{
        setInput({...input, 
            [event.target.name]: event.target.value})
        
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value,
        }))
    }
    const handleDiet = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;   
        let updatedDiets;
      
        if (isChecked) {
          updatedDiets = [...input.diets, value];
        } else {
          updatedDiets = input.diets.filter((diet) => diet !== value);
        }
        setInput({ ...input, diets: updatedDiets });
    }

    const handleSteps = (event) => {
        setInputValue(event.target.value);
      };

    const handleAdd = (event) => {
        event.preventDefault()
        if (inputValue.trim()) {
            setInput({...input, steps: [...input.steps, inputValue]})
            setInputValue('');
        }
        setErrors(validate({
            ...input,
            steps: ['...input.steps'],
        })) 
      };

    const handleSubmit = (e) =>{
        e.preventDefault();
    
        if (Object.keys(errors).length === 0) {
            dispatch(createRecipe(input))
            setInput({
                title: '',
                summary: '',
                healthScore: 0,
                image: '',
                diets: [],
                steps: []
            })
        }else{
            return alert('The are errors!')
        }
      }
    
    return(
        <>
        <h1>Create your own recipe</h1>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input value={input.title} onChange={handleInputs} type="text" name='title' /><br />
            {errors.title !== '' ? <p><strong>{errors.title}</strong></p> : <p></p> }
            <label>Summary</label>
            <textarea value={input.summary} onChange={handleInputs} name="summary" placeholder='Add a bit desription of the recipe...'></textarea><br />
            {errors.summary !== '' ? <p><strong>{errors.summary}</strong></p> : <p></p> }

            <label>Health Score: </label>
            <input onChange={handleInputs} value={input.healthScore} type="range" name="healthScore" min="10" max="100"/>
            <h5>{input.healthScore}</h5><br />
            {errors.healthScore !== '' ? <p><strong>{errors.healthScore}</strong></p> : <p></p> }

            <label>Image</label>
            <input value={input.image} onChange={handleInputs} type="text" name='image' placeholder='Image Url...'/><br />
            {errors.image !== '' ? <p><strong>{errors.image}</strong></p> : <p></p> }


            {/* Diets */}
            <label>Select Diets</label><br />
            <label>
            <input onChange={handleDiet} type="checkbox" name="diets" value="gluten free" />
            <img src="#" alt="Gluten Free"/>
            </label>
            <label>
            <input onChange={handleDiet} type="checkbox" name="diets" value="ketogenic"/>
            <img src="#" alt="Ketogenic"/>
            </label>
            <label>
            <input onChange={handleDiet} type="checkbox" name="diets" value="vegetarian"/>
            <img src="#" alt="Vegetarian"/>
            </label>
            <label>
            <input onChange={handleDiet} type="checkbox" name="diets" value="lacto-vegetarian"/>
            <img src="#" alt="Lacto-Vegetarian"/>
            </label>
            <label>
            <input onChange={handleDiet} type="checkbox" name="diets" value="pescetarian"/>
            <img src="#" alt="Pescetarian"/>
            </label>
            <label>
            <input onClick={handleDiet} type="checkbox" name="diets" value="vegan"/>
            <img src="#" alt="Vegan"/>
            </label>
            {errors.diets !== '' ? <p><strong>{errors.diets}</strong></p> : <p></p> }

            {/* Steps */}
            <div>
            <h1>Steps</h1>
                <input type="text" value={inputValue} onChange={handleSteps} placeholder='Here goes the steps...'/>
                <button onClick={handleAdd}>Add</button>
                {errors.steps !== '' ? <p><strong>{errors.steps}</strong></p> : <p>lOL</p> }
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