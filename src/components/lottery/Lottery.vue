<template>
  <div class="g-lottery-container">
    <div class="g-lottery-box">
      <div v-for="item in lotteryList" :key="item.name" class="g-lottery-item" :style="item">{{ 1 }}</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
const lotteryList: any = reactive([
  { name: 'IPhone14', desc: '手机' },
  { name: '100元', desc: '话费' },
  { name: '再来一次', desc: '鼓励奖' },
  { name: '10元', desc: '话费' },
  { name: '5元', desc: '话费' },
  { name: '20元', desc: '话费' },
  { name: '笑脸', desc: '谢谢参与' },
  { name: 'IPad Air', desc: '平板' }
])

function transform() {
  const radius = 200
  const num = lotteryList.length
  const avd = 360 / num
  const ahd = avd * Math.PI / 180
  for (let index = 0; index < num; index++) {

    const x = Math.cos((ahd*index)) * radius + 185
    const y = Math.sin((ahd*index)) * radius + 185

    lotteryList[index].transform = `translate(${x}px, ${y}px)`
  }
}

transform()
</script>

<style lang='scss' scoped>
.g-lottery-box {
  position: relative;
  margin: 100px auto;
  width: 400px;
  height: 400px;
  border: 1px solid red;
  border-radius: 50%;
  .g-lottery-item {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    background-color: greenyellow;
  }
}
</style>
