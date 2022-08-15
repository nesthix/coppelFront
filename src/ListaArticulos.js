/*listar todos los articulos de la base de datos para mostrarlos en la tabla con su imagen y su precio, descripcion y nombre
botón para eliminar el articulo y botón para editar el articulo*/
//imports
import { useEffect, useState } from 'react';
const ListaArticulos = () => {
    //acciones para mostrar, eliminar y editar articulos extrar los articulos del siguiene endpoint metodo GET https://coppeltest.herokuapp.com/articulo
    const [articulos, setArticulos] = useState([]);
    useEffect(() => {
        fetch('https://coppeltest.herokuapp.com/articulo', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(data => {
                setArticulos(data.articulos);
            }).catch(err => console.log(err));
    },[]);
    //acciones para eliminar un articulo del siguiene endpoint metodo DELETE https://coppeltest.herokuapp.com/articulo/:id si el condigo es 204 se elino correctamente
    const handleDelete = (id) => {
        fetch(`https://coppeltest.herokuapp.com/articulo/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 204) {
                const newArticulos = articulos.filter(articulo => articulo.id !== id);
                setArticulos(newArticulos);
            }
        }).catch(err => console.log(err));
    }
    /* acciones para editar un articulo del siguiene endpoint metodo 
    PUT https://coppeltest.herokuapp.com/articulo/:id desplegar un modal 
    con el formulario para editar el articulo para obtener la información especifica del articulo 
    https://coppeltest.herokuapp.com/articulo/${id} */
    const handleEdit = (id) => {
        //cargar otra vista con el formulario para editar el articulo
        window.location.href = `/EditarArticulo/${id}`;
    }
    
    //crear la tabla con los articulos
    return (
        <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 mt-4">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articulos.map(articulo => (
                            <tr key={articulo.id}>
                                <td>{articulo.nombre}</td>
                                <td>{articulo.precio}</td>
                                <td>{articulo.descripcion}</td>
                                <td><img src={"https://coppeltest.herokuapp.com/temp-files/" + articulo.imagen} alt={articulo.nombre} width="100" /></td>
                                <td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => handleEdit(articulo.id)}>Editar</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(articulo.id)}>Eliminar</button>
                                    </td>
                                </td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}
export default ListaArticulos;
