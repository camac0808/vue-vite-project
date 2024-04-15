<template>
  <div>
    <img class="vite-logo" alt="vite-logo" src="@/assets/svgs/vite.svg" />
    <h1 class="title">Products List</h1>
  </div>
</template>

<script setup></script>

<style scoped>
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
</style>
