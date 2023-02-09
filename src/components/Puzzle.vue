<template>
  <div class="v-puzzle-container">
    <VanButton type="primary" @click="createGrid">刷新</VanButton>
    <div class="v-puzzle-box" :style="boxStyle">
      <div
        v-for="(item, index) in gridList"
        :key="index"
        :style="item.style"
        @click="handleGridClick(item)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, CSSProperties } from 'vue'
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
    default: 'demo.webp'
  }
})

const boxStyle = computed(() => ({
  width: props.width + 2 + 'px',
  height: props.height + 2 + 'px'
}))

const gridList = ref<GridItem[]>([])

function createGrid() {
  gridList.value = []
  const gridWidth = props.width / props.cols
  const gridHeight = props.height / props.rows

  const allGrid = props.cols * props.rows
  // 创建一个所有数组
  const tempArr = new Array(allGrid).fill(0).map((item, index) => index)
  // 打乱数组
  tempArr.sort(() => Math.random() > 0.5 ? -1 : 1)

  for (let i = 0; i < tempArr.length; i++) {
    const index = tempArr[i]
    const left = (index % props.cols) * gridWidth
    const top = Math.floor(index / props.cols) * gridHeight

    const left2 = (i % props.cols) * gridWidth
    const top2 = Math.floor(i / props.cols) * gridHeight
    const block = index === tempArr.length - 1
    gridList.value.push({
      style: {
        width: gridWidth + 'px',
        height: gridHeight + 'px',
        position: 'absolute',
        background: block ? '#fff' : `url(${props.imgUrl}) -${left2}px -${top2}px`,
        left: left + 'px',
        top: top + 'px',
        border: '1px solid rgb(255, 255, 255)'
      },
      text: i + 1,
      id: index + 1,
      block
    })
  }
}

function handleGridClick(item: GridItem) {
  const blockItem = gridList.value.find(item => item.block)
  // if (!blockItem) return
  // if (item.id === blockItem.id) return console.log('点击了自己')
  // console.log(parseInt(blockItem.style.left), parseInt(item.style.left), parseInt(blockItem.style.width))
  // if (
  //   Math.abs(parseInt(blockItem.style.left) - parseInt(item.style.left)) <= parseInt(blockItem.style.width)
  //   &&
  //   Math.abs(parseInt(blockItem.style.top) - parseInt(item.style.top)) <= parseInt(blockItem.style.height)
  // ) {
  //   console.log('交换')
  // }

  console.log(item)
}

createGrid()
</script>

<style scoped>
.v-puzzle-box {
  position: relative;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>