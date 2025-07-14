import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./LoginAnimado.css"; // Usa el mismo CSS animado que el login y home

const initialForm = {
  id: null,
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
};

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editando, setEditando] = useState(false);

  // Cargar clientes
  const cargarClientes = () => {
    fetch("http://localhost:4000/clientes")
      .then(res => res.json())
      .then(data => setClientes(data));
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  // Inputs
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear/Actualizar cliente
  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.nombre || !form.apellido || !form.email || !form.telefono) {
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
        "http://localhost:4000/clientes" + (editando ? `/${form.id}` : ""),
        {
          method: editando ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Error al guardar cliente");
      Swal.fire({
        icon: "success",
        title: editando ? "¡Cliente actualizado!" : "¡Cliente creado!",
        showConfirmButton: false,
        timer: 1200,
      });
      setForm(initialForm);
      setEditando(false);
      cargarClientes();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  // Editar cliente
  const handleEditar = cliente => {
    setForm(cliente);
    setEditando(true);
  };

  // Eliminar cliente
  const handleEliminar = async id => {
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
      const res = await fetch(`http://localhost:4000/clientes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar cliente");
      Swal.fire({
        icon: "success",
        title: "Cliente eliminado",
        showConfirmButton: false,
        timer: 1200,
      });
      cargarClientes();
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
          maxWidth: 1150,
          width: "100%",
          borderRadius: 22,
          margin: "0 auto"
        }}
      >
        <div className="text-center mb-4">
          <div className="login-avatar" style={{ background: "rgba(0,160,255,0.08)" }}>
            <i className="bi bi-people-fill"></i>
          </div>
          <h2 style={{ fontWeight: 700, color: "#343a40" }}>Clientes</h2>
          <p className="text-secondary" style={{ fontSize: 15 }}>
            Gestión de clientes registrados en el sistema.
          </p>
        </div>
        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded shadow-sm bg-light">
          <h5 className="mb-3">{editando ? "Editar cliente" : "Crear cliente"}</h5>
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
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                placeholder="Apellido"
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
              <input
                className="form-control"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                required
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
        {/* TABLA */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle bg-white">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-secondary">
                    No hay clientes registrados.
                  </td>
                </tr>
              ) : (
                clientes.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.nombre}</td>
                    <td>{c.apellido}</td>
                    <td>{c.email}</td>
                    <td>{c.telefono}</td>
                    <td>
                      <button className="btn btn-sm btn-info me-2" onClick={() => handleEditar(c)}>
                        Editar
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(c.id)}>
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
