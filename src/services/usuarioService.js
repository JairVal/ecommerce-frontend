export async function getUsuarios() {
  const res = await fetch("http://localhost:4000/usuarios");
  return await res.json();
}
