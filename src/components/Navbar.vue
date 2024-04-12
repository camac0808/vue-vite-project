<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/CartStore";
import { onMounted, ref } from 'vue';

// dom ref 
const navRef = ref();
const { cart } = storeToRefs(useCartStore());

onMounted(() => {
  console.log(navRef.value)
});
</script>

<template>
  <div>
    <div ref="navRef" class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/board">Board</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/cart" class="cart-container">
        <img class="cart-icon" alt="cart icon" src="@/assets/svgs/cart.svg" v-if="cart.length === 0"/>
        <v-badge color="error" :content="cart.length" v-else>
          <img class="cart-icon" alt="cart icon" src="@/assets/svgs/cart.svg" />
        </v-badge>
      </router-link>
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
}
.cart-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>
