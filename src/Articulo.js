/*esta ruta solo puede ser accedida por un usuario autenticado checar el token en localstorage
contiene el formulario para agregar articulos el cual tiene los siguientes campos nombre,
precio, descripción y imagen todo se envía como form data*/
//import para useEffect y useState
import { useEffect } from 'react';
const Articulo = () => {
    //al cargar la pagina se verifica si el usuario esta autenticado
    useEffect(() => {
        console.log(localStorage.getItem('token'));
        if (!localStorage.getItem('token')) {
            window.location.href = '/';
        }
    }
    );
    //crear las acciones y formulario para el registro de usuarios debe
    //contener nombre, precio, descripción y imagen todo se envía como form data
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        fetch('https://coppeltest.herokuapp.com/articulo', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(data => {
                alert(data.message);
            }).catch(err => console.log(err));
    }
    //verificar que el precio sea un numero
    const handlePrice = (e) => {
        const price = e.target.value;
        if (isNaN(price)) {
        e.target.value = '';
        }
    }
    //crear el formulario para agregar articulos
    return (
        <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 mt-4">
            <h1>Agregar Articulo</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-4">
                <label htmlFor="name">Nombre</label>
                <input type="text" className="form-control" id="name" name="nombre" required />
                </div>
                <div className="form-group mt-4">
                <label htmlFor="price">Precio</label>
                <input type="number" className="form-control" id="price" name="precio" onChange={handlePrice} required />
                </div>
                <div className="form-group mt-4">
                <label htmlFor="description">Descripción</label>
                <textarea className="form-control" id="description" name="descripcion" rows="3" required></textarea>
                </div>
                <div className="form-group mt-4">
                <input type="file" className="form-control" id="image" name="imagen" required />
                </div>
                <button type="submit" className="form-control btn btn-primary mt-4">Agregar</button>
            </form>
            </div>
        </div>
        </div>
    );
}
export default Articulo;
//fin de la ruta para agregar articulos
