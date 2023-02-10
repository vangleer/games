<template>
  <div class="v-app">
    <h1>Puzzle</h1>
    <VanButton type="primary" @click="refresh">刷新</VanButton>
    <Puzzle ref="puzzleRef" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Puzzle from './components/Puzzle.vue'
const puzzleRef = ref()
function refresh() {
  puzzleRef.value!.refresh()
}
</script>
<style scoped>

</style>
