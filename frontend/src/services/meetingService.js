const API_URL = "http://localhost:5028/api/Meetings";

function getToken() {
  return localStorage.getItem("token");
}

export async function getMeetings() {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not load meetings");
  }

  return response.json();
}

export async function createMeeting(meeting) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(meeting),
  });

  if (!response.ok) {
    throw new Error("Could not create meeting");
  }

  return response.json();
}

export async function deleteMeeting(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not delete meeting");
  }
}

export async function updateMeeting(id, meeting) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meeting),
  });

  if (!response.ok) {
    throw new Error("Could not update meeting");
  }
}
