export async function getUsuarios() {
  const res = await fetch("https://nestjs-ecommerce-valdivieso-backend-api.desarrollo-software.xyz/usuarios");
  return await res.json();
}
