/* vista para editar articulo con el formulario para editar 
el articulo para obtener la información especifica del articulo  
https://coppeltest.herokuapp.com/articulo/${id} el parametro id se recibe de la ruta solo se puede editar
nombre, precio, descripcion e imagen */
import React, { useState, useEffect } from 'react';
import {useParams}  from "react-router-dom";
const EditarArticulo = () => {
    const {id} = useParams();
    const [articulo, setArticulo] = useState({});
    useEffect(() => {
        fetch(`https://coppeltest.herokuapp.com/articulo/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(data => {
                setArticulo(data.articulo);
            }).catch(err => console.log(err));
    },[id]);
    const handleEdit = (e) => {
        e.preventDefault();
        fetch(`https://coppeltest.herokuapp.com/articulo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                nombre: articulo.nombre,
                precio: articulo.precio,
                descripcion: articulo.descripcion
            })
        }).then(res => {
            if (res.status === 204) {
                window.location.href = '/ListaArticulos';
            }
        }).catch(err => console.log(err));
    }
    const handleChange = (e) => {
        setArticulo({
            ...articulo,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 mt-4">
                    <form onSubmit={handleEdit}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" className="form-control" id="nombre" name="nombre" value={articulo.nombre} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="precio">Precio</label>
                            <input type="number" className="form-control" id="precio" name="precio" value={articulo.precio} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripcion</label>
                            <textarea className="form-control" id="descripcion" name="descripcion" value={articulo.descripcion} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Editar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default EditarArticulo;