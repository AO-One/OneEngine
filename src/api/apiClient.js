// src/api/apiClient.js
import API_BASE_URL from '@/config';

class LocalSDK {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);
    if (!response.ok) {
      throw new Error(`API Error [${response.status}]: ${response.statusText}`);
    }
    return response.json();
  }

  // 1. Database Operations (Routes to database_gate.py local DB handlers)
  entities = {
    get: (entity, id) => this.request(`/api/db/${entity}/${id}`),
    list: (entity) => this.request(`/api/db/${entity}`),
    find: (entity, query = {}) => this.request(`/api/db/${entity}/find`, {
      method: 'POST',
      body: JSON.stringify(query),
    }),
    create: (entity, data) => this.request(`/api/db/${entity}/create`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (entity, id, data) => this.request(`/api/db/${entity}/update`, {
      method: 'POST',
      body: JSON.stringify({ id, ...data }),
    }),
    delete: (entity, id) => this.request(`/api/db/${entity}/${id}`, {
      method: 'DELETE',
    }),
  };

  // 2. Virtual Brain & Host AI Integration
  integrations = {
    // Direct execution via OneEngine Virtual Brain on database_gate.py
    invokeBrain: (appModule, prompt, context = {}) => this.request('/api/brain/execute', {
      method: 'POST',
      body: JSON.stringify({ app_module: appModule, prompt, context }),
    }),
    // Fallback standard LLM trigger
    invokeLLM: (prompt) => this.request('/api/brain/execute', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    }),
  };

  // 3. Health Check
  health = () => this.request('/api/health');
}

export const api = new LocalSDK(API_BASE_URL);
export default api;