 <template>
 <!-- view file first el is container -->
  <div>
    <section class="content">
      <ul class="board_list">
        <li v-for="(board, idx) in boards" :key="idx">
          <boardComponent :bid="board.id"/>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import boardComponent from '@/components/Board/Board.vue'
import { Action, Getter, Mutation } from 'vuex-class'
import { UserType } from '../../model/User'
import EventBus from '@/utils/EventBus'

@Component({
  components: {
    boardComponent
  }
})
export default class Trello extends Vue {
  @Getter('user') user!: UserType
  @Action('findBoardByUid') findBoardByUid!: any
  @Action('createBoard') createBoard!: any

  maxBoardCnt = 6
  boards = []
  isDialogOfDetailTask = false
  dragula = null

  created () {
    this.fetchBoardList()
    EventBus.$on('createBoard', () => {
      this.createBoardInfo()
    })
  }

  beforeDestroy () {
    EventBus.$off('createBoard')
  }

  async fetchBoardList () {
    const res = await this.findBoardByUid(this.user.id)
    console.log(res)
    this.boards = res.fetchData
  }

  async createBoardInfo () {
    const res = await this.createBoard()
    console.log(res)
    this.$message(res.content)
    this.boards.push(res.fetchData)
  }
}
</script>

<style lang="scss" scoped>
  .content {
    height: 100%;
    .board_list {
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: auto;
      white-space:nowrap;
      li {
        display: inline-block;
        margin: 0 50px 0 0;
      }
    }
  }
</style>
