import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);

  // Добавление товара в корзину
  const addToCart = (product) => {
    const existingItem = items.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  };

  // Увеличение количества
  const increaseQuantity = (itemId) => {
    const item = items.value.find(item => item.id === itemId);
    if (item) item.quantity += 1;
  };

  // Уменьшение количества
  const decreaseQuantity = (itemId) => {
    const item = items.value.find(item => item.id === itemId);
    if (item && item.quantity > 1) item.quantity -= 1;
  };

  // Удаление товара
  const removeItem = (itemId) => {
    items.value = items.value.filter(item => item.id !== itemId);
  };

  // Вычисление общей стоимости
  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + item.price * item.quantity, 0);
  });

  return { items, addToCart, increaseQuantity, decreaseQuantity, removeItem, totalPrice };
});