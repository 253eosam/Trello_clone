import { UserType } from '@/model/User'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

@Component
export default class BoardHandler extends Vue {
  @namespace('trelloModules').Action('findByUid') FETCH_BOARDS_DATA!: (uid: number) => Promise<void>
  @namespace('userModules').State('user') USER_INFO!: UserType

  async fetchBoardData () {
    await this.FETCH_BOARDS_DATA(this.USER_INFO.id)
  }
}
