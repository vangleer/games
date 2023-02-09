<template>
  <h1>Puzzle</h1>
  <tass-button @click="showMsg">show Message</tass-button>
  <Puzzle />
</template>
<script setup lang="ts">
import Puzzle from './components/Puzzle.vue'
import { version, TassMessage } from 'tass-ui';
console.log(version, 'version')
function showMsg() {
  TassMessage({
    message: 'this is a message',
    type: 'info',
    center: false,
    showIcon: true
  });
}
</script>
<style scoped>

</style>
