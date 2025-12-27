<script setup lang="ts">
import Card from '@/components/generals/Card.vue';
import FilterBox from '@/components/pages/Catalogue/FilterBox.vue';
import { useBooks } from '@/composables/useBooks';
import { computed, onMounted, ref, watch } from 'vue';

const { books, isLoading, error, getBooks } = useBooks();

const selectedCategories = ref<string[]>([]);
const selectedBrands = ref<string[]>([]);
const priceRange = ref<[number, number]>([0, 0]);

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

    return matchCategory && matchBrand && matchPrice;
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
    <div class="section-padding bg-primary flex flex-col-reverse md:flex-row items-center justify-between md:gap-6">
      <h1 class="font-extrabold text-4xl md:text-7xl text-white text-center md:text-start">Books Catalogue</h1>

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