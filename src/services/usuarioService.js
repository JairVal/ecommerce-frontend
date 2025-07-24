export async function getUsuarios() {
  const res = await fetch("https://nestjs-ecommerce-valdivieso-backend-api.desarrollo-software.xyz");
  return await res.json();
}
