import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import JoblyApi from "../api";

export default function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      setLoading(true);
      setError(null);

      try {
        const data = await JoblyApi.getCompany(handle);
        setCompany(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load company");
      } finally {
        setLoading(false);
      }
    }

    fetchCompany();
  }, [handle]);

  if (loading) return <p style={{ padding: 16 }}>Loading company...</p>;
  if (error) return <p style={{ padding: 16 }}>{error}</p>;
  if (!company) return <p style={{ padding: 16 }}>Company not found.</p>;

  return (
    <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
      <Link to="/companies">← Back to Companies</Link>

      <h2 style={{ marginTop: 12 }}>{company.name}</h2>
      <p style={{ opacity: 0.9 }}>{company.description}</p>
      <p style={{ opacity: 0.7 }}>Employees: {company.numEmployees ?? "—"}</p>

      <h3 style={{ marginTop: 20 }}>Jobs</h3>
      {company.jobs?.length ? (
        company.jobs.map((j) => (
          <div
            key={j.id}
            style={{ border: "1px solid #ddd", borderRadius: 12, padding: 14, marginTop: 12 }}
          >
            <strong>{j.title}</strong>
            <div style={{ opacity: 0.8, marginTop: 6 }}>
              Salary: {j.salary ?? "—"} • Equity: {j.equity ?? "—"}
            </div>
          </div>
        ))
      ) : (
        <p>No jobs listed.</p>
      )}
    </div>
  );
}