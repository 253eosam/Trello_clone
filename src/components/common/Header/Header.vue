<template>
  <header>
    <div class="gnb_wrap">
      <div class="gnb_area">
        <div class="gnb">
          <ul class="gnb_list">
            <strong class="blind">트렐로 서비스 컨트롤러</strong>
            <li v-if="user === null" class="gnb_login_li">
              <button :disabled="service === 'SignIn'" type="button" class="login_btn" @click="onClickLoginBtn">Login</button>
            </li>
            <li v-else class="gnb_logout_li">
              <button type="button" class="logout_btn" @click="onClickLogoutBtn">Logout</button>
            </li>
            <li v-if="user && service === 'Hello'" class="gnb_trello_li">
              <button type="button" class="trello_btn" @click="onClickTrelloBtn">Trello</button>
            </li>
            <li v-if="service !== 'Hello'" class="gnb_home_li">
              <button type="button" class="home_btn" @click="onClickHomeBtn">Home</button>
            </li>
            <li v-if="service === 'Trello'" class="gnb_create_board_li">
              <button type="button" class="create_board_btn" @click="onClickCreateBoardBtn">Create</button>
            </li>
            <li>
              <button @click="$router.push({ name: 'Test' })">연구실</button>
            </li>
          </ul>
        </div>
        <div class="gnb_title">
          <h1 class="service">Trello</h1>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['user']),
    service () {
      return this.$route.name
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    // onClick events
    onClickCreateBoardBtn () {
      this.$message.warning('service preparing...')
    },
    onClickLoginBtn () {
      this.$router.push({ name: 'SignIn' })
    },
    onClickLogoutBtn () {
      this.setUser() // delete User info of vuex and localstorage
      if (this.$route.name !== 'Hello') this.$router.push({ name: 'Hello' })
      this.$message('로그아웃 성공..!!')
    },
    onClickTrelloBtn () {
      this.$router.push({ name: 'Trello' })
    },
    onClickHomeBtn () {
      this.$router.push({ name: 'Hello' })
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 80px;
  .gnb_wrap {
    position: fixed;
    width: 100%;
    z-index: 1001;
    .gnb_area {
      background: #1a71a2;
      .gnb {
        .gnb_list {
          list-style: none;
          float: right;
        }
        li {
          float: right;
        }
      }
      .gnb_title {
        height: 100%;
        text-align: center;
        .service {
          display: inline;
          color: whitesmoke;
        }
      }
    }
  }
}
</style>
