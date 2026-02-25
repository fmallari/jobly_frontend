import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import Home from "./pages/Home";
import { AuthContext } from "./auth/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const { isLoggedIn, username, logout } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <nav className="border-b border-gray-200 bg-white/70 backdrop-blur">
        <div className="page-container flex items-center gap-6 py-4">
          <Link className="text-sm font-semibold text-gray-900 hover:text-black" to="/">
            Home
          </Link>
          <Link className="text-sm font-semibold text-gray-700 hover:text-black" to="/companies">
            Companies
          </Link>
          <Link className="text-sm font-semibold text-gray-700 hover:text-black" to="/jobs">
            Jobs
          </Link>
          {isLoggedIn && (
            <Link className="text-sm font-semibold text-gray-700 hover:text-black" to="/applications">
              Applications
            </Link>
          )}

          <div className="ml-auto flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-600">
                  Signed in as <span className="font-semibold text-gray-900">{username}</span>
                </span>
                <button onClick={logout} className="btn-outline">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link className="text-sm font-semibold text-gray-700 hover:text-black" to="/login">
                  Sign in
                </Link>
                <Link className="btn-primary" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}