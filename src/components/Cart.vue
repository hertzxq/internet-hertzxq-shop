<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();
const showDialog = ref(false);
const dialogMessage = ref('');
const isSuccess = ref(false);

const isOrderValid = computed(() =>
  cartStore.items.length > 0 && cartStore.items.every(item => item.quantity > 0)
);

const placeOrder = () => {
  if (!isOrderValid.value) {
    dialogMessage.value = 'Корзина пуста или содержит некорректные данные.';
    isSuccess.value = false;
    showDialog.value = true;
    return;
  }
  if (cartStore.totalPrice < 1000) {
    dialogMessage.value = 'Минимальная сумма заказа — 1000 ₽. Добавьте ещё товаров.';
    isSuccess.value = false;
    showDialog.value = true;
    return;
  }
  cartStore.clearCart();
  dialogMessage.value = 'Заказ успешно оформлен!';
  isSuccess.value = true;
  showDialog.value = true;
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Шапка -->
    <header class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold"><router-link to="/">Hertzxq Shop</router-link></h1>
        <nav>
          <ul class="flex space-x-6">
            <li><router-link to="/" class="hover:text-gray-300">Главная</router-link></li>
            <li><router-link to="/catalog" class="hover:text-gray-300">Каталог</router-link></li>
            <li><router-link to="/about" class="hover:text-gray-300">О нас</router-link></li>
            <li><router-link to="/contacts" class="hover:text-gray-300">Контакты</router-link></li>
          </ul>
        </nav>
        <router-link to="/cart" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Корзина</router-link>
      </div>
    </header>

    <!-- Основное содержимое -->
    <main class="flex-grow container mx-auto py-10">
      <h2 class="text-3xl font-bold text-center mb-8">Корзина</h2>

      <div v-if="cartStore.items.length === 0" class="text-center text-gray-500">
        Корзина пуста.
        <RouterLink to="/catalog" class="text-blue-500 hover:underline">Перейти в каталог</RouterLink>
      </div>

      <div v-else>
        <div v-for="item in cartStore.items" :key="item.id" class="flex items-center border-b py-4">
          <img :src="item.image" alt="" class="w-20 h-20 object-cover rounded mr-4" />
          <div class="flex-grow">
            <h3 class="text-lg font-semibold">{{ item.name }}</h3>
            <p>{{ item.price }} ₽</p>
          </div>
          <div class="flex items-center space-x-2">
            <button @click="cartStore.decreaseQuantity(item.id)" :disabled="item.quantity <= 1"
                    class="px-2 py-1 bg-gray-200 rounded">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="cartStore.increaseQuantity(item.id)" class="px-2 py-1 bg-gray-200 rounded">+</button>
            <button @click="cartStore.removeItem(item.id)" class="text-red-500 hover:underline ml-2">Удалить</button>
          </div>
        </div>

        <div class="text-right mt-6">
          <p class="text-xl font-semibold">Итого: {{ cartStore.totalPrice }} ₽</p>
          <button @click="placeOrder" :disabled="!isOrderValid"
                  class="mt-4 bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-400">
            Оформить заказ
          </button>
        </div>
      </div>

      <!-- Диалог -->
      <div v-if="showDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h3 :class="isSuccess ? 'text-green-600' : 'text-red-600'" class="text-xl font-semibold mb-2">
            {{ isSuccess ? 'Успех' : 'Ошибка' }}
          </h3>
          <p class="mb-4">{{ dialogMessage }}</p>
          <button @click="showDialog = false" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Закрыть
          </button>
        </div>
      </div>
    </main>

    <!-- Футер -->
    <footer class="mt-auto bg-gray-800 text-white py-8">
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
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
