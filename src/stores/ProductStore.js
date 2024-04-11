import { defineStore } from "pinia";

export const useProductStore = defineStore("ProductStore", {
  // state
  state: () => {
    return {
      products: [],
    };
  },
  // actions
  actions: {
    async fill() {
      this.products = await import("@/data/products.json").then((m) => m.default);
      // this.products = await fetch('some/endpoint').then((res) => res.json());
    }

  }
  // getters
});
