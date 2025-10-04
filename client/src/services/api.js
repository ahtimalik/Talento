// client/src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

export const signupHR = async (data) => {
  const response = await fetch(`${API_BASE_URL}/hr/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const loginHR = async (data) => {
  const response = await fetch(`${API_BASE_URL}/hr/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};