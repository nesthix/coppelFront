import React from 'react';
//crear el cuerpo para el login usando bootstrap y conectar a esta api https://coppeltest.herokuapp.com/users/login
//para autenticar el usuario y obtener el token
//parametros a enviar nombre y contraseña
//https://coppeltest.herokuapp.com/users/login
const Login = () => {
  //si el usuario ya esta autenticado redireccionarlo a la pagina principal
  if (localStorage.getItem('token')) {
    window.location.href = '/articulo';
  }
  //evento para enviar los datos al servidor
  const handleSubmit = (e) => {
    e.preventDefault();
    //obtener los datos del formulario
    const data = new FormData(e.target);
    //mardar mensaje de alerta si no se ingresaron los datos
    if (data.get('name') === '' || data.get('password') === '') {
      alert('Por favor ingrese su nombre y contraseña');
      return;
    } 
    //crear el objeto con los datos del formulario
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    //enviar los datos al servidor si trae success en true se guarda el token en localstorage si no se muestra un mensaje de error
    fetch('https://coppeltest.herokuapp.com/users/login', {
      method: 'POST',
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          window.location.href = '/articulo';
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
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-4">
              <label>Usuario</label>
              <input type="text" className="form-control" required name="nombre" onChange={handleUsername} />
            </div>
            <div className="form-group mt-4">
              <label>Contraseña</label>
              <input type="password" className="form-control" required name='contraseña'/>
            </div>
            <div class="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-primary btn-lg">Login</button>
            </div>
            <div className="mt-4 form-group">
              <a href="/register">No tienes cuenta? Registrate</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;

