<script setup lang="ts">
import { MENUS } from '@/constants';
import { Menu, Search } from 'lucide-vue-next';
import Logo from './Logo.vue';
import { ref } from 'vue';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
}
  
</script>

<template>
  <nav class="sticky z-20 top-0 px-6 md:px-16 py-4 backdrop-blur-2xl">
    <div class="flex items-center justify-between gap-12">
      <Logo />

      <div class="hidden md:flex items-center gap-6">
        <router-link
          v-for="menu in MENUS"
          :key="menu.name"
          :to="menu.path"
          class="duration-300 text-lg font-medium hover:text-primary!"
        >
          {{ menu.name }}
        </router-link>
      </div>

      <!-- Search Bar -->
      <div class="hidden md:flex items-center border border-gray-200 rounded-xl">
        <input
          type="text"
          placeholder="Cari buku disini..."
          class="focus:outline-none px-4"
        />
        <button type="button" class="py-3 px-4 bg-primary text-white rounded-r-xl cursor-pointer duration-300 hover:bg-black">
          <Search class="h-6 w-6" />
        </button>
      </div>

      <!-- Burger -->
      <button 
        type="button" 
        class="flex md:hidden p-2 bg-primary text-white rounded-lg"
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
        :class="isSidebarOpen ? 'max-w-64' : 'max-w-0'"
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

          <!-- Search Bar -->
          <div class="flex items-center border border-gray-200 rounded-xl mt-6 text-sm">
            <input
              type="text"
              placeholder="Cari buku disini..."
              class="focus:outline-none px-2"
            />
            <button type="button" class="py-3 p-2 bg-primary text-white rounded-r-xl cursor-pointer duration-300 hover:bg-black">
              <Search class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>