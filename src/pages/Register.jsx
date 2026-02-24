import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  console.log("AuthContext value:", useContext(AuthContext));

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

    console.log("STEP 1: Register form submitted", formData);

    setErrors([]);
    setIsSubmitting(true);

    try {
  console.log("STEP 2: calling register()...");
  await register(formData);
  console.log("STEP 3: register() succeeded, navigating...");
  navigate("/companies");
} catch (err) {
  console.log("STEP X: register() failed:", err);
  setErrors(err);
}

    // try {
    //   await register(formData);
    //   navigate("/companies");
    // } catch (err) {
    //   setErrors(err); // api.js throws array
    // } finally {
    //   setIsSubmitting(false);
    // }
  }

  return (
    <div style={{ padding: 16, maxWidth: 520, margin: "0 auto" }}>
      <h2>Create Account</h2>

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
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
            required
          />
        </label>

        <label>
          First name
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
            required
          />
        </label>

        <label>
          Last name
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting} onClick={() => console.log("BUTTON CLICKED ✅")} style={{ padding: "10px 14px", borderRadius: 8 }}>
          {isSubmitting ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
}