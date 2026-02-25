import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import JoblyApi from "../api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isLoggedIn, applications, applyToJob } = useContext(AuthContext);

  // Make a set of job IDs the user has already applied to
  const appliedJobIds = new Set((applications || []).map((a) => a.jobId ?? a.id));

  async function handleApply(jobId) {
    try {
      await applyToJob(jobId);
      // optional: replace with toast later
      alert("Applied!");
    } catch (err) {
      alert(err?.[0] || "Failed to apply");
    }
  }

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
    <div className="page-container py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Jobs</h2>
        <p className="mt-1 text-sm text-gray-600">Search roles and apply in one click.</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="search-bar mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs by title..."
          className="search-input"
        />
        <button type="submit" className="btn-primary">
          Search
        </button>
        <button type="button" onClick={handleClear} className="btn-outline">
          Clear
        </button>
      </form>

      {loading && <p className="text-gray-600">Loading jobs...</p>}
      {!loading && error && <p className="text-rose-700">{error}</p>}

      {!loading && !error && jobs.length === 0 && (
        <p className="text-gray-600">
          No jobs found{submittedSearch ? ` for "${submittedSearch}"` : ""}.
        </p>
      )}

      <div className="space-y-4">
        {!loading &&
          !error &&
          jobs.map((j) => (
            <div
              key={j.id}
              className="card group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-gray-900 group-hover:text-black transition-colors">
                    {j.title}
                  </h3>
                  <p className="card-subtitle">{j.companyName ?? j.companyHandle ?? ""}</p>
                </div>

                <div className="text-right text-sm text-gray-600">
                  <div>
                    Salary: <span className="font-semibold text-gray-900">{j.salary ?? "—"}</span>
                  </div>
                  <div>
                    Equity: <span className="font-semibold text-gray-900">{j.equity ?? "—"}</span>
                  </div>
                </div>
              </div>

              {isLoggedIn && (
                <div className="mt-4">
                  {appliedJobIds.has(j.id) ? (
                    <button disabled className="btn-secondary">
                      Applied
                    </button>
                  ) : (
                    <button onClick={() => handleApply(j.id)} className="btn-primary">
                      Apply
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}