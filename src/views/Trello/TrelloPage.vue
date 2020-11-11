<template>
  <div class="trello">
    <h1>trello</h1>
    <div class="board-container">
      <ul class="list board-list">
        <li v-for="(board, bIdx) in BOARDS_INFO" :key="bIdx">
          <strong @click="onClickUpdateBoardTagName(board)" class="tag-name">{{board.tag}}</strong>
          <ul
          id="task-list"
          class="list task-list"
          @dragover.prevent
          @drop="onDropToList($event, board)"
          >
            <li
              v-for="(task, tIdx) in board.tasks" :key="`${board.id}-${tIdx}`"
              draggable
              @dragstart="onDragStart"
              @dragover.prevent
              @drop.stop="onDropItem($event, tIdx, board.tasks)"
              :data-tid="task.id"
            >
            <task-card
              @click.native="onClickTaskCard(task)"
              :title="task.title"
              :content="task.content"
            />
            </li>
          </ul>
          <button @click="onClickAddTask(board)" type="button" class="btn add-task-btn">
            {{ board.tasks.length ? '+ Add another card' : '+ Add a card'}}
          </button>
          <button @click="onClickDeleteBoard(board)" type="button" class="btn delete-board-btn">-</button>
        </li>
          <button @click="onClickAddBoard" type="button" class="btn add-board-btn">
          {{BOARDS_INFO.length ? '+ Add another list' : '+ Add a list'}}
          </button>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { BoardType } from '@/model/Board'
import { TaskType, Task } from '@/model/Task'
import { UserType } from '@/model/User'
import { Component, Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import taskCard from '@/components/Trello/TaskCard.vue'
import EventBus from '@/utils/EventBus'
import DetailTaskPopup from '@/components/Trello/DetailTaskPopup.vue'
import BoardTagPopup from '@/components/Trello/BoardTagPopup.vue'
import BoardHandler from '@/mixins/BoardHandler'
import draggable from 'vuedraggable'
const trelloModules = namespace('trelloModules')

@Component({
  components: { taskCard, BoardTagPopup, draggable }
})
export default class Trello extends Mixins(BoardHandler) {
  @trelloModules.State('boards') BOARDS_INFO!: BoardType
  @trelloModules.Action('saveBoard') ADD_BOARD_DATA!: (user: UserType) => Promise<void>
  @trelloModules.Action('updateBoard') UPDATE_BOARD_DATA!: (board: BoardType) => Promise<void>
  @trelloModules.Action('deleteBoard') DELETE_BOARD_DATA!: (board: BoardType) => Promise<void>
  @trelloModules.Action('saveTask') ADD_TASK_DATA!: (task: TaskType) => Promise<void>
  @trelloModules.Action('updateTask') UPDATE_TASK_DATA!: (task: TaskType) => Promise<void>

  async created () {
    await this.fetchBoardData()
  }

  async onClickAddBoard () {
    await this.ADD_BOARD_DATA(this.USER_INFO)
    await this.fetchBoardData()
  }

  async onClickAddTask (board: BoardType) {
    const position = String((board.tasks?.length || 0) * 500)
    await this.ADD_TASK_DATA({ board, position })
    await this.fetchBoardData()
  }

  async onClickDeleteBoard (board: BoardType) {
    await this.DELETE_BOARD_DATA(board)
    await this.fetchBoardData()
  }

  async onClickUpdateBoardTagName (board: BoardType) {
    const data = {
      updateData: this.UPDATE_BOARD_DATA,
      fetchData: this.fetchBoardData,
      ...board
    }
    EventBus.$emit('SHOW_POPUP', BoardTagPopup, 'Board Tag Name', data)
  }

  async onClickTaskCard (task: TaskType) {
    const data = {
      updateData: this.UPDATE_TASK_DATA,
      fetchData: this.fetchBoardData,
      ...task
    }
    EventBus.$emit('SHOW_POPUP', DetailTaskPopup, 'Task Detail', data)
  }

  onDragStart (event: any) {
    event.dataTransfer.setData('tid', event.target.dataset.tid)
  }

  async onDropItem (event: any, curIndex: number, tasks: TaskType[]) {
    const nextCardPosition = curIndex + 1 < tasks.length ? Number(tasks[curIndex + 1].position) : Number(tasks[curIndex].position) + 500
    const fromCardTid = event.dataTransfer.getData('tid')
    await this.UPDATE_TASK_DATA(new Task({ id: fromCardTid, board: tasks[curIndex].board, position: String((Number(tasks[curIndex].position) + Number(nextCardPosition)) / 2) }))
    await this.fetchBoardData()
  }

  async onDropToList (event: any, board: BoardType) {
    const fromCardTid = event.dataTransfer.getData('tid')
    await this.UPDATE_TASK_DATA(new Task({ id: fromCardTid, board, position: '500' }))
    await this.fetchBoardData()
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
    color: #ffffff;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    text-align: center;
    border-bottom: 1px solid black;
    margin: 0 0 10px;
  }
  .btn {
    border-radius: 10px;
    border: 0;
  }
  .list {
  list-style: none;
  margin: 0;
  padding: 0;
  }
  .tag-name {
    font-size: 20px;
    display: inline-block;
    margin: 3px 0;
    cursor: pointer;
  }
}
.add-task-btn {
  margin: 0 0 5px;
  width: 95%;
}
.add-board-btn {
  width: 200px;
  height: 40px;
  margin-left: 10px;
  opacity: 50%;
}
.delete-board-btn {
  position: absolute;
  right: 1px;
  top: 1px;
  background: inherit;
  color: red;
}
.board-list {
  width: 100%;
  > li {
    position: relative;
    background: #ddd;
    margin-left: 10px;
    float: left;
    border-radius: 8px;
    text-align: center;
    &::after {
      clear: both;
      content: '';
    }
  }
}
.task-list {
  position: relative;
  width: 206px;
  min-height: 15px;
  > li {
    margin: 0 3px 5px;
  }
}
</style>
