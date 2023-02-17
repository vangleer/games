<template>
  <h1>Lottery</h1>
  <VanButton type="primary" @click="refresh">刷新</VanButton>
  <Lottery />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Lottery from './Lottery.vue'
const puzzleRef = ref()
const simple = ref(false)
function refresh() {
  puzzleRef.value!.refresh()
}
</script>
<style scoped>

</style>
