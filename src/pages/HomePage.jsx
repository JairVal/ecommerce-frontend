import { Link } from "react-router-dom";
import "./LoginAnimado.css"; // Usa el mismo CSS que tu login

export default function HomePage() {
  return (
    <div className="login-bg-animado">
      <div className="container">
        <div
          className="card login-card-animado shadow-lg p-4"
          style={{
            borderRadius: 22,
            maxWidth: 1000,
            width: "100%",
            margin: "0 auto"
          }}
        >
          <div className="text-center mb-4">
            <div className="login-avatar" style={{ background: "rgba(79,143,255,0.09)" }}>
              <i className="bi bi-shop-window"></i>
            </div>
            <h2 style={{ fontWeight: 700, color: "#343a40" }}>Bienvenido al E-Commerce</h2>
            <p className="text-secondary" style={{ fontSize: 16 }}>
              Selecciona una opción para administrar el sistema
            </p>
          </div>
          <div className="row justify-content-center g-3">
            <div className="col-md-6 col-lg-2">
              <Link to="/usuarios" className="text-decoration-none">
                <div className="card card-menu shadow-sm h-100 border-0">
                  <div className="card-body text-center py-4">
                    <i className="bi bi-person-lines-fill display-4 mb-2 text-primary"></i>
                    <h5 className="card-title mt-1 mb-2" style={{ fontWeight: 600 }}>Usuarios</h5>
                    <p className="card-text small">Administrar usuarios del sistema.</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-lg-2">
              <Link to="/clientes" className="text-decoration-none">
                <div className="card card-menu shadow-sm h-100 border-0">
                  <div className="card-body text-center py-4">
                    <i className="bi bi-people-fill display-4 mb-2 text-success"></i>
                    <h5 className="card-title mt-1 mb-2" style={{ fontWeight: 600 }}>Clientes</h5>
                    <p className="card-text small">Gestionar tus clientes.</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-lg-2">
              <Link to="/productos" className="text-decoration-none">
                <div className="card card-menu shadow-sm h-100 border-0">
                  <div className="card-body text-center py-4">
                    <i className="bi bi-box-seam display-4 mb-2 text-warning"></i>
                    <h5 className="card-title mt-1 mb-2" style={{ fontWeight: 600 }}>Productos</h5>
                    <p className="card-text small">Controla tu inventario de productos.</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-lg-2">
              <Link to="/ventas" className="text-decoration-none">
                <div className="card card-menu shadow-sm h-100 border-0">
                  <div className="card-body text-center py-4">
                    <i className="bi bi-cart-check-fill display-4 mb-2 text-info"></i>
                    <h5 className="card-title mt-1 mb-2" style={{ fontWeight: 600 }}>Ventas</h5>
                    <p className="card-text small">Revisa y gestiona las ventas.</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-lg-2">
              <Link to="/proveedores" className="text-decoration-none">
                <div className="card card-menu shadow-sm h-100 border-0">
                  <div className="card-body text-center py-4">
                    <i className="bi bi-truck display-4 mb-2 text-danger"></i>
                    <h5 className="card-title mt-1 mb-2" style={{ fontWeight: 600 }}>Proveedores</h5>
                    <p className="card-text small">Gestiona tus proveedores.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
