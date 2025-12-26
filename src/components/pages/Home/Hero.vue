<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';


</script>

<template>
  <div class="section-padding bg-linear-to-r from-orange-600 to-orange-900 flex flex-col md:flex-row gap-8 md:gap-12">
    <!-- left container -->
    <div class="md:w-5/12 min-h-64 md:min-h-96 bg-white rounded-lg">

    </div>

    <!-- right container -->
    <div class="md:w-7/12 flex flex-col justify-center text-center text-white gap-4 md:gap-6">
      <p class="text-lg">Lorem ipsum dolor sit amet.</p>
      <h1 class="font-bold text-4xl md:text-6xl">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
      <p class="text-xl font-medium">Lorem ipsum dolor sit amet.</p>

      <router-link to="/" class="mx-auto mt-4">
        <button type="button" class="btn-secondary group flex items-center gap-1">
          Find Out More
          <ArrowRight class="duration-300 group-hover:translate-x-2" />
        </button>
      </router-link>
    </div>
  </div>
</template>