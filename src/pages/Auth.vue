<template>
  <section>
    <div class="">
      <h1 class="mb-5">Auth</h1>
      <!-- vuetify 문법 -->
      <div class="d-flex flex-column ga-2">
        <button class="github-btn" @click="signInWithGithub"><v-icon icon="mdi-github" />Github Login</button>
        <button class="google-btn" @click="signInWithGoogle"><v-icon icon="mdi-google" />Google Login</button>
        <button @click="logOut" v-if="isLogged">Logout</button>
        <button @click="logIn" v-else>Login</button>
        <FormKit
          id="form"
          type="form"
          :classes="{
            form: 'bg-gray-800 p-[20px] rounded-lg',
          }"
        >
          <FormKit
            type="text"
            name="email"
            label="Email"
            id="email"
            validation="required|email"
            maxlength="25"
            placeholder="email"
            :classes="{
              input: 'text-white p-[12px]',
              label: 'text-gray-500 text-left',
              message: 'text-left',
            }"
          />
          <FormKit
            type="password"
            name="password"
            label="Password"
            id="password"
            maxlength="20"
            validation="required|contains_alpha|contains_numeric|?length:8"
            placeholder="password"
            :classes="{
              input: 'text-white',
              label: 'text-gray-500 text-left',
              message: 'text-left',
            }"
          />
          <FormKit
            type="password"
            name="password_confirm"
            label="Confirm password"
            placeholder="Confirm password"
            validation="required|confirm"
            :classes="{
              input: 'text-white',
              label: 'text-gray-500 text-left',
              message: 'text-left',
            }"
          />
        </FormKit>
      </div>
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
    session.value = data.session;
  });

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

<style scoped>
.github-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
</style>
