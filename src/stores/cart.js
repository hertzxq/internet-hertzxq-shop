import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  actions: {
    addToCart(product) {
      const item = this.items.find(i => i.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        const safeQuantity = product.quantity && product.quantity > 0 ? product.quantity : 1;
        this.items.push({ ...product, quantity: safeQuantity });
      }
    },
    increaseQuantity(id) {
      const item = this.items.find(i => i.id === id);
      if (item) item.quantity++;
    },
    decreaseQuantity(id) {
      const item = this.items.find(i => i.id === id);
      if (item && item.quantity > 1) item.quantity--;
    },
    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id);
    },
    clearCart() {
      this.items = [];
    },
  },
});
