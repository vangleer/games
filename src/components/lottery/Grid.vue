<template>
  <div class="g-grid-container">
    <div class="g-grid-box">
      <div class="g-grid"
        :style="boxStyle"
      >
        <div v-for="(item, index) in list" :key="index" :style="item" :class="['g-grid-item', active === index ? 'active' : '']">
          <span>{{ item.desc }}</span>
          <span>{{ item.name }}</span>
        </div>

        <div class="g-grid-item" :style="getStyle(1, 1)" @click="handleStart">开始</div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { VanMessage } from 'vangle'
import { computed, PropType, ref } from 'vue'
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
  itemWidth: {
    type: Number,
    default: 80
  },
  itemHeight: {
    type: Number,
    default: 80
  },
  gap: {
    type: Number,
    default: 4
  }
})
const active = ref(0)
const start = ref(false)
const list = computed(() => {
  let min = 0, max = 2

  let row = 0, col = 0, index = 0, arr = []
  while(index < props.data.length) {
    arr.push({ ...props.data[index], ...getStyle(row, col) })
    if (col < max && row === min) {
      col++
    } else if (col === max && row < max) {
      row++
    } else if (row === max && col > min) {
      col--
    } else if (col === min && row > min) {
      row--
    }
    if (col === min && row === min) {
      break;
    }
    index++
  }
  return arr
})

const boxStyle = computed(() => ({ width: props.itemWidth * 3 + props.gap * 2 + 'px', height: props.itemWidth * 3 + props.gap * 2 + 'px' }))

function getStyle(row: number, col: number) {
  const width = props.itemWidth
  const height = props.itemHeight
  const gap = 4
  const x = col * width + gap * col
  const y = row * height  + gap * row
  return { top: y + 'px', left: x + 'px', width: width + 'px', height: height + 'px' }
}

function handleStart() {
  if (start.value) return
  start.value = true
  const minNum = props.data.length * 3
  let num = Math.floor(Math.random() * minNum) + minNum
  let n = 0
  let timerId = setInterval(() => {
    active.value++
    n++
    if (active.value >= list.value.length) {
      active.value = 0
    }
    if (n > num) {
      clearInterval(timerId)
      start.value = false
      notify()
    }
  }, 30)
}

function notify() {
  const item = props.data[active.value]
  VanMessage({
    type: 'success',
    message: `恭喜您获得 <span style="color: #EA4661;">${item.desc} ${item.name}</span>, 赶紧领回家吧!!!😀`,
    dangerouslyUseHTMLString: true
  })
}
</script>

<style lang='scss' scoped>
.g-grid-container {
  .g-grid {
    margin: 100px auto;
    position: relative;
    // border: 5px solid #fc4a59;
    .g-grid-item {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #FDFAD8;
      box-shadow: 0px 1px 3px 0px #F6CA6B;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      color: #F03A1C;
      &.active {
        background-color: #F6CA6B;
      }
      &:last-child {
        cursor: pointer;
        background: linear-gradient(0deg, #E23E3E 0%, #FE7D7D 99%);
        color: #fff;
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
}
</style>
