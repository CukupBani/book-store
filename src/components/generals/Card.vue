<script setup lang="ts">
import { computed } from 'vue';


interface CardProps {
  title: string;
  thumbnail: string;
  price: number;
  rating: number;
  author: string;
}

const props = defineProps<CardProps>();

const maxRating = 5;

const filledStars = computed(() =>
  Math.round(Math.min(props.rating, maxRating))
);

const emptyStars = computed(() =>
  maxRating - filledStars.value
);
</script>

<template>
  <div class="p-4 bg-white rounded-xl border border-gray-200 duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1">
    <div class="flex bg-primary rounded-xl">
      <img :src="thumbnail" class="object-cover w-full h-full" />
    </div>

    <div class="flex flex-col gap-1 mt-4">
      <h3 class="font-medium text-xl">{{ title }}</h3>
      <p class="text-gray-500 text-sm">by {{ author }}</p>

      <!-- Rating -->
      <div class="flex items-center gap-1 mt-2">
        <span
          v-for="n in filledStars"
          :key="'filled-' + n"
          class="text-yellow-400 text-xl"
        >
          ★
        </span>

        <span
          v-for="n in emptyStars"
          :key="'empty-' + n"
          class="text-gray-300"
        >
          ★
        </span>

        <span class="text-sm text-gray-500 ml-2">
          {{ rating.toFixed(1) }}
        </span>
      </div>

      <p class="font-semibold text-xl mt-2">
        Rp {{ price.toLocaleString('id-ID') }}
      </p>
    </div>
  </div>
</template>