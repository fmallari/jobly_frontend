import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    try {
      await login(formData);
      navigate("/companies");
    } catch (err) {
      // api.js throws an array of messages
      setErrors(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ padding: 16, maxWidth: 420, margin: "0 auto" }}>
      <h2>Sign In</h2>

      {errors.length > 0 && (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid #f3c", borderRadius: 8 }}>
          {errors.map((e) => (
            <div key={e}>{e}</div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: 12, display: "grid", gap: 10 }}>
        <label>
          Username
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ padding: "10px 14px", borderRadius: 8 }}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}