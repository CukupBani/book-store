import { fetchFromApi } from "@/services/api";
import { ref } from "vue";

export interface Book {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
  brand: string;
}

export function useProducts() {
  const books = ref<Book[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const getBooks = async (limit = 12) => {
    isLoading.value = true;

    try {
      const data = await fetchFromApi<{ products: Book[] }>(
        `?limit=${limit}`
      );
      books.value = data.products
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Terjadi Kesalahan';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    books,
    isLoading,
    error,
    getBooks
  };
}