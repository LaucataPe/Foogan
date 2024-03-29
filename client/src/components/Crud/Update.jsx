import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {validate} from './validation';
import { useDispatch} from 'react-redux'
import { getAllRecipes } from "../../redux/actions";

/*Styles*/
import styles from './Create.module.css'
import images from '../../img/index'

function Create() {
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState({})
    const [diets, setDiets] = useState([]); 

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {id} = useParams()

    useEffect(() => {
        const dbDiets = async () =>{
            try {
                let diets = await axios(`http://localhost:3001/food/diets/db`);
                let data = diets.data;
                setDiets(data)
            } catch (error) {
                setErrors({...errors, diets: error.message})
            }
        }
        const getRecipe = async () =>{
            try {
                let response = await axios(`http://localhost:3001/food/recipe/${id}?database=true`);
                let data = response.data;
                const dietNums = data.Diets.map(diet => diet.id)

                setInput({
                    title: data.title,
                    summary: data.summary,
                    healthScore: data.healthScore,
                    image: data.image,
                    diets: dietNums
                })
            } catch (error) {
              console.log(error);  
            }
        }
        dbDiets()
        getRecipe()
    }, []);

    const handleInputs = (event) =>{
        setInput({...input, 
            [event.target.name]: event.target.value})
        
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value,
        }))
    }

    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.files[0],
        }))
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setInput({...input, 
                image: reader.result});
        }

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

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (Object.keys(errors).length === 0) {
            try {
                let response = await axios.put(`http://localhost:3001/food/update/${id}`, input);
                let data = response.data;
                if(data){
                    navigate('/home')
                    dispatch(getAllRecipes())
                    return alert('Your recipe was updated correctly')
                } 
             } catch (error) {
                return setErrors({errorUpdate: error.message})  
             }
            setInput({})
        }else{
            return alert('The are errors in the form!')
        }
      }
    
    return(
        <>
        <div className={styles.container}>
            <Link to='/home'><button className={styles.back}>{'<'} Back</button></Link>
            <img src={images.update} alt='Vegan food' />
            <form onSubmit={handleSubmit}>
                <h1 className={styles.title}>Updating recipe</h1>
                {errors.errorUpdate ? <p className={styles.errors}><strong>{errors.errorUpdate}</strong></p> : '' }
                <label>Title</label>
                <input value={input.title} onChange={handleInputs} type="text" name='title' /><br />
                {errors.title !== '' ? <p className={styles.errors}><strong>{errors.title}</strong></p> : '' }

                <label>Summary</label>
                <textarea value={input.summary} onChange={handleInputs} name="summary"
                 placeholder='Add a bit desription of the recipe...' rows="5" cols="33"></textarea><br />
                {errors.summary !== '' ? <p className={styles.errors}><strong>{errors.summary}</strong></p> : <p></p> }

                <label>Health Score: </label>
                <input onChange={handleInputs} value={input.healthScore} type="range" name="healthScore" min="10" max="100"/>
                <h5>{input.healthScore}</h5><br />
                {errors.healthScore !== '' ? <p className={styles.errors}><strong>{errors.healthScore}</strong></p> : <p></p> }

                <label>Image</label>
                <input onChange={handleImage} type="file" name='image' placeholder='Image Url...'/><br />
                {errors.image !== '' ? <p className={styles.errors}><strong>{errors.image}</strong></p> : <p></p> }

                <label>Select Diets</label><br />
                <div className={styles.diets}>
                    {/* Diets */}
                    {diets && diets.map((diet) => {
                    if(input.diets && input.diets.includes(diet.id)){
                        return(
                            <label key={diet.id} className={styles.labelDiets}>
                                <input id={diet.id} onChange={handleDiet} type="checkbox" value={diet.id} checked/>
                                <span>{diet.name}</span>
                            </label>
                        )
                    }else{
                        return (
                            <label key={diet.id} className={styles.labelDiets}>
                                <input id={diet.id} onChange={handleDiet} type="checkbox" value={diet.id} />
                                <span>{diet.name}</span>
                            </label>
                        )
                    }
                    })}
                </div>
                
                {errors.diets !== '' ? <p className={styles.errors}><strong>{errors.diets}</strong></p> : <p></p> }

                {Object.keys(errors).length > 0 ? <button disabled={true} className={styles.create}>Update</button> : 
                <button type='submit' className={styles.create}>Update</button>}
            </form>
        </div>
        </>
    )
}

export default Create