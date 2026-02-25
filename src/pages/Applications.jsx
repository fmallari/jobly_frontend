import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Applications() {
  const { username, applications, refreshApplications } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        await refreshApplications(username);
      } catch (e) {
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [username]); // refresh if user changes

  const apps = applications || [];

  return (
    <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 12 }}>My Applications</h2>

      {loading && <p>Loading applications...</p>}
      {!loading && error && <p>{error}</p>}

      {!loading && !error && apps.length === 0 && (
        <p>You haven’t applied to any jobs yet.</p>
      )}

      {!loading && !error && apps.map((a) => {
        const key = a.jobId ?? a.id ?? `${a.companyHandle}-${a.title}`;
        const appliedAt = a.appliedAt ? new Date(a.appliedAt).toLocaleString() : null;

        return (
          <div
            key={key}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 14,
              marginBottom: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <strong>{a.title ?? "Job"}</strong>
              <span style={{ opacity: 0.7 }}>{a.companyName ?? a.companyHandle ?? ""}</span>
            </div>

            <div style={{ opacity: 0.85, marginTop: 8 }}>
              Salary: {a.salary ?? "—"} • Equity: {a.equity ?? "—"}
            </div>

            {appliedAt && (
              <div style={{ opacity: 0.7, marginTop: 8 }}>
                Applied: {appliedAt}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}