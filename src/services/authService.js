export async function login(email, password) {
  const response = await fetch("http://localhost:4000/auth/login", {
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
