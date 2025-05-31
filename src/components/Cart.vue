<script setup>
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cart';

// Подключение хранилища корзины
const cartStore = useCartStore();
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

    <!-- Основное содержимое -->
    <main class="flex-grow container mx-auto py-12">
      <h2 class="text-3xl font-bold text-center mb-8">Ваша корзина</h2>
      <div v-if="cartStore.items.length === 0" class="text-center text-gray-600">
        Ваша корзина пуста. <router-link to="/catalog" class="text-blue-500 hover:underline">Перейти в каталог</router-link>
      </div>
      <div v-else class="max-w-4xl mx-auto">
        <!-- Список товаров -->
        <div v-for="item in cartStore.items" :key="item.id" class="flex items-center border-b py-4">
          <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded mr-4" />
          <div class="flex-grow">
            <h3 class="text-xl font-semibold">{{ item.name }}</h3>
            <p class="text-gray-600">{{ item.price }} ₽</p>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="cartStore.decreaseQuantity(item.id)"
              class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              -
            </button>
            <span>{{ item.quantity }}</span>
            <button
              @click="cartStore.increaseQuantity(item.id)"
              class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              +
            </button>
            <button
              @click="cartStore.removeItem(item.id)"
              class="text-red-500 hover:text-red-700"
            >
              Удалить
            </button>
          </div>
        </div>
        <!-- Итог -->
        <div class="mt-8 text-right">
          <p class="text-xl font-semibold">Итого: {{ cartStore.totalPrice }} ₽</p>
          <router-link
            to="#"
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 inline-block"
          >
            Оформить заказ
          </router-link>
        </div>
      </div>
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