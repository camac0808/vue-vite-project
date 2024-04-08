<!-- composition API -->
<script setup>
import { ref, onMounted } from "vue";

import AlertModal from "./components/AlertModal.vue";

const modalIsOpen = ref(false);
const cartCount = ref(0);
const products = ref([
  {
    image: "product1.jpg",
    name: "Product 1",
    description: "Product 1 Description",
    inventory: 100,
  },
  {
    image: "product2.jpg",
    name: "Product 2",
    description: "Product 2 Description",
    inventory: 0,
  },
  {
    image: "product3.jpg",
    name: "Product 3",
    description: "Product 3 Description",
    inventory: 50,
  },
]);

function increaseCart() {
  cartCount.value++;
}

function openModal() {
  modalIsOpen.value = true;
}

function closeModal() {
  modalIsOpen.value = false;
}
// 생명 주기 훅
onMounted(() => {
  console.log("mounted");
});
</script>

<template>
  <div>
    <div class="navbar">
      <a>Home</a>
      <a>Products</a>
      <a>About</a>
      <div class="cart-container">
        <img class="cart-icon" alt="cart icon" src="./assets/svgs/cart.svg" />
        <span class="cart-count">{{ cartCount }}</span>
      </div>
    </div>

    <img class="vue-logo" alt="Vue logo" src="/images/logo.png" />

    <!-- modal -->
    <AlertModal v-if="modalIsOpen === true" @on-close="closeModal" />

    <!-- products -->
    <h1 class="title">Products List</h1>

    <!-- 상품 목록 -->
    <ul class="product-container">
      <li class="product" v-for="(product, i) in products" :key="i">
        <img class="product-image" :src="'/images/' + product.image" alt="product-image" />
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <span class="product-inventory" v-if="product.inventory > 0">Inventory: {{ product.inventory }}</span>
        <span class="product-inventory" v-else>Out of Stock</span>
        <div class="button-container">
          <button class="detail-btn" @click="openModal">Detail</button>
          <button class="add-cart-btn" @click="increaseCart">Add Cart</button>
        </div>
      </li>
    </ul>
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

.vue-logo {
  margin-top: 30px;
  width: 100px;
  height: 100px;
  transition: all 0.3s;
}

.vue-logo:hover {
  filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.2));
}

h1 {
  text-align: center;
  margin-top: 20px;
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

.product-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
}
.product {
  width: 300px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 0px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.product-image {
  width: 100%;
  border-radius: 10px;
}
.product-name {
  font-weight: 600;
  margin-top: 10px;
}
.button-container {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}
.detail-btn {
  padding: 5px 10px;
  background-color: transparent;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-family: JetBrains Mono;
  font-size: 13px;
  line-height: 23px;
  color: white;
  text-align: center;
  font-weight: 500;
  border: 1px solid white;
  transition: all 0.2s;
}
.detail-btn:hover {
  background-color: white;
  color: #1a1b1e;
  font-weight: 800;
}
.add-cart-btn {
  padding: 5px 10px;
  background-color: #167dff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-family: JetBrains Mono;
  font-size: 13px;
  line-height: 23px;
  color: white;
  text-align: center;
  transition: all 0.2s;
  border: 1px solid #167dff;
}
.add-cart-btn:hover {
  background-color: white;
  color: #167dff;
  font-weight: 800;
  border: 1px solid #167dff;
}
</style>
