import { BrowserRouter as Router, 
  Route, 
  Routes
 } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Articulo from "./Articulo";
import ListaArticulos from "./ListaArticulos";
import EditarArticulo from "./EditarArticulo";
import Navbar from "./navbar";
export default function app(){
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/articulo" element={<Articulo />} />
        <Route path="/listaarticulos" element={<ListaArticulos />} />
        <Route path="/editararticulo/:id" element={<EditarArticulo />} />
      </Routes>
    </Router>
  );
}