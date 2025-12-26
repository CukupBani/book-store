<script setup lang="ts">
import Card from '@/components/generals/Card.vue';
import FilterBox from '@/components/pages/Catalogue/FilterBox.vue';
import { useProducts } from '@/composables/useProducts';
import { onMounted } from 'vue';

const { books, isLoading, error, getBooks } = useProducts();

onMounted(() => {
  getBooks();
});

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
        <FilterBox class="sticky top-28" />
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
            v-for="book in books"
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