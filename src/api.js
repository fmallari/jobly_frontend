import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static token = null;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;

    const headers = {};
    if (JoblyApi.token) headers.Authorization = `Bearer ${JoblyApi.token}`;

    const params = method === "get" ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response || err);
      let message = err.response?.data?.error?.message || err.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  // Registration page - adds username, password, firstName, lastName, email
static async register({ username, password, firstName, lastName, email }) {
  console.log("STEP 3: JoblyApi.register calling /auth/register");

  const res = await this.request(
    "auth/register",
    { username, password, firstName, lastName, email } ,
    "post"
  );
  return res.token;
}
  // Sign-in page - adds username, password

static setToken(token) {
  JoblyApi.token = token;
}

static async login({ username, password }) {
  const res = await this.request("auth/token", { username, password }, "post");
  return res.token;
}

  // supports optional search by name: /companies?name=apple
  static async getCompanies(term) {
    if (!term) {
      const res = await this.request("companies");
      return res.companies;
  }

  // Try nameLike first (common in some Jobly versions), then fall back to name
  try {
    const res = await this.request("companies", { nameLike: term });
    return res.companies;
  } catch (err) {
    const res = await this.request("companies", { name: term });
    return res.companies;
  }
}

// Create job list and search by title 
static async getJobs(term) {
  if (!term) {
    const res = await this.request("jobs");
    return res.jobs;
  }

// Search by exact title of job or titleLike
  try {
    const res = await this.request("jobs", { titleLike: term });
    return res.jobs;
  } catch (err) {
    const res = await this.request("jobs", { title: term });
    return res.jobs;
  }
}
  // Company detail: /companies/:handle
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

// Apply to a job for a user (backend should implement POST /users/:username/jobs/:id)
  static async applyToJob(username, jobId) {
  const res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  return res.applied; // usually jobId
}

// Get applications for a user (backend should implement GET /users/:username/applications)
  static async getApplications(username) {
  const res = await this.request(`users/${username}/applications`);
  return res.applications ?? res.jobs ?? [];
}

}
export default JoblyApi;