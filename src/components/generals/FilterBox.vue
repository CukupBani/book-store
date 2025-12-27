<script setup lang="ts">
import { ChevronDown, Filter } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const props = defineProps<{
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
}>();

const emit = defineEmits([
  'update-category',
  'update-brand',
  'update-price',
  'reset'
]);

const activeIndex = ref<string | null>('category');

const selectedCategories = ref<string[]>([]);
const selectedBrands = ref<string[]>([]);
const localPrice = ref<[number, number]>([props.minPrice, props.maxPrice]);

let priceTimeout: number | undefined;

watch(selectedCategories, v => emit('update-category', v));
watch(selectedBrands, v => emit('update-brand', v));
watch(localPrice, value => {
  clearTimeout(priceTimeout);
  priceTimeout = window.setTimeout(() => {
    emit('update-price', value);
  }, 300);
}, { deep: true });

watch(
  () => [props.minPrice, props.maxPrice],
  () => {
    localPrice.value = [props.minPrice, props.maxPrice];
  }
);

const toggleAccordion = (index: string) => {
  activeIndex.value = activeIndex.value === index ? null : index;
}

const resetFilters = () => {
  selectedCategories.value = [];
  selectedBrands.value = [];
  localPrice.value = [props.minPrice, props.maxPrice];
  emit('reset');
};

</script>

<template>
  <div class="border border-gray-200 p-4 rounded-lg">
    <div class="flex items-center gap-2 text-primary mb-6">
      <h2 class="text-2xl md:text-3xl font-medium">Filters</h2>
      <Filter class="h-6 w-6" />
    </div>

    <div class="flex flex-col gap-4 md:gap-6">
      <!-- Filter Category -->
      <div>
        <div
          class="flex justify-between items-center cursor-pointer"
          @click="toggleAccordion('category')"
        >
          <h3 class="text-lg font-medium">Category</h3>
          <ChevronDown
            class="w-5 h-5 transition-transform"
            :class="activeIndex === 'category' ? 'rotate-180' : ''"
          />
        </div>
        <div
          class="flex flex-col gap-2 overflow-y-auto transition-all duration-300"
          :class="activeIndex === 'category' ? 'max-h-64 mt-2' : 'max-h-0'"
        >
          <label
            v-for="cat in categories"
            :key="cat"
            class="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              :value="cat"
              v-model="selectedCategories"
              class="hidden peer"
            />

            <!-- Custom checkbox -->
            <span
              class="
                w-5 h-5
                border-2 border-primary
                rounded
                flex items-center justify-center
                peer-checked:bg-primary
                peer-checked:border-primary
                transition
              "
            >
              <svg
                v-if="selectedCategories.includes(cat)"
                xmlns="http://www.w3.org/2000/svg"
                class="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>

            <span class="capitalize">{{ cat }}</span>
          </label>
        </div>
      </div>

      <!-- Filter Author -->
      <div>
        <div
          class="flex justify-between items-center cursor-pointer"
          @click="toggleAccordion('author')"
        >
          <h3 class="text-lg font-medium">Author</h3>
          <ChevronDown
            class="w-5 h-5 transition-transform"
            :class="activeIndex === 'author' ? 'rotate-180' : ''"
          />
        </div>
        <div
          class="flex flex-col gap-2 overflow-y-auto transition-all duration-300 custom-scrollbar"
          :class="activeIndex === 'author' ? 'max-h-64 mt-2' : 'max-h-0'"
        >
          <label
            v-for="brand in brands"
            :key="brand"
            class="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              :value="brand"
              v-model="selectedBrands"
              class="hidden peer"
            />

            <!-- Custom checkbox -->
            <span
              class="
                w-5 h-5
                border-2 border-primary
                rounded
                flex items-center justify-center
                peer-checked:bg-primary
                peer-checked:border-primary
                transition
              "
            >
              <svg
                v-if="selectedBrands.includes(brand)"
                xmlns="http://www.w3.org/2000/svg"
                class="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>

            <span>{{ brand }}</span>
          </label>
        </div>
      </div>

      <!-- Filter Price Range -->
      <div>
        <h3 class="text-lg font-medium">Price Range</h3>
        <input
          type="range"
          :min="minPrice"
          :max="maxPrice"
          v-model.number="localPrice[1]"
          class="w-full mt-2 price-slider"
        />

        <div class="flex justify-between text-sm mt-1">
          <span>{{ minPrice }}</span>
          <span>{{ localPrice[1] }}</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button
        @click="resetFilters"
        class="bg-primary text-white py-2 px-6 rounded-lg mt-6 cursor-pointer duration-300 hover:bg-black"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>