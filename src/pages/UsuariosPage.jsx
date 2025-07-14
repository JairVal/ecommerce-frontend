import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./LoginAnimado.css"; // Importa tu CSS animado

const initialForm = {
  id: null,
  nombreUsuario: "",
  email: "",
  password: "",
  rol: "",
};

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editando, setEditando] = useState(false);

  // Obtener usuarios
  const cargarUsuarios = () => {
    fetch("http://localhost:4000/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Manejo de inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear o actualizar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombreUsuario || !form.email || (!editando && !form.password) || !form.rol) {
      Swal.fire({
        icon: "warning",
        title: "Todos los campos son obligatorios",
        timer: 1800,
        showConfirmButton: false,
      });
      return;
    }
    try {
      const res = await fetch(
        "http://localhost:4000/usuarios" + (editando ? `/${form.id}` : ""),
        {
          method: editando ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Error al guardar usuario");
      Swal.fire({
        icon: "success",
        title: editando ? "¡Usuario actualizado!" : "¡Usuario creado!",
        showConfirmButton: false,
        timer: 1200,
      });
      setForm(initialForm);
      setEditando(false);
      cargarUsuarios();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  // Editar usuario
  const handleEditar = (usuario) => {
    setForm({ ...usuario, password: "" });
    setEditando(true);
  };

  // Eliminar usuario
  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
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
      const res = await fetch(`http://localhost:4000/usuarios/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar usuario");
      Swal.fire({
        icon: "success",
        title: "Usuario eliminado",
        showConfirmButton: false,
        timer: 1200,
      });
      cargarUsuarios();
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

  return (
    <div className="login-bg-animado">
      <div
        className="card login-card-animado shadow-lg p-4"
        style={{
          maxWidth: 1100,
          width: "100%",
          borderRadius: 22,
          margin: "0 auto"
        }}
      >
        <div className="text-center mb-4">
          <div className="login-avatar" style={{ background: "rgba(79,143,255,0.11)" }}>
            <i className="bi bi-person-lines-fill"></i>
          </div>
          <h2 style={{ fontWeight: 700, color: "#343a40" }}>Usuarios</h2>
          <p className="text-secondary" style={{ fontSize: 15 }}>
            Gestión de usuarios del sistema.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded shadow-sm bg-light">
          <h5 className="mb-3">{editando ? "Editar usuario" : "Crear usuario"}</h5>
          <div className="row mb-2">
            <div className="col">
              <input
                className="form-control"
                name="nombreUsuario"
                value={form.nombreUsuario}
                onChange={handleChange}
                placeholder="Nombre de usuario"
                required
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="col">
              <select
                className="form-control"
                name="rol"
                value={form.rol}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar rol</option>
                <option value="admin">Admin</option>
                <option value="vendedor">Vendedor</option>
              </select>
            </div>
            <div className="col">
              <input
                className="form-control"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder={editando ? "Nueva contraseña (opcional)" : "Contraseña"}
                required={!editando}
              />
            </div>
          </div>
          <div>
            <button className="btn btn-primary me-2" type="submit">
              {editando ? "Actualizar" : "Crear"}
            </button>
            {editando && (
              <button className="btn btn-secondary" type="button" onClick={handleCancelar}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Tabla de usuarios */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle bg-white">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-secondary">
                    No hay usuarios registrados.
                  </td>
                </tr>
              ) : (
                usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nombreUsuario}</td>
                    <td>{u.email}</td>
                    <td>{u.rol}</td>
                    <td>
                      <button className="btn btn-sm btn-info me-2" onClick={() => handleEditar(u)}>
                        Editar
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(u.id)}>
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
