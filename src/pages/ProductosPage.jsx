import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./LoginAnimado.css";

const initialForm = {
  id: null,
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  imagen: "",
  id_categoria: "",
  id_proveedor: "",
};

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editando, setEditando] = useState(false);

  const cargarProductos = () => {
    fetch("https://nestjs-ecommerce-valdivieso-backend-api.desarrollo-software.xyz/productos")
      .then(res => res.json())
      .then(data => setProductos(data));
  };

  const cargarCategorias = () => {
    fetch("https://nestjs-ecommerce-valdivieso-backend-api.desarrollo-software.xyz/categorias")
      .then(res => res.json())
      .then(data => setCategorias(data));
  };

  const cargarProveedores = () => {
    fetch("https://nestjs-ecommerce-valdivieso-backend-api.desarrollo-software.xyz/proveedor")
      .then(res => res.json())
      .then(data => setProveedores(data));
  };

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
    cargarProveedores();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (
      !form.nombre ||
      !form.precio ||
      !form.stock ||
      !form.id_categoria ||
      !form.id_proveedor
    ) {
      Swal.fire({
        icon: "warning",
        title: "Todos los campos obligatorios",
        timer: 1800,
        showConfirmButton: false,
      });
      return;
    }
    try {
      const res = await fetch(
        "https://nestjs-ecommerce-valdivieso-backend-api.desarrollo-software.xyz/productos" + (editando ? `/${form.id}` : ""),
        {
          method: editando ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Error al guardar producto");
      Swal.fire({
        icon: "success",
        title: editando ? "¡Producto actualizado!" : "¡Producto creado!",
        showConfirmButton: false,
        timer: 1200,
      });
      setForm(initialForm);
      setEditando(false);
      cargarProductos();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  const handleEditar = producto => {
    setForm({
      ...producto,
      id_categoria: producto.id_categoria?.toString() || producto.categoria?.id?.toString() || "",
      id_proveedor: producto.id_proveedor?.toString() || producto.proveedor?.id?.toString() || ""
    });
    setEditando(true);
  };

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
      const res = await fetch(`https://nestjs-ecommerce-valdivieso-backend-api.desarrollo-software.xyz/productos
/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar producto");
      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        showConfirmButton: false,
        timer: 1200,
      });
      cargarProductos();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  const handleCancelar = () => {
    setForm(initialForm);
    setEditando(false);
  };

  return (
    <div className="login-bg-animado">
      <div
        className="card login-card-animado shadow-lg p-4"
        style={{
          maxWidth: 1200,
          width: "100%",
          borderRadius: 22,
          margin: "0 auto"
        }}
      >
        <div className="text-center mb-4">
          <div className="login-avatar" style={{ background: "rgba(255,200,0,0.12)" }}>
            <i className="bi bi-box-seam"></i>
          </div>
          <h2 style={{ fontWeight: 700, color: "#343a40" }}>Productos</h2>
          <p className="text-secondary" style={{ fontSize: 15 }}>
            Gestión de productos en el inventario.
          </p>
        </div>
        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded shadow-sm bg-light">
          <h5 className="mb-3">{editando ? "Editar producto" : "Crear producto"}</h5>
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
            <div className="col">
              <input
                className="form-control"
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                placeholder="Precio"
                required
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Stock"
                required
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <input
                className="form-control"
                name="imagen"
                value={form.imagen}
                onChange={handleChange}
                placeholder="URL de imagen"
              />
            </div>
            <div className="col">
              <select
                className="form-control"
                name="id_categoria"
                value={form.id_categoria}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <select
                className="form-control"
                name="id_proveedor"
                value={form.id_proveedor}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar proveedor</option>
                {proveedores.map(prov => (
                  <option key={prov.id} value={prov.id}>
                    {prov.nombre}
                  </option>
                ))}
              </select>
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
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Imagen</th>
                <th>Categoría</th>
                <th>Proveedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center text-secondary">
                    No hay productos registrados.
                  </td>
                </tr>
              ) : (
                productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td>{p.descripcion}</td>
                    <td>{p.precio}</td>
                    <td>{p.stock}</td>
                    <td>
                      {p.imagen && (
                        <img src={p.imagen} alt={p.nombre} width={50} height={50} style={{objectFit:"cover", borderRadius:10}} />
                      )}
                    </td>
                    <td>{p.categoria?.nombre || categorias.find(c => c.id === Number(p.id_categoria))?.nombre || p.id_categoria}</td>
                    <td>{p.proveedor?.nombre || proveedores.find(pr => pr.id === Number(p.id_proveedor))?.nombre || p.id_proveedor}</td>
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
