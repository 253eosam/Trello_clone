<template>
  <section class="test">
    <h1>연구실</h1>
    <hr/>
    <div class="test__body">
      <div id="space1"
           @drop="onDrop"
           @dragover="onDragOver" class="space">
        <div
          class="block"
          v-for="(color, idx) in colors"
          :key="idx"
          :id="idx"
          draggable
          :data-tempId="idx"
          @dragstart="onDragStart"
          :style="`background: ${color};`"
        >
          <p draggable
             @dragstart="onDragStartEl">테스트 </p>
        </div>
      </div>
      <div
        id="space2"
        @drop="onDrop"
        @dragover="onDragOver"
        style="background: slategrey;"
        class="space"
      ></div>
    </div>
    <hr/>
    <div class="image-map">
      <img
        src="http://homejjang.cdn1.cafe24.com/imgmap.gif"
        alt=""
        usemap="#001"
        border="0"
      />
      <map name="001">
        <area
          shape="rect"
          coords="42,41,154,66"
          href="https://www.naver.com"
          target="_blank"
        />
        <area
          shape="rect"
          coords="42,76,152,100"
          href="https://www.daum.net"
          target="_blank"
        />
        <area
          shape="rect"
          coords="40,113,150,138"
          href="https://www.google.com"
          target="_blank"
        />
      </map>
    </div>
    <hr/>
    <div class="box-model">
      <div class="box1"/>
      <div class="box1">
        <div class="box2"></div>
      </div>
    </div>
    <hr/>
    <div style="height: 300px; width: 200px;">
      <img
        src="https://images.unsplash.com/photo-1597614456709-fda746f1a2d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt="대머리"
        width="200"
        height="300"
      />
      <div style="height: 150px; width:200px; background: white;"></div>
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
      const getDatasetTempId = event.target.dataset.tempid
      event.dataTransfer.setData('text', getDatasetTempId)
    },
    onDragStartEl (event) {
      console.log('start')
      console.log(event)
      // Add this element's id to the drag payload so the drop handler will
      // know which element to add to its tree
      const getDatasetTempId = event.target.dataset.pid
      console.log(getDatasetTempId)
      event.dataTransfer.setData('text', getDatasetTempId)
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
      console.log(data)
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
    text-align: initial;
    height: 250px;

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

  .image-map {
    background: red;
    width: 100px;
    min-height: 50px;
    max-height: 150px;
    border-style: solid;
    border-width: 5px;
    border-color: blue;
    padding: 10px;
    margin: 10px;

    p {
      display: inline;
      color: deepskyblue;
      background: yellow;
    }
  }

  .box-model {
    box-sizing: content-box;
    // content
    width: 300px;
    height: 100px;
    background: red;
    // border
    border-color: blue;
    border-width: 5px;
    border-style: solid;

    .box1 {
      display: inline-block;
      width: 100px;
      height: 80px;
      border: 10px solid green;
      background: aqua;
    }

    .box2 {
      width: 50px;
      height: 50px;
      border: 5px solid greenyellow;
      background: violet;
    }
  }
</style>
