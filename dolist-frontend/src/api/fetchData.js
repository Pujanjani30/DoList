const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export default async function fetchData(endpoint, options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
}
) {

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, credentials: 'include' });

    const jsonData = await response.json();

    if (!response.ok) {
      throw jsonData;
    }

    return jsonData;
  } catch (err) {
    console.log(err);
    return err;
  }
}
