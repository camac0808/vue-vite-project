<template>
  <section>
    <h1>Board</h1>
    <Spinner v-if="isLoading" />
    <ul class="container" v-else>
      <li class="board-item" v-for="(item, index) in supabaseData" :key="index">
        <div class="board-content">
          <h2>{{ item.title }}</h2>
          <p>{{ item.body }}</p>
        </div>
        <div class="d-flex ga-3">
          <button id="edit-btn" @click="editBoardData(item.id)">Edit</button>
          <button id="delete-btn" @click="deleteBoardData(item.id)">Delete</button>
        </div>
      </li>
    </ul>
    <button
      type="button"
      value="create"
      id="create-btn"
      class="btn btn-light"
      @click="insertBoardData"
    >
      Create
    </button>
    <div class="h-10 w-16 md:w-32 lg:w-48 border-2"></div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "@/lib/supabaseClient";
import Spinner from "@/components/Spinner.vue";

const supabaseData = ref([]);

const isLoading = ref(true);

async function getBoardData() {
  try {
    // table 'page'에서 모든 column을 가져옴
    let { data: page, error } = await supabase
      .from("page")
      .select("*")
      .order("id", { ascending: true });
    if (error) throw error;
    console.log(page);
    supabaseData.value = page;
  } catch (err) {
    console.error(err);
    supabaseData.value = [];
  } finally {
    isLoading.value = false;
  }
}

async function insertBoardData() {
  try {
    let title = prompt("title?");
    let body = prompt("body?");

    if (!title || !body) throw new Error("title and body are required");

    // table 'page'에 데이터 추가
    let { error } = await supabase.from("page").insert([{ title, body }]);

    if (error) throw error;

    getBoardData();
  } catch (err) {
    console.error(err);
  }
}

async function deleteBoardData(id) {
  try {
    let confirmed = confirm("글을 삭제하시겠습니까?");

    if (confirmed) {
      let { error } = await supabase.from("page").delete().eq("id", id);
      if (error) throw error;
      // Delete successful, refresh data
      getBoardData();
    }
  } catch (err) {
    console.error(err);
  }
}

async function editBoardData(id) {
  try {
    let title = prompt("title?");
    let body = prompt("body?");

    if (!title || !body) throw new Error("title and body are required");

    let { error } = await supabase.from("page").update({ title, body }).eq("id", id);
    if (error) throw error;

    getBoardData();
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  getBoardData();
});
</script>

<style scoped>
.box {
  border: 1px solid #ccc;
}

h1 {
  margin-bottom: 30px;
}

#create-btn {
  margin: 10px;
}

#delete-btn {
  width: 80px;
  height: 50px;
  cursor: pointer;
}

.board-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
