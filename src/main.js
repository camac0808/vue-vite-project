import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from 'pinia';
import "./style.css";
import App from "./App.vue";
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Board from "@/pages/Board.vue";
import Products from "@/pages/Products.vue";

const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/about", name: "About", component: About },
    { path: "/board", name: "Board", component: Board },
    { path: "/products", name: "Products", component: Products },
  ],
});

createApp(App).use(router).use(pinia).mount("#app");
