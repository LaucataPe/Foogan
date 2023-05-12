import axios from 'axios';
import { useState, useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import validate from './validation';


function Create() {
    const [input, setInput] = useState({
        title: '',
        summary: '',
        healthScore: 0,
        image: '',
        diets: [],
        steps: []
    })
    const [errors, setErrors] = useState({})
    const [step, setStep] = useState('');
    const [diets, setDiets] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        const dbDiets = async () =>{
            try {
                let response = await axios(`http://localhost:3001/food/diets/db`);
                let data = response.data;
                setDiets(data)
            } catch (error) {
              console.log(error);  
            }
        }
        dbDiets()
    }, []);

    console.log(diets);
    const handleInputs = (event) =>{
        setInput({...input, 
            [event.target.name]: event.target.value})
        
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value,
        }))
    }
    const handleDiet = (event) => {
        const value = Number(event.target.value);
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
        setStep(event.target.value);
      };

    const handleAdd = (event) => {
        event.preventDefault()
        if (step.trim()) {
            setInput({...input, steps: [...input.steps, step]})
            setStep('');
        }
        setErrors(validate({
            ...input,
            steps: ['...input.steps'],
        })) 
      };

    const handleSubmit = async (e) =>{
        e.preventDefault();
    
        if (Object.keys(errors).length === 0) {
            try {
                let response = await axios.post(`http://localhost:3001/food/recipes`, input);
                let data = response.data;
                if(data){
                    navigate('/home')
                    return alert('Your recipe was created')
                } 
             } catch (error) {
              console.log(error);  
             }
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
            {diets.length > 0 && diets.map(diet => (
                <label>
                <input id={diet.id} onChange={handleDiet} type="checkbox" value={diet.id}/>
                <img src="#" alt={diet.name}/>
                </label>
            ))}
            {errors.diets !== '' ? <p><strong>{errors.diets}</strong></p> : <p></p> }

            {/* Steps */}
            <div>
            <h1>Steps</h1>
                <input type="text" value={step} onChange={handleSteps} placeholder='Here goes the steps...'/>
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