<script setup>
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/CartStore";
import { useFetch } from "@vueuse/core";
import Maintitle from "@/components/Maintitle.vue";
import AlertModal from "@/components/AlertModal.vue";
import { useProductStore } from "@/stores/ProductStore";

const modalIsOpen = ref(false);
const selectedIndex = ref(0);
const id = ref("");

// products.json using product store
const productStore = useProductStore();
productStore.fill();
const { products } = storeToRefs(useProductStore());

// fetch product data using VueUse
// computed url을 써서 id가 바뀔 때마다 url이 바뀌도록 설정
const url = computed(() => `https://fakestoreapi.com/products/${id.value}`);

// refetch: true로 설정하면 url이 바뀔 때마다 fetch를 다시 요청
const { isFetching, data, error } = useFetch(url, {
  refetch: true,
})
  .get()
  .json();

const { cart } = storeToRefs(useCartStore());

function increaseCart(id) {
  cart.value.push(id);
}

function openModal(index) {
  modalIsOpen.value = true;
  selectedIndex.value = index;
}

function closeModal() {
  modalIsOpen.value = false;
}

function updateImage(image, index) {
  products.value[index].image = image;
}
</script>

<template>
  <section>
    <Maintitle />
    <!-- modal -->
    <AlertModal v-if="modalIsOpen === true" @on-close="closeModal" :index="selectedIndex" />

    <!-- error and loading -->
    <div v-if="error" class="error" style="color: red; margin-top: 20px">{{ error }}</div>
    <v-progress-circular
      indeterminate
      color="blue-lighten-3"
      model-value="20"
      :size="41"
      v-else-if="isFetching"
    ></v-progress-circular>

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
          <button class="detail-btn" @click="openModal(index)">Detail</button>
          <button
            class="add-cart-btn"
            :disabled="product.inventory === 0"
            @click="increaseCart(index)"
          >
            Add Cart
          </button>
        </div>
      </li>
      <!-- 상품 output: id, title, price, category, description, image -->
      <li class="product" v-for="(item, index) in data" :key="index">
        <img class="product-image" :src="item.image" alt="product-image" />
        <div class="product-content">
          <div class="name-container">
            <p>{{ item.title }}</p>
            <p>Price: {{ item.price }}</p>
          </div>
          <div class="button-container">
            <button class="detail-btn" @click="openModal(index)">Detail</button>
            <button class="add-cart-btn" @click="increaseCart(item.id)">Add Cart</button>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.v-progress-circular {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.product-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, auto));
  grid-auto-flow: dense;
  justify-items: center;
  align-items: start;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
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

.name-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.product-name {
  font-size: 20px;
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
