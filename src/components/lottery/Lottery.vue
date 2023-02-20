<template>
  <div class="g-lottery-container">
    <div class="g-lottery" :style="{ width: boxWidth + 'px', height: boxWidth + 'px' }">
      <div
        class="g-lottery-box1"
        :style="{ width: boxWidth + 'px', height: boxWidth + 'px' }"
      >
        <div
          class="g-lottery-box2"
          :style="{ transform: `rotate(${rotate}deg)` }"
          @transitionend="handleTransitionend"
        >
          <div
            v-for="(item, index) in data"
            :key="item.name"
            class="g-lottery-item"
            :style="{ width: itemWidth + 'px', height: itemWidth + 'px', ...transform(index) }"
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
import { PropType, ref } from 'vue'
import circlePanBlank from './images/circle_pan_blank.png'
import circleBtn from './images/circle_btn.png'
import { VanMessage } from 'vangle';
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



const rotate = ref(0)
const circleNum = ref(0)
const active = ref(0)

function transform(index: number) {
  //中心点横坐标
  const dotLeft = (props.boxWidth - props.itemWidth) / 2;
  //中心点纵坐标
  const dotTop = dotLeft;

  const radius = props.boxWidth / 2.5
  const num = props.data.length
  const avd = 360 / num
  const ahd = avd * Math.PI / 180

  const x = Math.cos((ahd*index)) * radius + dotLeft
  const y = Math.sin((ahd*index)) * radius + dotTop
  const rotate = avd * (index + 2)
  return {
    transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`
  }
}

function handleStart() {
  const len = props.data.length
  const randomIndex = Math.floor(Math.random() * len)
  circleNum.value += 6
  const rotateNum = circleNum.value * 360 - randomIndex * 45
  rotate.value = rotateNum

  active.value = randomIndex
}

const handleTransitionend = () => {
  const item = props.data[active.value]

  VanMessage({
    type: 'success',
    message: `恭喜您获得 <span style="color: #EA4661;">${item.desc} ${item.name}</span>, 赶紧领回家吧!!!😀`,
    dangerouslyUseHTMLString: true
  })
}
</script>

<style lang='scss' scoped>
.g-lottery {
  position: relative;
  border: 12px solid #ff733e;
  border-radius: 50%;
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
