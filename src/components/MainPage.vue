<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cart';

// Данные для каталога товаров
const products = ref([
  { id: 1, name: 'Товар 1', price: 1999, image: 'https://via.placeholder.com/300x200?text=Товар+1' },
  { id: 2, name: 'Товар 2', price: 2999, image: 'https://via.placeholder.com/300x200?text=Товар+2' },
  { id: 3, name: 'Товар 3', price: 1499, image: 'https://via.placeholder.com/300x200?text=Товар+3' },
  { id: 4, name: 'Товар 4', price: 3999, image: 'https://via.placeholder.com/300x200?text=Товар+4' },
]);

// Подключение хранилища корзины
const cartStore = useCartStore();

// Функция добавления в корзину
const addToCart = (product) => {
  cartStore.addToCart(product);
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Шапка -->
    <header class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">
          <router-link to="/">Hertzxq Shop</router-link>
        </h1>
        <nav>
          <ul class="flex space-x-6">
            <li><router-link to="/" class="hover:text-gray-300">Главная</router-link></li>
            <li><router-link to="/catalog" class="hover:text-gray-300">Каталог</router-link></li>
            <li><router-link to="/about" class="hover:text-gray-300">О нас</router-link></li>
            <li><router-link to="/contacts" class="hover:text-gray-300">Контакты</router-link></li>
          </ul>
        </nav>
        <div>
          <router-link to="/cart" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Корзина</router-link>
        </div>
      </div>
    </header>

    <!-- Баннер -->
    <main class="flex-grow">
      <section class="bg-gray-100 py-16">
        <div class="container mx-auto text-center">
          <h2 class="text-4xl font-bold mb-4">Добро пожаловать в наш магазин!</h2>
          <p class="text-lg mb-6">Лучшие товары по лучшим ценам</p>
          <router-link to="/catalog" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-block">
            Посмотреть каталог
          </router-link>
        </div>
      </section>

      <!-- Каталог товаров -->
      <section class="container mx-auto py-12">
        <h2 class="text-3xl font-bold text-center mb-8">Популярные товары</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="product in products" :key="product.id" class="border rounded-lg shadow-lg p-4">
            <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover mb-4 rounded">
            <h3 class="text-xl font-semibold">{{ product.name }}</h3>
            <p class="text-gray-600">{{ product.price }} ₽</p>
            <button
              @click="addToCart(product)"
              class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full corsor-pointer"
            >
              В корзину
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- Футер -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto text-center">
        <p>© 2025 Мой Магазин. Все права защищены.</p>
        <div class="mt-4">
          <router-link to="#" class="text-gray-300 hover:text-white mx-2">Политика конфиденциальности</router-link>
          <router-link to="#" class="text-gray-300 hover:text-white mx-2">Условия использования</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>