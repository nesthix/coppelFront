import React from "react";  
/*crear las acciones y formulario para el registro de usuarios debe 
contener nombre, correo, contraseña y confirmar contraseña, confirmar contraseña
no se envía en el formulario solo se compara que sea igual a contraseña */
const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        //obtener los datos del formulario
        const data = new FormData(e.target);
        //mardar mensaje de alerta si no se ingresaron los datos
        if (data.get('name') === '' || data.get('email') === '' || data.get('contraseña') === '' || data.get('confirmPassword') === '') {
        alert('Por favor ingrese su nombre, correo, contraseña y confirmar contraseña');
            return;
        } 
        //comparar que la contraseña sea igual a confirmar contraseña
        if (data.get('contraseña') !== data.get('confirmPassword')) {
            alert('Las contraseñas no coinciden');
            return;
        }
        //quitar el campo confirmar contraseña
        data.delete('confirmPassword');
        //crear el objeto con los datos del formulario
        const obj = {};
        data.forEach((value, key) => obj[key] = value);
        //enviar los datos al servidor si trae success en true se guarda el token en localstorage si no se muestra un mensaje de error
        fetch('https://coppeltest.herokuapp.com/users/register', {
        method: 'POST',
        body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                alert('Usuario registrado correctamente');
                window.location.href = '/';
            } else {
                alert(res.message);
            }
        }
        );
    }
    //evitar que se introduzcan espacios en blanco en el username
    const handleUsername = (e) => {
        const username = e.target.value;
        if (username.includes(' ')) {
        e.target.value = username.replace(/\s/g, '');
        }
    }
    return (
        <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 mt-4">
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-4">
                <label>Nombre</label>
                <input type="text" className="form-control" required name="nombre" onChange={handleUsername} />
                </div>
                <div className="form-group mt-4">
                <label>Correo</label>
                <input type="email" className="form-control" required name="correo" />
                </div>
                <div className="form-group mt-4">
                <label>Contraseña</label>
                <input type="password" className="form-control" required name="contraseña" />
                </div>
                <div className="form-group mt-4">
                <label>Confirmar contraseña</label>
                <input type="password" className="form-control" required name="confirmPassword" />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">Registrar</button>
            </form>
            </div>
        </div>
        </div>
    );
}
export default Register;