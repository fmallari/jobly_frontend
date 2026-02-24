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
    <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 12 }}>Companies</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search companies by name..."
          style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <button type="submit" style={{ padding: "10px 14px", borderRadius: 8 }}>
          Search
        </button>
        <button type="button" onClick={handleClear} style={{ padding: "10px 14px", borderRadius: 8 }}>
          Clear
        </button>
      </form>

      {loading && <p>Loading companies...</p>}
      {!loading && error && <p>{error}</p>}

      {!loading && !error && companies.length === 0 && (
        <p>No companies found{submittedSearch ? ` for "${submittedSearch}"` : ""}.</p>
      )}

      {!loading && !error && companies.map((c) => (
        <Link
          key={c.handle}
          to={`/companies/${c.handle}`}
          style={{
            display: "block",
            textDecoration: "none",
            color: "inherit",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              padding: 14,
              border: "1px solid #ddd",
              borderRadius: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <strong>{c.name}</strong>
              <span style={{ opacity: 0.7 }}>{c.numEmployees ?? "—"} employees</span>
            </div>
            <p style={{ marginTop: 8, opacity: 0.9 }}>{c.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}