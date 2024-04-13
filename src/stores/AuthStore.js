import { defineStore } from 'pinia'

export const useAuthStore = defineStore('AuthStore', {
  state() {
    return {
      isLogin: false,
    }
  },
  actions: {
    // Define your actions here
  },
  getters: {
    // Define your getters here
  }
})
