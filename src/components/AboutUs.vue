<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Шапка -->
    <header class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold cursor-pointer"><router-link to="/">Hertzxq Shop</router-link></h1>
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

    <!-- Основное содержимое -->
    <main class="flex-grow container mx-auto py-12">
      <h2 class="text-3xl font-bold text-center mb-8">О нас</h2>
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-lg text-gray-700 mb-6">
          Добро пожаловать в <span class="font-semibold">Мой Магазин</span>! Мы — ваш надежный партнер в мире онлайн-шопинга, предлагающий широкий ассортимент товаров от электроники до стильной одежды и аксессуаров.
        </p>
        <p class="text-lg text-gray-700 mb-6">
          Наша миссия — сделать покупки удобными, доступными и приятными. Мы тщательно отбираем продукцию, чтобы гарантировать высокое качество и лучшие цены. Наша команда работает для вас, чтобы обеспечить быструю доставку и отличное обслуживание.
        </p>
        <p class="text-lg text-gray-700 mb-6">
          Основанный в 2023 году, наш магазин быстро завоевал доверие клиентов благодаря прозрачной политике, удобному интерфейсу и вниманию к деталям. Присоединяйтесь к тысячам довольных покупателей и откройте для себя мир качественных товаров!
        </p>
        <router-link to="/catalog" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 inline-block">
          Перейти в каталог
        </router-link>
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