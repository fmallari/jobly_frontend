import { useEffect, useState } from "react";
import JoblyApi from "../api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      setError(null);

      try {
        const data = await JoblyApi.getJobs(submittedSearch.trim() || undefined);
        setJobs(data);
      } catch (err) {
        console.error(err);
        setError(err?.[0] || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
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
      <h2 style={{ marginBottom: 12 }}>Jobs</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs by title..."
          style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <button type="submit" style={{ padding: "10px 14px", borderRadius: 8 }}>
          Search
        </button>
        <button type="button" onClick={handleClear} style={{ padding: "10px 14px", borderRadius: 8 }}>
          Clear
        </button>
      </form>

      {loading && <p>Loading jobs...</p>}
      {!loading && error && <p>{error}</p>}

      {!loading && !error && jobs.length === 0 && (
        <p>No jobs found{submittedSearch ? ` for "${submittedSearch}"` : ""}.</p>
      )}

      {!loading && !error && jobs.map((j) => (
        <div
          key={j.id}
          style={{ border: "1px solid #ddd", borderRadius: 12, padding: 14, marginBottom: 12 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <strong>{j.title}</strong>
            <span style={{ opacity: 0.7 }}>{j.companyName ?? j.companyHandle ?? ""}</span>
          </div>

          <div style={{ opacity: 0.85, marginTop: 8 }}>
            Salary: {j.salary ?? "—"} • Equity: {j.equity ?? "—"}
          </div>
        </div>
      ))}
    </div>
  );
}