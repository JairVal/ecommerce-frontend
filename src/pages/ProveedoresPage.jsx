import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./LoginAnimado.css";

const initialForm = {
  id: null,
  nombre: "",
  contacto: "",
  telefono: "",
  direccion: "",
};

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editando, setEditando] = useState(false);

  // Cargar proveedores
  const cargarProveedores = () => {
    fetch("https://nestjs-ecommerce-valdivieso-backend-api.desarrollo-software.xyz")
      .then(res => res.json())
      .then(data => setProveedores(data));
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  // Inputs
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear/Actualizar proveedor
  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.nombre || !form.contacto || !form.telefono || !form.direccion) {
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
        "http://localhost:3104/proveedor" + (editando ? `/${form.id}` : ""),
        {
          method: editando ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Error al guardar proveedor");
      Swal.fire({
        icon: "success",
        title: editando ? "¡Proveedor actualizado!" : "¡Proveedor creado!",
        showConfirmButton: false,
        timer: 1200,
      });
      setForm(initialForm);
      setEditando(false);
      cargarProveedores();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  // Editar proveedor
  const handleEditar = proveedor => {
    setForm(proveedor);
    setEditando(true);
  };

  // Eliminar proveedor
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
      const res = await fetch(`http://localhost:3104/proveedor/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar proveedor");
      Swal.fire({
        icon: "success",
        title: "Proveedor eliminado",
        showConfirmButton: false,
        timer: 1200,
      });
      cargarProveedores();
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
          maxWidth: 1000,
          width: "100%",
          borderRadius: 22,
          margin: "0 auto"
        }}
      >
        <div className="text-center mb-4">
          <div className="login-avatar" style={{ background: "rgba(255,60,60,0.13)" }}>
            <i className="bi bi-truck"></i>
          </div>
          <h2 style={{ fontWeight: 700, color: "#343a40" }}>Proveedores</h2>
          <p className="text-secondary" style={{ fontSize: 15 }}>
            Gestión de proveedores registrados en el sistema.
          </p>
        </div>
        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded shadow-sm bg-light">
          <h5 className="mb-3">{editando ? "Editar proveedor" : "Crear proveedor"}</h5>
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
                name="contacto"
                value={form.contacto}
                onChange={handleChange}
                placeholder="Persona de contacto"
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
            <div className="col">
              <input
                className="form-control"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Direccion"
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
                <th>Contacto</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-secondary">
                    No hay proveedores registrados.
                  </td>
                </tr>
              ) : (
                proveedores.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td>{p.contacto}</td>
                    <td>{p.telefono}</td>
                    <td>{p.direccion}</td>
                    <td>
                      <button className="btn btn-sm btn-info me-2" onClick={() => handleEditar(p)}>
                        Editar
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(p.id)}>
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
