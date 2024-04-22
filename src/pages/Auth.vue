<template>
  <section>
    <h1>Auth</h1>
    <!-- vuetify 문법 -->
    <div class="d-flex flex-column ga-2">
      <button @click="signInWithGithub">Github Login</button>
      <button @click="signInWithGoogle">Google Login</button>
      <button @click="logOut" v-if="isLogged">Logout</button>
      <button @click="logIn" v-else>Login</button>
      <form @submit.prevent="signUp" class="">
        <input type="text" placeholder="email" v-model="email" />
        <input type="password" placeholder="password" v-model="password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { supabase } from "@/lib/supabaseClient";
import { onMounted, ref } from "vue";

const email = ref("");
const password = ref("");
const session = ref(null);
const isLogged = ref(false);

// get User using session

async function getUser() {
  await supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  if (session.value) {
    isLogged.value = true;
  }

  console.log("User data:", session.value);
}

// login
async function logIn() {
  if (!email.value || !password.value) {
    return console.error("Email or password cannot be empty");
  }

  let { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) throw new Error(error.message);

  isLogged.value = true;

  console.log("Login data:", data);
}

// signUp
async function signUp() {
  if (!email || !password) {
    return console.error("Email or password cannot be empty");
  }

  let { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    return console.error("Sign up error:", error.message);
  }
  console.log("Sign up data:", data);
}

// logout
async function logOut() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    return console.error("Sign out error:", error.message);
  }
  isLogged.value = false;
  console.log("Signed out");
}

// third party login Github
async function signInWithGithub() {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:5173/auth",
    },
  });
  if (error) {
    return console.error("OAuth error:", error.message);
  }
  console.log("OAuth data:", data);
}

// third party login Google
async function signInWithGoogle() {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173/auth",
    },
  });
  if (error) {
    return console.error("OAuth error:", error.message);
  }
  console.log("OAuth data:", data);
}

onMounted(() => {
  getUser();
});
</script>

<style scoped></style>
