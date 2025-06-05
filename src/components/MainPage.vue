<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cart';

// Состояние для данных товаров
const products = ref([]);
const errorMessage = ref(null);

// Состояние для анимации и состояния кнопки
const animatingProduct = ref(null);
const addedToCart = ref({});

// Подключение хранилища корзины
const cartStore = useCartStore();

// Функция для получения данных с API
const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    const data = await response.json();
    console.log('Полученные данные:', data);
    products.value = data.slice(0, 4);
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
    errorMessage.value = `Не удалось загрузить товары. Ошибка: ${error.message}`;
  }
};

// Загрузка данных при монтировании компонента
onMounted(fetchProducts);

// Функция добавления в корзину с анимацией
const addToCart = (product) => {
  animatingProduct.value = product.id;
  addedToCart.value[product.id] = true;
  setTimeout(() => {
    cartStore.addToCart(product);
    animatingProduct.value = null;
    setTimeout(() => {
      addedToCart.value[product.id] = false;
    }, 1000);
  }, 600);
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-800 text-white p-4 relative">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">
          <router-link to="/">Hertzxq Shop</router-link>
        </h1>
        <nav>
          <ul class="flex space-x-6">
            <li><router-link to="/" class="hover:text-gray-300">Главная</router-link></li>
            <li><router-link to="/catalog" class="hover:text-gray-300">Каталог</router-link></li>
            <li><router-link to="/aboutUs" class="hover:text-gray-300">О нас</router-link></li>
            <li><router-link to="/contacts" class="hover:text-gray-300">Контакты</router-link></li>
          </ul>
        </nav>
        <div>
          <router-link to="/cart" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Корзина</router-link>
        </div>
      </div>
    </header>

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

      <section class="container mx-auto py-12">
        <h2 class="text-3xl font-bold text-center mb-8">Популярные товары</h2>
        <div v-if="errorMessage" class="text-center text-red-500 mb-4">
          {{ errorMessage }}
        </div>
        <div v-else-if="products.length === 0" class="text-center text-gray-600 mb-4">
          Товары не найдены.
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="product in products" :key="product.id" class="border rounded-lg shadow-lg p-4 relative product-card">
            <transition name="cart-animation">
              <div v-if="animatingProduct === product.id" class="absolute inset-0 z-10">
                <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded animate-to-cart">
              </div>
            </transition>
            <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover mb-4 rounded">
            <h3 class="text-xl font-semibold">{{ product.name }}</h3>
            <p class="text-gray-600">{{ product.price }} ₽</p>
            <button
              @click="addToCart(product)"
              class="mt-4 px-4 py-2 rounded w-full cursor-pointer transition-all duration-300 transform hover:scale-110"
              :class="{
                'bg-blue-500 hover:bg-blue-600 text-white': !addedToCart[product.id],
                'bg-green-500 text-white': addedToCart[product.id]
              }"
            >
              {{ addedToCart[product.id] ? 'Добавлено' : 'В корзину' }}
            </button>
          </div>
        </div>
      </section>
    </main>

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

/* Анимация для добавления в корзину */
.animate-to-cart {
  animation: cartAnimation 0.6s ease-in-out forwards;
}

@keyframes cartAnimation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.5) translateY(-100px);
    opacity: 0.7;
  }
  100% {
    transform: scale(0.2) translateY(-300px) translateX(600px);
    opacity: 0;
  }
}

/* Стили для Vue transition */
.cart-animation-enter-active,
.cart-animation-leave-active {
  transition: all 0.6s ease-in-out;
}

.cart-animation-enter-from,
.cart-animation-leave-to {
  opacity: 0;
}

/* Анимация появления карточек товаров */
.product-card {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Улучшенные стили для кнопок */
button {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover:not(.bg-green-500) {
  transform: scale(1.05);
}
</style>