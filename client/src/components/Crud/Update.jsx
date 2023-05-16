import axios from 'axios';
import { useState, useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import {validateUpdate} from './validation';

function Create() {
    const [input, setInput] = useState({
        title: '',
        summary: '',
        healthScore: '',
        image: '',
    })
    const [errors, setErrors] = useState({})
    //const [diets, setDiets] = useState([]); 
    //const [editedSteps, setEditedSteps] = useState({});

    const navigate = useNavigate();
    const {id} = useParams()

    useEffect(() => {
        /*const dbDiets = async () =>{
            try {
                let diets = await axios(`http://localhost:3001/food/diets/db`);
                let data = diets.data;
                setDiets(data)
            } catch (error) {
                setErrors({...errors, diets: error.message})
            }
        }*/
        const getRecipe = async () =>{
            try {
                let response = await axios(`http://localhost:3001/food/recipe/${id}?database=true`);
                let data = response.data;
                setInput(data)
            } catch (error) {
              console.log(error);  
            }
        }
        //dbDiets()
        getRecipe()
    }, []);

    const handleInputs = (event) =>{
        setInput({...input, 
            [event.target.name]: event.target.value})
        
        setErrors(validateUpdate({
            ...input,
            [event.target.name]: event.target.value,
        }))
    }
    /*const handleDiet = (event) => {
        const value = Number(event.target.value);
        const isChecked = event.target.checked;   
        let updatedDiets;
      
        if (isChecked) {
          updatedDiets = [...input.diets, value];
        } else {
          updatedDiets = input.diets.filter((diet) => diet !== value);
        }
        setInput({ ...input, diets: updatedDiets });

        setErrors(validate({
            ...input,
            diets: updatedDiets,
        })) 
    }*/

    /*const handleStepChange = (event, stepIndex) => {
        const { value } = event.target;
        setEditedSteps((prevState) => ({
          ...prevState,
          [stepIndex]: value,
        }));
      };*/

    const handleSubmit = async (e) =>{
        e.preventDefault();
        //const compiledSteps = Object.values(editedSteps);
        //setInput({ ...input, stepsdb: compiledSteps });

        if (Object.keys(errors).length === 0) {
            try {
                let response = await axios.put(`http://localhost:3001/food/update/${id}`, input);
                let data = response.data;
                if(data){
                    navigate('/home')
                    return alert('Your recipe was updated correctly')
                } 
             } catch (error) {
              console.log(error);  
             }
            setInput({
                title: '',
                summary: '',
                healthScore: 0,
                image: '',
            })
        }else{
            return alert('The are errors!')
        }
      }
    
    return(
        <>
        <h1>Updating recipe</h1>
        
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


            
            {/* <label>Select Diets</label><br />
            {diets && diets.map((diet) => {
                if(input.diets.includes(diet.name)){
                    return(
                        <label key={diet.id}>
                            <input id={diet.id} onChange={handleDiet} type="checkbox" value={diet.id} checked/>
                            <img src="#" alt={diet.name} />
                        </label>
                     )
                }else{
                    return (
                        <label key={diet.id}>
                            <input id={diet.id} onChange={handleDiet} type="checkbox" value={diet.id} />
                            <img src="#" alt={diet.name} />
                        </label>
                    )
                }
            })}
            {errors.diets !== '' ? <p><strong>{errors.diets}</strong></p> : <p></p> }

            
            <label>Edit Steps</label><br />
            {input.stepsdb && input.stepsdb.map((step, index) => (
                <input
                key={index}
                value={editedSteps[index] || step}
                onChange={(event) => handleStepChange(event, index)}
              />
            ))} */}
            {errors.steps !== '' ? <p><strong>{errors.steps}</strong></p> : <p></p> }
            {Object.keys(errors).length > 0 ? <button disabled={true}>Update</button> : <button type='submit'>Update</button>}

            
        </form>

        </>
    )
}

export default Create