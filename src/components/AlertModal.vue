<template>
  <div class="modal-container">
    <div class="modal">
      <h2>Product Detail</h2>
      <p>Product Description</p>
      <button @click="$emit('onClose')">Close</button>
    </div>
  </div>
</template>

<script setup></script>

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
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
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
