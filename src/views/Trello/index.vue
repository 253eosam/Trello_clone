<template>
  <div class="trello">
    <h1>trello</h1>
    <div class="board-container">
      <ul class="list board-list">
        <li>
          <ul class="list task-list">
            <li>
              <div class="task-component"></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { BoardsType } from '@/model/Board'
import { UserType } from '@/model/User'
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const userModules = namespace('userModules')
const boardModules = namespace('boardModules')

@Component
export default class Trello extends Vue {
  @userModules.State('user') USER!: UserType
  @boardModules.State('boards') BOARDS!: Array<BoardsType>
  @boardModules.Getter('separateTag') SEPARETE_TAG_TO_BOARDS!: Array<BoardsType>
  @boardModules.Action('findByUid') FIND_BOARD_BY_UID!: (uid: number) => Promise<BoardsType[]>

  isShowMenuBtn = false

  created () {
    this.init()
  }

  async init () {
    await this.FIND_BOARD_BY_UID(this.USER.id)
    console.log(
      this.BOARDS
    )
  }

  onClickBoard (board: BoardsType) {
    this.$router.push({ name: 'Board', params: { bid: String(board.id) } })
  }
}
</script>

<style lang="scss" scoped>
.trello {
  width: 100%;
  height: 100%;
  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 50px;
    line-height: 117px;
    letter-spacing: 0.2em;
    color: #FFFFFF;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    text-align: center;
  }
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.board-list {

  width: 100%;
  >li {
    background: red;
    margin-left: 10px;
    float: left;
    &::after {
      clear: both;
    }
  }
}
.task-list {
  >li {
    margin-bottom: 5px;
    &:last-child{
      margin-bottom: 0;
    }
  }
}

.task-component {
  width: 200px;
  height: 80px;
  border-radius: 20px;
  background: rgb(234, 230, 29);
  margin: 3px;
}
</style>
