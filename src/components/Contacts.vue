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
      <h2 class="text-3xl font-bold text-center mb-8">Контакты</h2>
      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Контактная информация -->
        <div>
          <h3 class="text-2xl font-semibold mb-4">Свяжитесь с нами</h3>
          <p class="text-lg text-gray-700 mb-4">
            Мы всегда рады ответить на ваши вопросы! Используйте контактную информацию ниже или заполните форму.
          </p>
          <ul class="text-lg text-gray-700 space-y-2">
            <li><strong>Адрес:</strong> г. Москва, ул. Примерная, д. 123</li>
            <li><strong>Телефон:</strong> +7 (999) 123-45-67</li>
            <li><strong>Email:</strong> support@moymagazin.ru</li>
            <li><strong>Часы работы:</strong> Пн-Пт: 9:00–18:00, Сб-Вс: выходной</li>
          </ul>
          <!-- Карта (заглушка, можно заменить на iframe с реальной картой) -->
          <div class="mt-6">
            <img
              src="https://via.placeholder.com/400x200?text=Карта"
              alt="Карта расположения"
              class="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>

        <!-- Форма обратной связи -->
        <div>
          <h3 class="text-2xl font-semibold mb-4">Форма обратной связи</h3>
          <form class="space-y-4">
            <div>
              <label for="name" class="block text-gray-700">Имя</label>
              <input
                id="name"
                type="text"
                placeholder="Ваше имя"
                class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label for="email" class="block text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Ваш email"
                class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label for="message" class="block text-gray-700">Сообщение</label>
              <textarea
                id="message"
                placeholder="Ваше сообщение"
                rows="5"
                class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
            >
              Отправить
            </button>
          </form>
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