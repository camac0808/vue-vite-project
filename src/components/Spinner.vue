<template>
  <div>
    <v-progress-circular
      indeterminate
      color="blue-lighten-3"
      model-value="20"
      :size="41"
    ></v-progress-circular>
  </div>
  <!-- * 안녕하세요 -->
  <!-- ! 중요해 -->
  <!-- ? 뭐지 -->
  <!-- TODO: 해야할 것 -->
</template>
<script setup></script>

<style scoped>
.v-progress-circular {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
