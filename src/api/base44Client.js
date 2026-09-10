import API_BASE_URL from '@/config';

export const base44 = {
  auth: {
    me: async () => ({ id: 'local_user', name: 'Local User' }),
    logout: () => console.log('Offline local mode'),
  },

  // Routes entity queries (e.g. base44.entities.Blog.find()) to database_gate.py
  entities: new Proxy({}, {
    get: (target, entityName) => ({
      find: async (query = {}) => {
        const res = await fetch(`${API_BASE_URL}/api/db/${entityName}/find`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(query)
        });
        return res.json();
      },
      create: async (data) => {
        const res = await fetch(`${API_BASE_URL}/api/db/${entityName}/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        return res.json();
      },
      update: async (id, data) => {
        const res = await fetch(`${API_BASE_URL}/api/db/${entityName}/update`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...data })
        });
        return res.json();
      }
    })
  })
};

export default base44;