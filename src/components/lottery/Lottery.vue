<template>
  <div class="g-lottery-container">
    <div class="g-lottery">
      <div
        class="g-lottery-box1"
        :style="{ width: state.boxWidth + 'px', height: state.boxWidth + 'px' }"
      >
        <div
          class="g-lottery-box2"
          :style="{ transform: `rotate(${state.rotate}deg)` }"
        >
          <div
            v-for="item in lotteryList"
            :key="item.name"
            class="g-lottery-item"
            :style="{ width: state.itemWidth + 'px', height: state.itemWidth + 'px', ...item }"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.desc }}</span>
          </div>
          <img class="g-lottery-pan g-center" :src="circlePanBlank">
        </div>
      </div>
      <img class="g-lottery-btn g-center" :src="circleBtn" @click="handleStart">
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
import circlePanBlank from './images/circle_pan_blank.png'
import circleBtn from './images/circle_btn.png'
const state = reactive({
  boxWidth: 400,
  itemWidth: 80,
  rotate: 0,
  circleNum: 0
})
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
  //中心点横坐标
  var dotLeft = (state.boxWidth - state.itemWidth) / 2;
  //中心点纵坐标
  var dotTop = dotLeft;

  const radius = state.boxWidth / 2.5
  const num = lotteryList.length
  const avd = 360 / num
  const ahd = avd * Math.PI / 180
  for (let index = 0; index < num; index++) {
    const x = Math.cos((ahd*index)) * radius + dotLeft
    const y = Math.sin((ahd*index)) * radius + dotTop

    const rotate = avd * (index + 2)
    lotteryList[index].transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`
  }
}

function handleStart() {
  const len = lotteryList.length
  const randomIndex = Math.floor(Math.random() * len)
  state.circleNum += 6
  const rotate = state.circleNum * 360 - randomIndex * 45
  state.rotate = rotate
}
transform()
</script>

<style lang='scss' scoped>
.g-lottery {
  position: relative;
  margin: 100px auto;
  width: 400px;
  height: 400px;
  .g-lottery-box1 {
    transform: rotate(-90deg);
    transform-origin: center;
  }
  .g-lottery-box2 {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform-origin: center;
    transition: transform 0.6s;
    .g-lottery-item {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      text-align: center;
      z-index: 2;
      transform-origin: center;
      color: #EA4661;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .g-lottery-pan {
      width: 400px;
      height: 400px;
    }
  }
  .g-lottery-btn {
    width: 180px;
    cursor: pointer;
  }
}

.g-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
