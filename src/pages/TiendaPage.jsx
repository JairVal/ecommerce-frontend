import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer"; // Asegúrate de que la ruta sea correcta
import "./Tienda.css";

export default function TiendaPage() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("https://nestjs-ecommerce-valdivieso-backend-api.desarrollo-software.xyz")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <div className="tienda-bg">
      <div className="tienda-container">
        {/* Header */}
        <header className="tienda-header">
          <h1 className="logo">
            CROCHET <span>STYLE</span>
          </h1>
          <div className="search-cart">
            <div className="search-bar-modern">
              <input type="text" placeholder="Buscar productos..." />
              <i className="bi bi-search"></i>
            </div>
            <i className="bi bi-cart"></i>
            <Link to="/login">
              <i className="bi bi-person-circle"></i>
            </Link>
          </div>
        </header>

        {/* Banner */}
        <section className="tienda-banner">
          <h2>Bolsos & Carteras</h2>
          <p>Diseños únicos hechos a mano</p>
        </section>

        {/* Productos */}
        <section className="productos-grid">
          {productos.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>
              No hay productos disponibles aún.
            </p>
          ) : (
            productos.map((prod) => (
              <div className="producto-card" key={prod.id}>
                <div className="img-wrapper">
                  <img src={prod.imagen} alt={prod.nombre} />
                  {prod.nuevo && <span className="etiqueta-nuevo">NEW</span>}
                </div>
                <h4>{prod.nombre}</h4>
                <p>${Number(prod.precio).toFixed(2)}</p>
                <div className="product-actions">
                  <button className="btn-add-to-cart">Añadir al carrito</button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
      {}
      <Footer />
    </div>
  );
}
