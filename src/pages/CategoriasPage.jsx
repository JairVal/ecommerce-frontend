import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./LoginAnimado.css"; // Usa tu CSS animado

const initialForm = {
  id: null,
  nombre: "",
  descripcion: "",
};

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editando, setEditando] = useState(false);
  const navigate = useNavigate();

  // Cargar categorías
  const cargarCategorias = () => {
    fetch("http://localhost:3104/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data));
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // Manejo de inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear o actualizar categoría
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre) {
      Swal.fire({
        icon: "warning",
        title: "El nombre es obligatorio",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    try {
      const res = await fetch(
        "http://localhost:3104/categorias" + (editando ? `/${form.id}` : ""),
        {
          method: editando ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Error al guardar categoría");
      Swal.fire({
        icon: "success",
        title: editando ? "¡Categoría actualizada!" : "¡Categoría creada!",
        showConfirmButton: false,
        timer: 1200,
      });
      setForm(initialForm);
      setEditando(false);
      cargarCategorias();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  // Editar
  const handleEditar = (categoria) => {
    setForm(categoria);
    setEditando(true);
  };

  // Eliminar
  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar categoría?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      const res = await fetch(`http://localhost:3104/categorias/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar categoría");
      Swal.fire({
        icon: "success",
        title: "Categoría eliminada",
        showConfirmButton: false,
        timer: 1200,
      });
      cargarCategorias();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  // Cancelar edición
  const handleCancelar = () => {
    setForm(initialForm);
    setEditando(false);
  };

  // BOTONES FLOTANTES
  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Seguro que deseas salir del sistema?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });
    if (confirm.isConfirmed) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleAtras = () => navigate("/HomePage");

  return (
    <div className="login-bg-animado">
      {/* Botones flotantes */}
      <div className="fab-back-group">
        <button
          className="btn btn-danger fab-back"
          onClick={handleLogout}
          title="Cerrar sesión"
        >
          <i className="bi bi-box-arrow-right"></i>
        </button>
        <button
          className="btn btn-outline-secondary fab-back ms-2"
          onClick={handleAtras}
          title="Atrás"
        >
          <i className="bi bi-arrow-left"></i>
        </button>
      </div>

      <div
        className="card login-card-animado shadow-lg p-4"
        style={{
          maxWidth: 700,
          width: "100%",
          borderRadius: 22,
          margin: "0 auto",
        }}
      >
        <div className="text-center mb-4">
          <div
            className="login-avatar"
            style={{ background: "rgba(255,200,0,0.14)" }}
          >
            <i className="bi bi-tags-fill"></i>
          </div>
          <h2 style={{ fontWeight: 700, color: "#343a40" }}>Categorías</h2>
          <p className="text-secondary" style={{ fontSize: 15 }}>
            Gestión de categorías de productos.
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="mb-4 border p-3 rounded shadow-sm bg-light"
        >
          <h5>{editando ? "Editar categoría" : "Crear categoría"}</h5>
          <div className="row mb-2">
            <div className="col">
              <input
                className="form-control"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
              />
            </div>
          </div>
          <div>
            <button className="btn btn-primary me-2" type="submit">
              {editando ? "Actualizar" : "Crear"}
            </button>
            {editando && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Tabla */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle bg-white">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-secondary">
                    No hay categorías registradas.
                  </td>
                </tr>
              ) : (
                categorias.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.nombre}</td>
                    <td>{c.descripcion}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => handleEditar(c)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleEliminar(c.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
