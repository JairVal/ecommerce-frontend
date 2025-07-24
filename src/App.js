import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AnimatedBackground from "./pages/AnimatedBackground"; // Asegúrate de importar correctamente
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UsuariosPage from "./pages/UsuariosPage";
import ClientesPage from "./pages/ClientesPage";
import ProductosPage from "./pages/ProductosPage";
import ProveedoresPage from "./pages/ProveedoresPage";
import VentasPage from "./pages/VentasPage";
import TiendaPage from "./pages/TiendaPage";
import CategoriasPage from "./pages/CategoriasPage";

function App() {
  return (
    <BrowserRouter>
      <AnimatedBackground />
      <Routes>
        <Route path="/" element={<TiendaPage />} />
        <Route path="/tienda" element={<TiendaPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/HomePage"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <UsuariosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <ClientesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <ProductosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/proveedores"
          element={
            <ProtectedRoute>
              <ProveedoresPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ventas"
          element={
            <ProtectedRoute>
              <VentasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categorias"
          element={
            <ProtectedRoute>
              <CategoriasPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
