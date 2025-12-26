const API_BASE_URL = 'https://dummyjson.com/products';

export async function fetchFromApi<T>(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error('Gagal mengambil data!');
  }

  return response.json();
}