---
title: 拼图游戏
lang: zh-CN
---

# 拼图游戏

## 基本使用

```html
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

```

## 属性

| Attribute    | Description   | Type   | Default   |
| ------------ | ------------- | ------ | --------- |
| width        | 容器宽度       | number | 500       |
| height       | 容器高度       | number | 500       |
| rows        | 行数       | number | 3       |
| cols        | 列数       | number | 3       |
| imgUrl        | 图片路径       | string | —       |