<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";
import { useLoadingStore } from "./stores/LoadingStore";
import { onBeforeMount, onMounted } from "vue";

const loadingStore = useLoadingStore();

onBeforeMount(() => {
  // 컴포넌트가 마운트되기 전에 로딩 시작
  loadingStore.startLoading();
});

onMounted(() => {
  // 컴포넌트가 마운트된 후에 로딩 종료
  setTimeout(() => {
    loadingStore.endLoading();
  }, 500); // 5초 후에 로딩을 종료
});
</script>

<template>
  <!-- navigation bar -->
  <Navbar />
  <!-- loading component -->
  <v-progress-circular
    indeterminate
    color="blue-lighten-3"
    model-value="20"
    :size="41"
    v-if="loadingStore.isLoading"
  ></v-progress-circular>
  <!-- main router -->
  <RouterView v-else />
</template>

<style scoped>
.v-progress-circular {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
