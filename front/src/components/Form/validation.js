export default function validation (inputs){
    const errors = {};
    
    //Expresiones regulares
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regexPassword = /^(?=\w*\d)\S{6,10}$/;
    const regexnumber = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i

    // Condiciones para el nombre de usuario
    if(!regexEmail.test(inputs.username)){ // Si no machea -
        errors.username = 'Debe ser un correo electrónico';
    }
    if(!inputs.username){
        errors.username = 'Campo vacío'
    }
    if(inputs.username.length > 35){
        errors.username = 'Debe tener menos de 35 caracteres'
    }

    // Condiciones para el password
    if(!regexnumber.test(inputs.password)){
        errors.password = 'La contraseña debe tener un número'
    }
    if(!regexPassword.test(inputs.password)){
        errors.password = 'Debe tener entre 6 y 10 caracteres'
    }
    return errors;
}