<template>
  <div class="modal-container">
    <div class="modal">
      <h2>{{ products[props.index].name }}</h2>
      <p>{{ products[props.index].description }}</p>
      <p>{{ products[props.index].inventory }}</p>
      <button @click="$emit('onClose')">Close</button>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/ProductStore';
import { storeToRefs } from 'pinia';

const props = defineProps({
  index: Number
});

const productStore = useProductStore();
productStore.fill();
const { products } = storeToRefs(useProductStore());



// // 데이터를 가져오는 비동기 함수 예시
// const fetchData = async () => {
//   // index를 사용하여 데이터를 가져옴
//   const response = await fetch(`/api/data/${props.index}`);
//   const result = await response.json();
//   data.value = result;
// };
</script>

<style>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  width: 300px;
  height: 200px;
  background: white;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.modal h2 {
  color: #333;
  margin: 0;
}
.modal p {
  color: #333;
  margin: 0;
}
button {
  padding: 5px 10px;
  background-color: transparent;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-family: JetBrains Mono;
  font-size: 13px;
  line-height: 23px;
  color: black;
  text-align: center;
  font-weight: 600;
  border: 2px solid black;
}
</style>
