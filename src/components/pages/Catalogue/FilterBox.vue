<script setup lang="ts">
import { ChevronDown, Filter } from 'lucide-vue-next';
import { ref } from 'vue';

const activeIndex = ref<number | null>(null);
const toggleAccordion = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
}

</script>

<template>
  <div class="border border-gray-200 p-4 rounded-lg">
    <div class="flex items-center gap-2 text-primary mb-6">
      <h2 class="text-2xl md:text-3xl font-medium">Filters</h2>
      <Filter class="h-6 w-6" />
    </div>

    <div class="flex flex-col gap-4 md:gap-6">
      <div
        v-for="n in 3"
        :key="n"
      >
        <div class="flex items-center justify-between gap-8">
          <h3 class="text-lg md:text-xl font-medium">Category</h3>
          <ChevronDown
            @click="toggleAccordion(n)"
            :class="activeIndex === n ? 'rotate-180' : ''"
            class="cursor-pointer duration-300 transition-all h-6 w-6" 
          />
        </div>
        <div 
          class="space-y-2 mt-2 overflow-hidden duration-300 transition-all"
          :class="activeIndex === n ? 'max-h-96' : 'max-h-0'"
        >
          <label
            v-for="n in 6"
            :key="n" 
            class="flex items-center gap-2"
          >
            <input type="checkbox" class="accent-primary" />
            Fiction
          </label>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button
        type="button"
        class="bg-primary text-white py-2 px-6 text-lg cursor-pointer rounded-lg mt-6 duration-300 hover:bg-black"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>