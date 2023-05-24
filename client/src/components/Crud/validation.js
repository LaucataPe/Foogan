const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  export function validate(inputs){
    let errors = {}
    //console.log(inputs);
    if (!inputs.title) errors.title = "A title is required!" 
    if (inputs.title.length > 35) errors.title = "(Max: 35 caracteres)" 

    if (!inputs.summary) errors.summary = "A summary is required!" 

    if (inputs.healthScore < 10) errors.healthScore = "Health Score can not be 0" 

    //if (!urlRegex.test(inputs.image)) errors.image = "Ingresa una url válida"

    if (inputs.diets.length < 1) errors.diets = "Select almost one diet!" 

    if (inputs.steps && inputs.steps.length === 0) errors.steps = "Include almost one step!" 

    return errors
  } 
