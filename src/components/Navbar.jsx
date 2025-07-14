import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">E-Commerce</Link>
        <div>
          <Link className="nav-link d-inline" to="/usuarios">Usuarios</Link>
   
        </div>
      </div>
    </nav>
  );
}
