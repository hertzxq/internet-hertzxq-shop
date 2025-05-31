   import { defineConfig } from 'vite';
   import vue from '@vitejs/plugin-vue';
   import tailwindcss from '@tailwindcss/vite';

   export default defineConfig({
     plugins: [
       vue(), // Add Vue plugin to handle .vue files
       tailwindcss(), // Tailwind CSS plugin
     ],
   });