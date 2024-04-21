import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('LoadingStore', {
  // state
  state: () => {
    return {
      isLoading: false,
    }
  },
  // actions
  actions: {
    startLoading() {
      this.isLoading = true;
    },
    endLoading() {
      this.isLoading = false;
    },
  },
  // getters
})
