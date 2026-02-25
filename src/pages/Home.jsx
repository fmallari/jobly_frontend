import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Home() {
  const { isLoggedIn, username } = useContext(AuthContext);

  return (
    <div className="page-container py-12">
      <div className="card">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
              {isLoggedIn ? `Welcome back, ${username}!` : "Welcome to Jobly"}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Search companies, explore job listings, and track applications all in one place.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Link to="/companies" className="card hover:shadow-md transition">
              <div className="text-sm font-semibold text-gray-900">Browse Companies</div>
              <div className="mt-1 text-sm text-gray-600">Find companies and view details.</div>
            </Link>

            <Link to="/jobs" className="card hover:shadow-md transition">
              <div className="text-sm font-semibold text-gray-900">Explore Jobs</div>
              <div className="mt-1 text-sm text-gray-600">Search roles by title and apply.</div>
            </Link>

            <Link
              to={isLoggedIn ? "/applications" : "/login"}
              className="card hover:shadow-md transition"
            >
              <div className="text-sm font-semibold text-gray-900">Track Applications</div>
              <div className="mt-1 text-sm text-gray-600">
                {isLoggedIn ? "View jobs you’ve applied to." : "Sign in to save and track."}
              </div>
            </Link>
          </div>

          {!isLoggedIn && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/register" className="btn-primary w-full sm:w-auto text-center">
                Create account
              </Link>
              <Link to="/login" className="btn-outline w-full sm:w-auto text-center">
                Sign in
              </Link>
              <p className="text-xs text-gray-500 sm:ml-auto">
                Tip: Create an account to apply and track jobs.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}