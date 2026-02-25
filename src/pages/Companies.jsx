import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "../api";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true);
      setError(null);

      try {
        const data = await JoblyApi.getCompanies(submittedSearch.trim() || undefined);
        setCompanies(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load companies");
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, [submittedSearch]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmittedSearch(search);
  }

  function handleClear() {
    setSearch("");
    setSubmittedSearch("");
  }

  return (
    <div className="page-container py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Companies</h2>
        <p className="mt-1 text-sm text-gray-600">Browse companies and view open roles.</p>
      </div>

      <form onSubmit={handleSubmit} className="search-bar mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search companies by name..."
          className="search-input"
        />
        <button type="submit" className="btn-primary">
          Search
        </button>
        <button type="button" onClick={handleClear} className="btn-outline">
          Clear
        </button>
      </form>

      {loading && <p className="text-gray-600">Loading companies...</p>}
      {!loading && error && <p className="text-rose-700">{error}</p>}

      {!loading && !error && companies.length === 0 && (
        <p className="text-gray-600">
          No companies found{submittedSearch ? ` for "${submittedSearch}"` : ""}.
        </p>
      )}

      <div className="space-y-4">
        {!loading &&
          !error &&
          companies.map((c) => (
            <Link
              key={c.handle}
              to={`/companies/${c.handle}`}
              className="block"
            >
              <div className="card group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300 cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-gray-900 group-hover:text-black transition-colors">
                      {c.name}
                    </h3>
                    <p className="card-subtitle">{c.description}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {c.numEmployees ?? "—"} employees
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}