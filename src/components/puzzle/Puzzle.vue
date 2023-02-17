<template>
  <div class="g-puzzle-container">
    <div class="g-puzzle-box" :style="boxStyle">
      <div
        v-for="(item, index) in gridList"
        :key="index"
        :style="item.style"
        @click="handleGridClick(index)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VanMessage } from 'vangle';
import { computed, ref, CSSProperties } from 'vue'
import demoImg from '../../assets/demo.webp'
interface GridItem {
  style: CSSProperties,
  text: number,
  id: number,
  block: boolean
}
const props = defineProps({
  width: {
    type: Number,
    default: 500
  },
  height: {
    type: Number,
    default: 500
  },
  rows: {
    type: Number,
    default: 3
  },
  cols: {
    type: Number,
    default: 3
  },
  imgUrl: {
    type: String,
    default: demoImg
  },
  simple: {
    type: Boolean,
    default: false
  }
})

const boxStyle = computed(() => ({
  width: props.width + 2 + 'px',
  height: props.height + 2 + 'px'
}))

const gridList = ref<GridItem[]>([])

function createGrid() {
  gridList.value = []
  const gridWidth = Math.floor(props.width / props.cols)
  const gridHeight = Math.floor(props.height / props.rows)

  const allGrid = props.cols * props.rows
  // 组装数组
  for (let i = 0; i < allGrid; i++) {
    const left = (i % props.cols) * gridWidth
    const top = Math.floor(i / props.cols) * gridHeight
    const block = i === allGrid - 1
    gridList.value.push({
      style: {
        width: gridWidth + 'px',
        height: gridHeight + 'px',
        background: block ? '#fff' : `url(${props.imgUrl}) -${left}px -${top}px`,
        border: '1px solid rgb(255, 255, 255)'
      },
      text: i,
      id: i,
      block
    })
  }

  // 打乱数组
  gridList.value.sort(() => Math.random() > 0.5 ? 1 : -1)
}

function handleGridClick(index: number) {
  const blockIndex = gridList.value.findIndex(item => item.block)

  // 符合条件的交换位置
  // 根据index获取到点击框在网格中的坐标
  const aCols = index % props.cols
  const aRows = Math.floor(index / props.cols)

  // 获取空白框的坐标
  const bCols = blockIndex % props.cols
  const bRows = Math.floor(blockIndex / props.cols)
  // 如果是简易版，可以交换任意两个分块
  if (props.simple) {
    swap(index, blockIndex)
    if (check()) {
      VanMessage.success('恭喜你，完成了拼图')
    }
  } else {
    // 正常版，只能交换与空白框相邻的分块
    // 根据坐标判断是否可以交换
    if (Math.abs(aRows - bRows) >= 1 && Math.abs(aCols - bCols) >= 1) {
      return
    }
    if (Math.abs(aRows - bRows) == 1 || Math.abs(aCols - bCols) == 1) {
      swap(index, blockIndex)

      if (check()) {
        VanMessage.success('恭喜你，完成了拼图')
      }
    }
  }
}

function swap(i: number, j: number) {
  [gridList.value[j], gridList.value[i]] = [gridList.value[i], gridList.value[j]]
}

function check() {
  for (let i = 0; i < gridList.value.length; i++) {
    if (gridList.value[i].id !== i) {
      return false
    }
  }
  return true
}

createGrid()

defineExpose({
  refresh: createGrid
})
</script>

<style scoped>
div {
  box-sizing: border-box;
}
.g-puzzle-box {
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
}
</style>