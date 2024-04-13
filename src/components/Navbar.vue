<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/CartStore";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";

// dom ref
const navRef = ref();
const { cart } = storeToRefs(useCartStore());

// auth store ref
const authStore = useAuthStore();

onMounted(() => {
  console.log(navRef.value);
});
</script>

<template>
  <header>
    <div class="nav-container">
      <div ref="navRef" class="navbar">
        <div class="menu-container">
          <img class="vue-logo" alt="vue-logo" src="/images/logo.png" />
          <router-link to="/">Home</router-link>
          <router-link to="/board">Board</router-link>
          <router-link to="/about">About</router-link>
        </div>
        <div class="user-container">
          <router-link to="/cart" class="cart-container">
            <img
              class="cart-icon"
              alt="cart-icon"
              src="@/assets/svgs/cart.svg"
              v-if="cart.length === 0"
            />
            <v-badge color="error" :content="cart.length" v-else>
              <img class="cart-icon" alt="cart-icon" src="@/assets/svgs/cart.svg" />
            </v-badge>
          </router-link>
          <router-link to="/auth" v-if="!authStore.isLogin" class="login-container">
            <img class="login-icon" alt="login-icon" src="@/assets/svgs/login.svg" />
          </router-link>
          <img v-else class="user-icon" alt="user-icon" src="@/assets/svgs/user.svg" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-width: 100%;
}

.nav-container {
  background-color: #1a1b1e;
  width: 100%;
  height: 75px;
  max-width: 1276px;
  margin: 0 auto;
  padding: 0 22px;
}

.navbar {
  height: 100%;
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  justify-content: space-between;
  margin: 0 auto;
}

.navbar a {
  font-size: 20px;
  text-decoration: none;
}

.menu-container {
  display: flex;
  align-items: center;
  gap: 40px;
}

.vue-logo {
  width: 30px;
  height: 30px;
  transition: all 0.2s;
}

.vue-logo:hover {
  filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.2));
}

.user-container {
  display: flex;
  align-items: center;
  position: relative;
  gap: 30px;
}

.cart-container {
  display: flex;
  align-items: center;
  position: relative;
}

.login-container {
  display: flex;
  align-items: center;
  position: relative;
}
.cart-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.login-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.user-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>
