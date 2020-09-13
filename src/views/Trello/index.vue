<template>
  <div class="trello">
    <h1>trello</h1>
    <div class="board-wrap">
      <div class="board-utils">
        <h2>{{ USER.name }}</h2>
        <button @click="isShowMenuBtn = !isShowMenuBtn" class="menu__btn" type="menu">{{ isShowMenuBtn ? '닫기' : '열기' }}
        </button>
        <span class="menu__btn-wrap" :class="{'blind' : !isShowMenuBtn}">
          <button type="button"><span class="blind">보드</span>추가</button>
          <button type="button"><span class="blind">보드</span>삭제</button>
        </span>
      </div>
      <ul class="board-list">
        <li class="board-item" v-for="board in BOARDS" :key="board.id">
          <div class="board-box" @click="onClickBoard(board)">
            <p>{{ board.name }}</p>
          </div>
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
.board-wrap {
  background: #ddd;
  padding: 5px;
  .board-utils {
    h2 {
      float: left;
    }
    .menu__btn {
      float: right;
    }
    .menu__btn-wrap {
      float: right;
    }
    &::after{
      content: '';
      display: block;
      clear: both;
    }
  }
  .board-list {
    .board-item {
      display: inline-block;
      margin: 5px;
    }
  }
}
.board-box {
  background: #D32F4C;
  border-radius: 20px;
  width: 120px;
  height: 70px;
  display: flex;
  cursor: pointer;
  p {
    margin: auto;
    color: white;
  }
}
</style>
