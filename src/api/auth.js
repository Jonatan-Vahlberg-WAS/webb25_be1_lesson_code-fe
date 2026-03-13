import { apiFetch } from "./client";

export function registerUser({ name, email, password }) {
  try {
    return apiFetch("/auth/register", { method: "POST" }, { name, email, password });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function loginUser({ email, password }) {
  try {
    return apiFetch("/auth/login", { method: "POST" }, { email, password });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
