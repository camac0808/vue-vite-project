<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";
import { useLoadingStore } from "./stores/LoadingStore";
import { onBeforeMount, onMounted } from "vue";
import Spinner from './components/Spinner.vue';

const loadingStore = useLoadingStore();

onBeforeMount(() => {
  // 컴포넌트가 마운트되기 전에 로딩 시작
  loadingStore.startLoading();
});

onMounted(() => {
  // 컴포넌트가 마운트된 후에 로딩 종료
  loadingStore.endLoading();
});
</script>

<template>
  <!-- navigation bar -->
  <Navbar />
  <!-- loading component -->
  <Spinner v-if="loadingStore.isLoading" />
  <!-- main router -->
  <RouterView v-else />
</template>

<style scoped></style>
