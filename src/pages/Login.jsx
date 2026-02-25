import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      setErrors(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-container py-10">
      <div className="form-wrap">
        <h2 className="form-title">Sign in</h2>
        <p className="mt-2 text-sm text-gray-600">
          Welcome back. Sign in to apply to jobs and track your applications.
        </p>

        <div className="form-card">
          {errors.length > 0 && (
            <div className="error-box">
              {errors.map((e) => (
                <div key={e}>{e}</div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="label">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                className="input"
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="input"
                required
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link className="font-semibold text-gray-900 hover:underline" to="/register">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}