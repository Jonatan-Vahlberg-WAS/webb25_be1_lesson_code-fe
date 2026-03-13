import { useState } from "react";
import { loginUser } from "../../api/auth";

export default function LoginForm({ onToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError(null);

      const data = await loginUser({ email, password });

      onToken?.(data.accessToken);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
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
        <button>Login</button>
      </form>
    </div>
  );
}
