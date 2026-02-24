import { useEffect, useState } from "react";
import JoblyApi from "../api";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const data = await JoblyApi.getCompanies();
        setCompanies(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load companies");
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  if (loading) return <p>Loading companies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Companies</h2>

      {companies.length === 0 && <p>No companies found.</p>}

      {companies.map((c) => (
        <div
          key={c.handle}
          style={{
            marginBottom: 16,
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          <strong>{c.name}</strong>
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  );
}