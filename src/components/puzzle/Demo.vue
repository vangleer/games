<template>
  <h1>Puzzle</h1>
  <VanButton type="primary" @click="refresh">刷新</VanButton>
  <VanButton type="primary" @click="simple = !simple">{{ simple ? '简易版' : '正常版' }}</VanButton>
  <Puzzle ref="puzzleRef" :simple="simple" :rows="2" :cols="2" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Puzzle from './Puzzle.vue'
const puzzleRef = ref()
const simple = ref(false)
function refresh() {
  puzzleRef.value!.refresh()
}
</script>
<style scoped>

</style>
