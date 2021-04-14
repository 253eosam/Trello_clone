<template>
  <section id="boards_wrap">
    <h2>Board list</h2>
    <article class="board-box board-item" v-for="board in boards" :key="board.id">
      <h3>{{ board.title }}</h3>
    </article>
    <div class="board-box" @click="onClickNewBoard">Create new Board</div>
  </section>
</template>

<script lang="ts">
import { UserType } from '@/model/account/User'
import { BoardType } from '@/model/trello/Board'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

@Component
export default class Boards extends Vue {
  @namespace('userModules').Getter('user') user!: UserType
  @namespace('trelloModules').Action('getBoard') getBoard!: (user: any) => Promise<BoardType>
  @namespace('trelloModules').Action('postBoard') postBoard!: (user: any) => Promise<BoardType>
  @namespace('trelloModules').State('boards') boards!: BoardType

  async created () {
    if (this.user && this.user.id === +this.$route.params.uid) {
      await this.fetch()
    }
  }

  async fetch () {
    await this.getBoard({ user: this.user.id })
  }

  onClickGoDetailPage (bid: number) {
    console.log('[🐱 DDD] ~ file: Boards.vue ~ line 30 ~ Boards ~ onClickGoDetailPage ~ bid', bid)
  }

  async onClickNewBoard (): Promise<void> {
    try {
      const { value } = await this.$prompt('보드 이름을 정해주세요.', { confirmButtonText: '확인', cancelButtonText: '취소' }) as any
      await this.postBoard({ title: value, user: this.user.id })
      await this.fetch()
    } catch (err) {
      if (err !== 'close') console.log(err)
    }
  }
}
</script>

<style lang="scss" scoped>
#boards_wrap {
  width: 800px;
  margin: 20px auto 0;
  &::after {
    display: block;
    content: '';
    clear: both;
  }
  h2 {
    font-size: 20px;
    font-weight: 700;
    padding: 0 0 5px 5px;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
    margin-bottom: 15px;
  }

  .board-box {
    width: 200px;
    height: 100px;
    background: #f2f3f5;
    border-radius: 3px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    user-select: none;

    &:last-child {
      text-align: center;
      line-height: 100px;
    }
  }

  .board-item {
    background: #333;
    color: #fff;
    h3 {
      padding: 10px;
      font-size: 17px;
      font-weight: 700;
      text-shadow: 0 0 2px #000;
    }
  }

}
</style>
