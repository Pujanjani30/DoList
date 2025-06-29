export default async function fetchData(url, options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
}
) {

  try {
    const response = await fetch(url, { ...options, credentials: 'include' });

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
