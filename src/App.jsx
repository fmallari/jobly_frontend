import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import Login from "./pages/Login";
import { AuthContext } from "./auth/AuthContext";

function Home() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Jobly</h1>
      <p>Welcome to Jobly</p>
    </div>
  );
}

export default function App() {
  const { isLoggedIn, username, logout } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: 12, padding: 16, alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/companies">Companies</Link>

        <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
          {isLoggedIn ? (
            <>
              <span style={{ opacity: 0.8 }}>Signed in as <strong>{username}</strong></span>
              <button onClick={logout} style={{ padding: "8px 12px", borderRadius: 8 }}>
                Sign out
              </button>
            </>
          ) : (
            <Link to="/login">Sign in</Link>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}