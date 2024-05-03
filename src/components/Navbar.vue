<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/CartStore";
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useRoute } from "vue-router";

const sideMenuState = ref(false);

// responsive menu bar
const toggleMenu = () => {
  sideMenuState.value = !sideMenuState.value;
};

const updateSideMenuState = () => {
  if (window.innerWidth > 768) {
    sideMenuState.value = false;
  }
};

// router
const route = useRoute();
const currentPath = ref(route.path);

watchEffect(() => {
  currentPath.value = route.path;
});

const isCurrentPath = (path) => {
  return currentPath.value === path;
};

// dom ref
const navRef = ref();
const { cart } = storeToRefs(useCartStore());

// auth store ref
const authStore = useAuthStore();

onMounted(() => {
  console.log(navRef.value);
  window.addEventListener("resize", updateSideMenuState);
});

onUnmounted(() => {
  // 컴포넌트가 사라질 때 이벤트를 제거해야 메모리 누수를 방지할 수 있다.
  window.removeEventListener("resize", updateSideMenuState);
});

</script>

<template>
  <header>
    <div class="nav-container">
      <div ref="navRef" class="navbar">
        <!-- menu -->
        <!-- 반응형 navbar는 media로 관리하는게 유지보수 좋다 (v-if-else 사용 X) -->
        <div class="menu-container">
          <img class="vite-logo" alt="vite-logo" src="@/assets/svgs/vite.svg" />
          <router-link to="/" :class="{ 'current-path': isCurrentPath('/') }">Home</router-link>
          <router-link to="/board" :class="{ 'current-path': isCurrentPath('/board') }"
            >Board</router-link
          >
          <router-link to="/about" :class="{ 'current-path': isCurrentPath('/about') }"
            >About</router-link
          >
        </div>
        <div class="menu-icon-container">
          <v-icon class="menu-icon" icon="mdi-menu" @click="toggleMenu" />
        </div>
        <!-- side menu -->
        <div class="sidemenu" :class="{ active: sideMenuState }">
          <router-link to="/" :class="{ 'current-path': isCurrentPath('/') }">Home</router-link>
          <router-link to="/board" :class="{ 'current-path': isCurrentPath('/board') }"
            >Board</router-link
          >
          <router-link to="/about" :class="{ 'current-path': isCurrentPath('/about') }"
            >About</router-link
          >
        </div>

        <!-- user -->
        <div class="user-container">
          <router-link to="/cart" class="cart-container">
            <img
              class="cart-icon"
              alt="cart-icon"
              src="@/assets/svgs/cart.svg"
              v-if="cart.length === 0"
            />
            <v-badge color="error" :content="cart.length" v-else>
              <img class="cart-icon" alt="cart-icon" src="@/assets/svgs/cart.svg" />
            </v-badge>
          </router-link>
          <!-- TODO: login 처리 -->
          <router-link to="/auth" v-if="!authStore.isLogin" class="login-container">
            <img class="login-icon" alt="login-icon" src="@/assets/svgs/login.svg" />
          </router-link>
          <img v-else class="user-icon" alt="user-icon" src="@/assets/svgs/user.svg" />
          <v-icon icon="mdi-home" />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-width: 100%;
}

.nav-container {
  background-color: #1a1b1e;
  width: 100%;
  height: 75px;
  max-width: 1276px;
  margin: 0 auto;
  padding: 0 22px;
}

.navbar {
  height: 100%;
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  justify-content: space-between;
  margin: 0 auto;
}

.navbar a {
  font-size: 20px;
  text-decoration: none;
}

.current-path {
  color: var(--main-color);
}

.navbar a:hover {
  color: #ffd859;
}

.menu-container {
  display: flex;
  align-items: center;
  gap: 40px;
}

.menu-icon {
  display: none;
  cursor: pointer;
}

.vite-logo {
  width: 30px;
  height: 30px;
  transition: all 0.2s;
  margin-left: 5px;
}

.vite-logo:hover {
  filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.2));
}

.user-container {
  display: flex;
  align-items: center;
  position: relative;
  gap: 20px;
}

.cart-container {
  display: flex;
  align-items: center;
  position: relative;
}

.login-container {
  display: flex;
  align-items: center;
  position: relative;
}
.cart-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.login-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.user-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.sidemenu {
  display: none;
}

.sidemenu.active {
  transform: translateX(0);
}

/* 반응형 */
@media screen and (max-width: 768px) {
  .menu-container {
    display: none;
  }

  .menu-icon-container {
    display: flex;
    align-items: center;
  }

  .menu-icon {
    display: block;
    cursor: pointer;
    z-index: 100;
  }

  .sidemenu {
    position: fixed;
    padding-top: 75px;
    top: 0;
    left: 0;
    width: 200px;
    height: 100vh;
    background-color: #1a1b1e;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    transform: translateX(-100%);
    transition: transform 0.3s ease-out;

    a {
      padding: 20px;
      color: #fff;
      text-decoration: none;
      font-size: 20px;
    }
  }
}
</style>
