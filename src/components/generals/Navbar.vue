<script setup lang="ts">
import { MENUS } from '@/constants';
import { Menu, Search, User } from 'lucide-vue-next';
import Logo from './Logo.vue';
import { ref } from 'vue';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
}
  
</script>

<template>
  <nav class="sticky z-20 top-0 px-6 md:px-16 py-4 bg-white/50 backdrop-blur-2xl">
    <div class="flex items-center justify-between gap-12">
      <Logo />

      <div class="hidden lg:flex items-center gap-6">
        <router-link
          v-for="menu in MENUS"
          :key="menu.name"
          :to="menu.path"
          class="duration-300 text-lg font-medium hover:text-primary!"
        >
          {{ menu.name }}
        </router-link>
      </div>

      <!-- Login Button -->
      <button type="button" class="hidden py-2 px-6 rounded-full font-medium text-lg bg-primary cursor-pointer duration-300 text-white lg:flex items-center justify-center gap-2 hover:bg-black">
        <User class="h-6 w-6" />
        Login
      </button>

      <!-- Burger -->
      <button 
        type="button" 
        class="flex lg:hidden p-2 bg-primary text-white rounded-lg"
        @click="toggleSidebar"
      >
        <Menu class="h-6 w-6" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div 
      class="fixed bg-black/50 inset-0 h-screen duration-300"
      @click.self="toggleSidebar"
      :class="isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    >
      <div 
        class="absolute bg-white left-0 top-0 h-full duration-300 overflow-hidden"
        :class="isSidebarOpen ? 'w-64' : 'w-0'"
      >
        <div class="flex flex-col items-center p-8">
          <Logo @click="toggleSidebar" class="mb-6" />
          
          <router-link
            v-for="menu in MENUS"
            :key="menu.name"
            :to="menu.path"
            class="text-xl py-4 font-medium"
            @click="toggleSidebar"
          >
            {{ menu.name }}
          </router-link>

          <!-- Login Button -->
          <button type="button" class="py-2 px-6 mt-6 rounded-full font-medium text-lg bg-primary cursor-pointer duration-300 text-white flex items-center justify-center gap-2 hover:bg-black">
            <User class="h-6 w-6" />
            Login
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>