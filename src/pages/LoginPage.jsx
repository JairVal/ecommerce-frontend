import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./LoginAnimado.css"; // <-- Importa tu CSS animado

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://nestjs-ecommerce-valdivieso-backend-api.desarrollo-software.xyz/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Credenciales inválidas");
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      await Swal.fire({
        icon: "success",
        title: "¡Login exitoso!",
        showConfirmButton: false,
        timer: 1300
      });
      setLoading(false);
      navigate("/HomePage");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario o contraseña incorrectos",
        timer: 1800,
        showConfirmButton: false
      });
      setLoading(false);
    }
  };

  return (
    <div className="login-bg-animado">
      <div className="card login-card-animado shadow-lg p-4">
        <div className="text-center mb-4">
          <div className="login-avatar">
            <i className="bi bi-person-circle"></i>
          </div>
          <h3 style={{ fontWeight: 700, color: "#343a40" }}>Iniciar sesión</h3>
          <p className="text-secondary" style={{ fontSize: 15 }}>
            Ingresa tus credenciales para acceder al sistema
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control form-control-lg"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control form-control-lg"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            className="btn btn-primary w-100 py-2 login-btn-animado"
            type="submit"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

