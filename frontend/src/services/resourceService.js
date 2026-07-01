const API_URL = "http://localhost:5028/api/Resources";

function getToken() {
  return localStorage.getItem("token");
}

export async function getResources() {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not load resources");
  }

  return response.json();
}

export async function createResource(resource) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(resource),
  });

  if (!response.ok) {
    throw new Error("Could not create resource");
  }

  return response.json();
}

export async function deleteResource(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not delete resource");
  }
}

export async function updateResource(id, resource) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resource),
  });

  if (!response.ok) {
    throw new Error("Could not update resource");
  }
}
