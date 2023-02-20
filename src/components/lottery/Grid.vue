<template>
  <div class="g-grid-container">
    <div class="g-grid-box">
      <div class="g-grid">
        <div v-for="(item, index) in data" :key="index" :style="getStyle(index)" class="g-grid-item">
        </div>
        <img class="g-grid-bg" :src="bgUrl" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { PropType } from 'vue'
import bgUrl from '@/components/lottery/images/con_rect.png'
interface Item  {
  name?: string
  desc?: string
}
const props = defineProps({
  data: {
    type: Array as PropType<Item[]>,
    default: () => [
      { name: 'IPhone14', desc: '手机' },
      { name: '100元', desc: '话费' },
      { name: '再来一次', desc: '鼓励奖' },
      { name: '10元', desc: '话费' },
      { name: '5元', desc: '话费' },
      { name: '20元', desc: '话费' },
      { name: '笑脸', desc: '谢谢参与' },
      { name: 'IPad Air', desc: '平板' }
    ]
  },
  boxWidth: {
    type: Number,
    default: 400
  },
  itemWidth: {
    type: Number,
    default: 80
  }
})
const width = 116
const height = 99
const top = 23
const left = 22
const gapX = 4
const gapY = 5
function getStyle(index: number) {
  if (index >= 4) index += 1
  const row = Math.floor(index / 3)
  const col = index % 3

  const x = col * width + left + gapX * col
  const y = row * height + top + gapY * row
  return { top: y + 'px', left: x + 'px' }
}
</script>

<style lang='scss' scoped>
.g-grid-container {
  .g-grid {
    margin: 100px auto;
    position: relative;
    .g-grid-item {
      position: absolute;
      top: 23px;
      left: 22px;
      width: 116px;
      height: 99px;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 6px;
    }
    .g-grid-bg {
      width: 400px;
    }
  }
}
</style>
