import { Link } from "react-router-dom"; // Para rutas internas
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="tienda-footer">
      {/* Newsletter */}
      <section className="newsletter-section">
        <h3>
          Suscríbete para obtener <span>ofertas especiales</span>
        </h3>
        <form
          className="newsletter-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("¡Gracias por suscribirte! 😃");
          }}
        >
          <input type="email" placeholder="Tu correo electrónico" required />
          <button type="submit">Enviar</button>
        </form>
      </section>

      {/* Info y enlaces */}
      <section className="footer-info">
        <div>
          <h4>Enlaces de interés</h4>
          <ul>
            <li>
              <Link to="/quienes-somos">Quiénes somos</Link>
            </li>
            <li>
              <Link to="/como-comprar">Cómo comprar</Link>
            </li>
            <li>
              <Link to="/preguntas-frecuentes">Preguntas frecuentes</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Contáctanos</h4>
          <p>WhatsApp: 098 123 4567</p>
          <p>Email: contacto@crochetstyle.com</p>
        </div>
        <div>
          <h4>Métodos de pago</h4>
          <div className="footer-payments">
            <img src="" alt="Visa" />
            <img src="" alt="Mastercard" />
            {/* Agrega tus logos de pago aquí */}
          </div>
        </div>
      </section>

      {/* Legal y redes */}
      <div className="footer-content">
        <p>© 2025 Crochet Style. Todos los derechos reservados.</p>
        <div className="redes">
          <a href="https://www.facebook.com/share/1AkT6xkpEi/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://www.instagram.com/laeve_crochet?igsh=MXUxbDliaTM2Y3ZncA==" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://wa.me/593981242102" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-whatsapp"></i>
          </a>
        </div>
        <div className="footer-legal">
          Sitio seguro | Powered by Crochet Style
        </div>
      </div>
    </footer>
  );
}
