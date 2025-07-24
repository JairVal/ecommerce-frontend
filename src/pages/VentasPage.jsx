import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getUserIdFromToken } from "../utils/jwt";
import "./LoginAnimado.css";

const initialDetalle = { id_producto: "", cantidad: 1, subtotal: 0 };

export default function VentasPage() {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [id_cliente, setIdCliente] = useState("");
  const [detalle, setDetalle] = useState([{ ...initialDetalle }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3104/ventas")
      .then(res => res.json())
      .then(data => setVentas(data));

    fetch("http://localhost:3104/clientes")
      .then(res => res.json())
      .then(data => setClientes(data));

    fetch("http://localhost:3104/productos")
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  // Cliente
  const handleClienteChange = e => setIdCliente(e.target.value);

  // Producto/cantidad/subtotal
  const handleDetalleChange = (i, field, value) => {
    const newDetalle = [...detalle];
    newDetalle[i][field] = value;
    // Auto-calcular subtotal
    const prod = productos.find(p => p.id === Number(newDetalle[i].id_producto));
    const precio = prod ? Number(prod.precio) : 0;
    newDetalle[i].subtotal = precio * Number(newDetalle[i].cantidad || 1);
    setDetalle(newDetalle);
  };

  const handleAddDetalle = () => setDetalle([...detalle, { ...initialDetalle }]);
  const handleRemoveDetalle = idx => {
    if (detalle.length === 1) return;
    setDetalle(detalle.filter((_, i) => i !== idx));
  };

  // Total de la venta
  const getTotal = () => detalle.reduce((tot, d) => tot + Number(d.subtotal || 0), 0);

  // Crear venta
  const handleSubmit = async e => {
    e.preventDefault();
    const id_usuario = getUserIdFromToken();
    if (!id_usuario) {
      Swal.fire({
        icon: "error",
        title: "Usuario no autenticado",
        text: "Debes iniciar sesión para registrar ventas",
      });
      return;
    }
    if (!id_cliente || detalle.some(d => !d.id_producto || !d.cantidad)) {
      Swal.fire({
        icon: "warning",
        title: "Selecciona cliente y productos",
        timer: 1800,
        showConfirmButton: false,
      });
      return;
    }
    setLoading(true);
    try {
      const ventaData = {
        id_cliente: Number(id_cliente),
        id_usuario: id_usuario,
        total: Number(getTotal()),
        detalles: detalle.map(d => ({
          id_producto: Number(d.id_producto),
          cantidad: Number(d.cantidad),
          subtotal: Number(d.subtotal),
        }))
      };


      const res = await fetch("http://localhost:3104/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ventaData)
      });
      if (!res.ok) throw new Error("Error al guardar la venta");
      Swal.fire({
        icon: "success",
        title: "¡Venta realizada!",
        showConfirmButton: false,
        timer: 1200,
      });
      setIdCliente("");
      setDetalle([{ ...initialDetalle }]);
      fetch("http://localhost:3104/ventas")
        .then(res => res.json())
        .then(data => setVentas(data));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Eliminar venta (si tu API lo soporta)
  const handleEliminarVenta = async id => {
    const confirm = await Swal.fire({
      title: "¿Eliminar venta?",
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
      const res = await fetch(`http://localhost:3104/ventas/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("No se pudo eliminar la venta");
      Swal.fire({
        icon: "success",
        title: "Venta eliminada",
        showConfirmButton: false,
        timer: 1200,
      });
      setVentas(ventas.filter(v => v.id !== id));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
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
          <div className="login-avatar" style={{ background: "rgba(79,210,80,0.13)" }}>
            <i className="bi bi-cart-check-fill"></i>
          </div>
          <h2 style={{ fontWeight: 700, color: "#343a40" }}>Ventas</h2>
          <p className="text-secondary" style={{ fontSize: 15 }}>
            Registra nuevas ventas y consulta el historial.
          </p>
        </div>

        {/* FORMULARIO DE VENTA */}
        <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded shadow-sm bg-light">
          <h5 className="mb-3">Realizar venta</h5>
          <div className="row mb-2">
            <div className="col-md-4 mb-2">
              <select
                className="form-control"
                value={id_cliente}
                onChange={handleClienteChange}
                required
              >
                <option value="">Seleccionar cliente</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.nombre} {c.apellido}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-8">
              {detalle.map((d, i) => (
                <div className="row mb-2" key={i}>
                  <div className="col-6 col-md-5">
                    <select
                      className="form-control"
                      value={d.id_producto}
                      onChange={e => handleDetalleChange(i, "id_producto", e.target.value)}
                      required
                    >
                      <option value="">Producto</option>
                      {productos.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.nombre} (${p.precio})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-4 col-md-3">
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={d.cantidad}
                      onChange={e => handleDetalleChange(i, "cantidad", e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-2 d-flex align-items-center">
                    <span className="me-2 fw-bold text-secondary">
                      ${d.subtotal ? Number(d.subtotal).toFixed(2) : "0.00"}
                    </span>
                    {detalle.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveDetalle(i)}
                        tabIndex={-1}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    )}
                    {i === detalle.length - 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-success ms-2"
                        onClick={handleAddDetalle}
                        tabIndex={-1}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 mb-1 fw-bold">
            Total: ${getTotal().toFixed(2)}
          </div>
          <button
            className="btn btn-primary mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Registrar venta"}
          </button>
        </form>

        {/* TABLA DE VENTAS */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle bg-white">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Usuario</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-secondary">
                    No hay ventas registradas.
                  </td>
                </tr>
              ) : (
                ventas.map(v => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.cliente?.nombre} {v.cliente?.apellido}</td>
                    <td>{v.usuario?.nombreUsuario || v.usuario?.email || v.usuario?.id}</td>
                    <td>
                      <ul className="mb-0">
                          {v.detalles?.map((item, idx) => (
                            <li key={idx}>
                            {item.producto?.nombre || item.id_producto} x {item.cantidad} (${Number(item.subtotal).toFixed(2)})
                            </li>
                        ))}
                      </ul>
                    </td>
                    <td>${Number(v.total || 0).toFixed(2)}</td>
                    <td>{v.fecha ? new Date(v.fecha).toLocaleString() : ""}</td>
                    <td>
                      <button className="btn btn-sm btn-danger"
                        onClick={() => handleEliminarVenta(v.id)}>
                        <i className="bi bi-trash"></i> Eliminar
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
