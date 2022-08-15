//barra de navegación que solo se muestra cuando el usuario esta logeado
import { useEffect, useState } from 'react';
const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogged(true);
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 mt-4">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">Coppel</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {isLogged ? (
                                <div>
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <a className="nav-link" href="/articulo">Crear Articulos</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/ListaArticulos">Lista Articulos</a>
                                        </li>
                                        <div className="navbar-nav ml-auto">
                                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={handleLogout}>Logout</button>
                                        </div>
                                    </ul>
                                </div>
                                
                            ) : (
                                    <div className="navbar-nav ml-auto">
                                        <a className="btn btn-outline-success my-2 my-sm-0" href="/">Login</a>
                                    </div>
                                )}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
export default Navbar;