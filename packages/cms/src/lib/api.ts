const API_BASE = 'http://localhost:3000/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

export const api = {
  // Profile
  async getProfile<T>() {
    const response = await fetch(`${API_BASE}/profile`);
    return handleResponse<T>(response);
  },

  async updateProfile<T>(data: T) {
    const response = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<{ message: string; profile: T }>(response);
  },

  // Skills
  async getSkills<T>() {
    const response = await fetch(`${API_BASE}/skills`);
    return handleResponse<T>(response);
  },

  async updateSkills<T>(data: T) {
    const response = await fetch(`${API_BASE}/skills`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<{ message: string; skills: T }>(response);
  },

  // Contact
  async getContact<T>() {
    const response = await fetch(`${API_BASE}/contact`);
    return handleResponse<T>(response);
  },

  async updateContact<T>(data: T) {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<{ message: string; contact: T }>(response);
  },

  // Projects
  async getProjects<T>() {
    const response = await fetch(`${API_BASE}/projects`);
    return handleResponse<T[]>(response);
  },

  async getProject<T>(id: string) {
    const response = await fetch(`${API_BASE}/projects/${id}`);
    return handleResponse<T>(response);
  },

  async createProject<T>(data: T) {
    const response = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<{ message: string; project: T }>(response);
  },

  async updateProject<T>(id: string, data: T) {
    const response = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<{ message: string; project: T }>(response);
  },

  async deleteProject(id: string) {
    const response = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<{ message: string }>(response);
  },

  // Experience
  async getExperience<T>() {
    const response = await fetch(`${API_BASE}/experience`);
    return handleResponse<T[]>(response);
  },

  async getExperienceEntry<T>(id: string) {
    const response = await fetch(`${API_BASE}/experience/${id}`);
    return handleResponse<T>(response);
  },

  async createExperience<T>(data: T) {
    const response = await fetch(`${API_BASE}/experience`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<{ message: string; entry: T }>(response);
  },

  async updateExperience<T>(id: string, data: T) {
    const response = await fetch(`${API_BASE}/experience/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<{ message: string; entry: T }>(response);
  },

  async deleteExperience(id: string) {
    const response = await fetch(`${API_BASE}/experience/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<{ message: string }>(response);
  },

  // Blog
  async getBlog<T>() {
    const response = await fetch(`${API_BASE}/blog`);
    return handleResponse<T[]>(response);
  },

  async getBlogPost<T>(id: string) {
    const response = await fetch(`${API_BASE}/blog/${id}`);
    return handleResponse<T>(response);
  },

  async createBlogPost<T>(data: T) {
    const response = await fetch(`${API_BASE}/blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<{ message: string; post: T }>(response);
  },

  async updateBlogPost<T>(id: string, data: T) {
    const response = await fetch(`${API_BASE}/blog/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<{ message: string; post: T }>(response);
  },

  async deleteBlogPost(id: string) {
    const response = await fetch(`${API_BASE}/blog/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<{ message: string }>(response);
  },

  // Deploy
  async deploy() {
    const response = await fetch(`${API_BASE}/deploy`, {
      method: 'POST',
    });
    return handleResponse<{ success: boolean; message: string; stdout: string; stderr: string }>(
      response
    );
  },

  async getDeployStatus() {
    const response = await fetch(`${API_BASE}/deploy/status`);
    return handleResponse<{ success: boolean; message: string }>(response);
  },
};
