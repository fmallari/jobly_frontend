import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Companies from "./pages/Companies";

function Home() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Jobly</h1>
      <p>Welcome to Jobly</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: 12, padding: 16 }}>
        <Link to="/">Home</Link>
        <Link to="/companies">Companies</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Companies />} />
      </Routes>
    </BrowserRouter>
  );
}

