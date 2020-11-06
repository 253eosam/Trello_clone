<template>
  <div class="board-tag-container">
      <div class="board-tag-content">
        <input :value="tag" class="tag__input" disabled type="text" />
        <font-awesome-icon icon="arrow-down" />
        <input @keypress.enter="onClickUpdateBoardTag" v-model.trim="newTag" class="tag__input" type="text" />
      </div>
      <div class="board-tag-footer">
        <button @click="onClickUpdateBoardTag" type="button" class="btn update-btn">update</button>
      </div>
  </div>
</template>

<script lang="ts">
import { BoardType, Board } from '@/model/Board'
import { Vue, Prop, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

@Component
export default class BoardTagPopup extends Vue {
  @Prop({ type: String, required: true }) tag!: string
  @Prop({ type: Number, required: true }) id!: number

  @namespace('trelloModules').Action('updateBoard') UPDATE_BOARD_DATA!: (board: BoardType) => Promise<void>
  newTag = this.tag

  async onClickUpdateBoardTag () {
    this.UPDATE_BOARD_DATA(new Board({ id: this.id, tag: this.newTag }))
  }
}
</script>

<style lang="scss" scoped>
.board-tag-container {
  margin: 10px 5px 5px;
  .board-tag-content {
    display: flex;
    flex-direction: column;
    height: 80px;
    justify-content: space-around;
    align-items: center;
    input {
      width: 80%;
    }
  }
  .btn {
    margin-right: 3px;
    color: white;
    border: 0;
  }
  .update-btn {
    background: blue;
  }
  .board-tag-footer {
    margin: 5px 0 ;
    text-align: right;
  }
}
</style>
