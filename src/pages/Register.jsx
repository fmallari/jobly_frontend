import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

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
      await register(formData);
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
        <h2 className="form-title">Create account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Create your account to apply to jobs and track your applications.
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
                autoComplete="new-password"
                className="input"
                required
              />
              <p className="helper">Use at least 6 characters.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="label">First name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">Last name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className="input"
                required
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? "Creating..." : "Create account"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link className="font-semibold text-gray-900 hover:underline" to="/login">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}