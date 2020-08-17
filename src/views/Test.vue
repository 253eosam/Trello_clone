<template>
  <section class="test">
    <h1>연구실</h1>
    <hr />
    <div class="test__body">
      <div id="space1" class="space" @drop="onDrop" @dragover="onDragOver">
        <div
          class="block"
          v-for="(color, idx) in colors"
          :key="idx"
          :id="idx"
          draggable
          @dragstart="onDragStart"
          :style="`background: ${color};`"
        ></div>
      </div>
      <div id="space2" @drop="onDrop" @dragover="onDragOver" style="background: slategrey;" class="space"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      colors: ['red', 'blue', 'green']
    }
  },
  methods: {
    onDragStart (event) {
      console.log('start')
      console.log(event)
      // Add this element's id to the drag payload so the drop handler will
      // know which element to add to its tree
      event.dataTransfer.setData('text', event.target.id)
      event.dataTransfer.effectAllowed = 'move'
    },
    onDragEnd (event) {
      console.log('end')
      console.log(event)
    },
    onDragOver (event) {
      console.log('over')
      console.log(event)
      event.preventDefault()
      // Set the dropEffect to move
      event.dataTransfer.dropEffect = 'move'
    },
    onDragEnter (event) {
      console.log('enter')
      console.log(event)
    },
    onDrag (event) {
      console.log('drag')
      console.log(event)
    },
    onDrop (event) {
      console.log('drop')
      console.log(event)
      event.preventDefault()
      // Get the id of the target and add the moved element to the target's DOM
      const data = event.dataTransfer.getData('text')
      event.target.appendChild(document.getElementById(data))
    }
  }
}
</script>

<!--
  대상-요소__상태
  대상의 요소나 부분을 의미할 때 언더스코어 두개(__)
  대상이나 요소의 상태나 속성을 의미할 때 하이픈 두 개(--)로 연결
  .form {}
  .form__button {}
  .form__button--disabled {}
-->
<style lang="scss" scoped>
.test {
  height: 860px;
  .test__body {
    padding: 0.01em 16px;
    width: 100%;
    height: 100%;
    display: flex;
    .space {
      width: 50%;
    }
    .block {
      margin: 10px;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
