import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "@formkit/themes/genesis";

import App from "./App.vue";
import Home from "@/pages/Home.vue";
import Auth from "@/pages/Auth.vue";
import About from "@/pages/About.vue";
import Board from "@/pages/Board.vue";
import Cart from "@/pages/Cart.vue";

import { plugin, defaultConfig } from "@formkit/vue";

import "./style.css";

const config = defaultConfig({
  theme: "genesis",
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
});

const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/auth", name: "Auth", component: Auth },
    { path: "/about", name: "About", component: About },
    { path: "/board", name: "Board", component: Board },
    { path: "/cart", name: "Cart", component: Cart },
  ],
});

createApp(App).use(router).use(pinia).use(vuetify).use(plugin, config).mount("#app");
