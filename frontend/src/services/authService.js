const API_URL = "http://localhost:5028/api/Auth";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return await response.json();
}
