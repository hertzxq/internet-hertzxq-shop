<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cart';

// Данные товаров
const products = ref([
  { id: 1, name: 'Смартфон X', price: 19999, category: 'Электроника', image: 'https://via.placeholder.com/300x200?text=Смартфон+X' },
  { id: 2, name: 'Ноутбук Pro', price: 49999, category: 'Электроника', image: 'https://via.placeholder.com/300x200?text=Ноутбук+Pro' },
  { id: 3, name: 'Футболка', price: 1499, category: 'Одежда', image: 'https://via.placeholder.com/300x200?text=Футболка' },
  { id: 4, name: 'Кроссовки', price: 3999, category: 'Одежда', image: 'https://via.placeholder.com/300x200?text=Кроссовки' },
  { id: 5, name: 'Часы Smart', price: 9999, category: 'Аксессуары', image: 'https://via.placeholder.com/300x200?text=Часы+Smart' },
  { id: 6, name: 'Наушники', price: 4999, category: 'Электроника', image: 'https://via.placeholder.com/300x200?text=Наушники' },
]);

// Фильтры и сортировка
const categories = ref(['Все', 'Электроника', 'Одежда', 'Аксессуары']);
const selectedCategory = ref('Все');
const searchQuery = ref('');
const sortOrder = ref('default');

const filteredProducts = computed(() => {
  let filtered = products.value;

  if (selectedCategory.value !== 'Все') {
    filtered = filtered.filter(product => product.category === selectedCategory.value);
  }

  if (searchQuery.value) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (sortOrder.value === 'price-asc') {
    return filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder.value === 'price-desc') {
    return filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
});

const setCategory = (category) => {
  selectedCategory.value = category;
};

const setSortOrder = (order) => {
  sortOrder.value = order;
};

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

    <!-- Основное содержимое -->
    <main class="flex-grow container mx-auto py-12">
      <h2 class="text-3xl font-bold text-center mb-8">Каталог товаров</h2>
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск по названию..."
            class="w-full sm:w-1/3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div class="flex space-x-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="setCategory(category)"
              :class="[
                'px-4 py-2 rounded-lg transition-colors',
                selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              ]"
            >
              {{ category }}
            </button>
          </div>
          <select
            v-model="sortOrder"
            @change="setSortOrder($event.target.value)"
            class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="border rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-200"
        >
          <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover mb-4 rounded">
          <h3 class="text-xl font-semibold">{{ product.name }}</h3>
          <p class="text-gray-600">{{ product.price }} ₽</p>
          <p class="text-sm text-gray-500 mb-4">{{ product.category }}</p>
          <button
            @click="addToCart(product)"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition-colors"
          >
            В корзину
          </button>
        </div>
      </div>

      <div v-if="filteredProducts.length === 0" class="text-center text-gray-600 mt-8">
        Нет товаров, соответствующих вашему запросу.
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