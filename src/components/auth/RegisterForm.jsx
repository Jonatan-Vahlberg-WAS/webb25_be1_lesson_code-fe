import { useState } from "react";
import { registerUser } from "../../api/auth";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError(null);
      setDone(false);

      await registerUser({ name, email, password });

      setDone(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Register failed");
    }
  }

  return (
    <div>
      <h2>Register</h2>

      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {done && <p>Skapad.</p>}

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <button>Register</button>
      </form>
    </div>
  );
}
