<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";

import AlertModal from "@/components/AlertModal.vue";

const productStore = useProductStore();
// data fill
productStore.fill();

const { products } = storeToRefs(useProductStore());
const { cart } = storeToRefs(useCartStore());

const modalIsOpen = ref(false);

function increaseCart(id) {
  cart.value.push(id);
}

function openModal() {
  modalIsOpen.value = true;
}

function closeModal() {
  modalIsOpen.value = false;
}

function updateImage(image, index) {
  products.value[index].image = image;
}

// 생명 주기 훅
onMounted(() => {
  console.log("mounted");
});
</script>

<template>
  <section class="container">
    <img class="vite-logo" alt="vite-logo" src="@/assets/svgs/vite.svg" />
    <!-- modal -->
    <AlertModal v-if="modalIsOpen === true" @on-close="closeModal" />

    <!-- products -->
    <h1 class="title">Products List</h1>

    <!-- 상품 목록 -->
    <ul class="product-container">
      <li class="product" v-for="(product, index) in products" :key="index">
        <img class="product-image" :src="'/images/' + product.image" alt="product-image" />
        <div class="product-name-container">
          <p class="product-name">{{ product.name }}</p>
          <span
            class="color-circle"
            v-for="(variant, i) in product.variants"
            :key="i"
            :style="{ backgroundColor: variant.color }"
            @mouseover="updateImage(variant.image, index)"
          ></span>
        </div>
        <p class="product-description">{{ product.description }}</p>
        <span class="product-inventory" v-if="product.inventory > 0"
          >Inventory: {{ product.inventory }}</span
        >
        <span class="product-inventory" v-else>Out of Stock</span>
        <div class="button-container">
          <button class="detail-btn" @click="openModal">Detail</button>
          <button
            class="add-cart-btn"
            :disabled="product.inventory === 0"
            @click="increaseCart(index)"
          >
            Add Cart
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}

.vite-logo {
  margin-top: 20px;
  width: 100px;
  height: 100px;
  transition: all 0.3s;
}

.vite-logo:hover {
  filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.2));
}

h1 {
  text-align: center;
  margin-top: 20px;
}

.product-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, auto));
	grid-auto-flow: dense;
  justify-items: center;
  align-items: flex-start;
  gap: 30px;
  margin-top: 40px;
}

.product {
  max-width: 400px;
  min-height: 250px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 0px rgba(131, 54, 54, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.product-image {
  width: 100%;
  border-radius: 10px;
}

.product-name-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin-top: 10px;
}

.product-name {
  font-size: 24px;
  font-weight: 600;
  margin-right: 20px;
}

.color-circle {
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 7px;
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

.add-cart-btn:hover:not([disabled]) {
  background-color: white;
  color: #167dff;
  font-weight: 800;
  border: 1px solid #167dff;
}

button:disabled {
  background-color: #b3b3b3;
  border: 1px solid #b3b3b3;
  color: #666666;
  cursor: not-allowed;
}

/* 반응형 */
@media screen and (max-width: 1024px) {
  .product-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .product-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
