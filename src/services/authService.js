export async function login(email, password) {
  const response = await fetch("https://nestjs-ecommerce-valdivieso-backend-api.desarrollo-software.xyz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    // Si la respuesta es 401, 400, etc
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Credenciales inválidas");
  }

  return await response.json(); // { access_token, user }
}
