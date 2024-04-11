<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/CartStore";

const { cart } = storeToRefs(useCartStore());
</script>

<template>
  <div>
    <div class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
      <router-link to="/board">Board</router-link>
      <router-link to="/about">About</router-link>
      <div class="cart-container">
        <img class="cart-icon" alt="cart icon" src="@/assets/svgs/cart.svg" />
        <span class="cart-count">{{ cart.length }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  background-color: #1a1b1e;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
  gap: 30px;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.navbar a {
  font-size: 20px;
  text-decoration: none;
}
.cart-container {
  display: flex;
  align-items: center;
  position: relative;
  gap: 5px;
}
.cart-icon {
  width: 22px;
  height: 25px;
  cursor: pointer;
}
.cart-count {
  padding-top: 2px;
  line-height: 25px;
}
</style>
