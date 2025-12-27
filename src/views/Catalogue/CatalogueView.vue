<script setup lang="ts">
import Card from '@/components/generals/Card.vue';
import FilterBox from '@/components/generals/FilterBox.vue';
import { useBooks } from '@/composables/useBooks';
import { Search } from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

const { books, isLoading, error, getBooks } = useBooks();

const selectedCategories = ref<string[]>([]);
const selectedBrands = ref<string[]>([]);
const priceRange = ref<[number, number]>([0, 0]);
const searchInput = ref('');
const searchQuery = ref('');

let searchTimeout: number | undefined;

onMounted(() => {
  getBooks();
});

const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const matchCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(book.category);

    const matchBrand =
      selectedBrands.value.length === 0 ||
      selectedBrands.value.includes(book.brand);

    const matchPrice =
      book.price >= priceRange.value[0] &&
      book.price <= priceRange.value[1];

    const matchSearch =
      searchQuery.value === '' ||
      book.title.toLowerCase().includes(searchQuery.value) ||
      book.brand.toLowerCase().includes(searchQuery.value);

    return matchCategory && matchBrand && matchPrice && matchSearch;
  });
});

const resetFilters = () => {
  selectedCategories.value = [];
  selectedBrands.value = [];
  priceRange.value = [0, 1000000];
};

const categories = computed(() => {
  return [...new Set(books.value.map(b => b.category))];
});

const brands = computed(() => {
  return [...new Set(books.value.map(b => b.brand))];
});

const minPrice = computed(() => {
  if (books.value.length === 0) return 0;
  return Math.min(...books.value.map(b => b.price));
});

const maxPrice = computed(() => {
  if (books.value.length === 0) return 0;
  return Math.max(...books.value.map(b => b.price));
});

watch(searchInput, value => {
  clearTimeout(searchTimeout);
  searchTimeout = window.setTimeout(() => {
    searchQuery.value = value.trim().toLowerCase();
  }, 300);
});

watch(
  () => books.value,
  () => {
    priceRange.value = [minPrice.value, maxPrice.value];
  },
  { immediate: true }
);

</script>

<template>
  <div>
    <!-- Header -->
    <div class="section-padding bg-primary flex flex-col md:gap-6">
      <!-- breadcrumbs -->
      <div class="flex items-center gap-2 md:text-xl">
        <router-link 
          to="/" 
          class="text-white hover:underline"
        >
          Home
        </router-link>
        <span class="text-white">/</span>
        <span class="text-white font-semibold">Catalogue</span>
      </div>

      <h1 class="mt-8 md:mt-4 font-extrabold text-4xl md:text-7xl text-white text-center">Books Catalogue</h1>

      <div class="mt-4 md:mt-2 flex items-center border border-gray-200 bg-white rounded-full w-full lg:w-7/12 mx-auto">
        <div class="pl-4">
          <Search class="w-8 h-8 text-gray-400" />
        </div>

        <input
          type="text"
          v-model="searchInput"
          placeholder="Cari buku disini..."
          class="focus:outline-none px-4 text-lg md:text-2xl py-2 md:py-4"
        />
      </div>
    </div>

    <!-- Content -->
    <div class="section-padding flex flex-col md:flex-row gap-8">
      <!-- Filter Box -->
      <div class="relative md:w-3/12">
        <FilterBox
          class="sticky top-28"
          :categories="categories"
          :brands="brands"
          :minPrice="minPrice"
          :maxPrice="maxPrice"
          @update-category="selectedCategories = $event"
          @update-brand="selectedBrands = $event"
          @update-price="priceRange = $event"
          @reset="resetFilters"
        />
      </div>

      <!-- Book List -->
      <div class="md:w-9/12">
        <!-- Skeleton -->
        <div v-if="isLoading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="n in 6"
            :key="'skeleton-' + n"
            class="p-4 bg-white rounded-xl border border-gray-200 flex flex-col gap-2"
          >
            <div class="animate-pulse bg-gray-300 h-96 w-full rounded-lg"></div>
            <div class="animate-pulse bg-gray-300 h-5 w-full rounded-lg"></div>
            <div class="animate-pulse bg-gray-300 h-3 w-1/2 rounded-lg"></div>
            <div class="animate-pulse bg-gray-300 h-5 w-3/4 rounded-lg mt-3"></div>
            <div class="animate-pulse bg-gray-300 h-5 w-1/2 rounded-lg mt-3"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredBooks.length === 0" class="flex flex-col items-center text-center mt-12">
          <img src="/images/no-data.png" class="h-56 md:h-64 w-auto" />
          <h2 class="text-2xl md:text-3xl font-medium">No books found</h2>
          <p class="text-gray-500 md:text-lg">Try adjusting your filters or search terms.</p>
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            v-for="book in filteredBooks"
            :key="book.id"
            :title="book.title"
            :thumbnail="book.thumbnail"
            :price="book.price"
            :rating="book.rating"
            :author="book.brand"
          />
        </div>
      </div>
    </div>
  </div>
</template>