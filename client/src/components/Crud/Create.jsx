import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {validate} from './validation';
import { useDispatch} from 'react-redux'

/*Styles*/
import images from '../../img/index'
import styles from './Create.module.css'

import { getAllRecipes } from "../../redux/actions";

function Create() {
    const [input, setInput] = useState({
        title: '',
        summary: '',
        healthScore: 0,
        image: '',
        diets: [],
        steps: []
    })
    const [errors, setErrors] = useState({title:''})
    const [step, setStep] = useState('');
    const [diets, setDiets] = useState([]);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        const dbDiets = async () =>{
            try {
                let response = await axios(`http://localhost:3001/food/diets/db`);
                let data = response.data;
                setDiets(data)
            } catch (error) {
              setErrors({...errors, diets: error.message})
            }
        }
        dbDiets()
    }, []);

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

        setErrors(validate({
            ...input,
            diets: updatedDiets,
        })) 
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
            steps: [step],
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
                    dispatch(getAllRecipes())
                    return alert('Your recipe was created')
                } 
             } catch (error) {
              if (error.response.data.includes('unicidad')) {
                return setErrors({errorEnvio: 'The title of the current recipe alredy exists!'})
              }else{
                return alert(error.response.data)
              }
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
        <div className={styles.container}>
            <img src={images.create} alt='Vegan food' />
            <form onSubmit={handleSubmit}>
            <h1 className={styles.title}>Create your own recipe</h1>
                <label>Title</label><br/>
                <input value={input.title} onChange={handleInputs} type="text" name='title' placeholder='Write a title...' /><br />
                {errors.title !== '' ? <p className={styles.errors}><strong>{errors.title}</strong></p> : <p></p> }
                {errors.errorEnvio ? <p className={styles.errors}><strong>{errors.errorEnvio}</strong></p> : <p></p> }
                
                <label>Summary</label><br/>
                <textarea value={input.summary} onChange={handleInputs} name="summary" placeholder='Add a bit desription of the recipe...'
                rows="5" cols="33"></textarea><br />
                {errors.summary !== '' ? <p className={styles.errors}><strong>{errors.summary}</strong></p> : <p></p> }

                <label>Health Score -</label><span> {input.healthScore}</span><br/>
                <input onChange={handleInputs} value={input.healthScore} type="range" name="healthScore" min="10" max="100" className={styles.range}/>
                {errors.healthScore !== '' ? <p className={styles.errors}><strong>{errors.healthScore}</strong></p> : <p></p> }

                <label>Image</label><br/>
                <input value={input.image} onChange={handleInputs} type="text" name='image' placeholder='Image Url...'/><br />
                {errors.image !== '' ? <p className={styles.errors}><strong>{errors.image}</strong></p> : <p></p> }

                
                <label>Select Diets</label><br />
                <div className={styles.diets}>
                {/* Diets */}
                {diets.length > 0 && diets.map(diet => (
                    <label className={styles.labelDiets}>
                    <input key={diet.id} onChange={handleDiet} type="checkbox" value={diet.id} />
                    <span>{diet.name}</span>
                    </label>
                ))}
                </div>

                {errors.diets !== '' ? <p className={styles.errors}><strong>{errors.diets}</strong></p> : <p></p> }


                {/* Steps */}
                <div>
                <label>Steps</label><br />
                    <div className={styles.steps}>
                        <input type="text" value={step} onChange={handleSteps} placeholder='Here goes the steps...'/>
                        <button onClick={handleAdd} className={styles.add}>Add</button>
                    </div>
                    {errors.steps !== '' ? <p className={styles.errors}><strong>{errors.steps}</strong></p> : '' }
                <ol>
                    {input.steps.map((item, index) => (
                    <li key={index}>{item}</li>
                    ))}
                </ol>
                </div>

                {Object.keys(errors).length > 0 ? <button disabled={true} className={styles.create}>Create</button> : 
                <button type='submit' className={styles.create}>Create</button>}

                
            </form>
        </div>
        </>
    )
}

export default Create