const API_URL = "http://localhost:5028/api/Teams";

export async function getTeams() {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not load teams");
  }

  return await response.json();
}

export async function createTeam(team) {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });

  if (!response.ok) {
    throw new Error("Could not create team");
  }

  return await response.json();
}
