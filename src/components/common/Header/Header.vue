<template>
  <header>
    <div class="gnb_wrap">
      <div class="gnb_title">
        <a title="trello" href="http://localhost:8080/trello">
          <h2 class="service">Trello</h2>
        </a>
      </div>
      <ul class="gnb_list">
        <strong class="blind">트렐로 서비스 컨트롤러</strong>
        <li v-if="user === null" class="gnb_login_li">
          <button
            :disabled="service === 'SignIn'"
            type="button"
            class="login_btn"
            @click="onClickLoginBtn"
          >
            Login
          </button>
        </li>
        <li v-else class="gnb_logout_li">
          <button type="button" class="logout_btn" @click="onClickLogoutBtn">
            Logout
          </button>
        </li>
        <li v-if="user && service === 'Hello'" class="gnb_trello_li">
          <button type="button" class="trello_btn" @click="onClickTrelloBtn">
            Trello
          </button>
        </li>
        <li v-if="service !== 'Hello'" class="gnb_home_li">
          <button type="button" class="home_btn" @click="onClickHomeBtn">
            Home
          </button>
        </li>
        <li v-if="service === 'Trello'" class="gnb_create_board_li">
          <button
            type="button"
            class="create_board_btn"
            @click="onClickCreateBoardBtn"
          >
            Create
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import EventBus from '@/utils/EventBus'

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
      EventBus.$emit('createBoard')
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
  height: 65px;
  margin-bottom: 20px;
  border: 1px solid #1a71a2;
  .gnb_wrap {
    height: 100%;
    width: 100%;
    .gnb_title {
      background: #1a71a2;
      height: 40px;
      text-align: center;
      a {
        text-decoration: none;
      }
      .service {
        display: inline;
        font-size: 50px;
        color: whitesmoke;
        text-shadow: 3px 3px gray;
        &:hover {
          color: #f56c6c;
        }
      }
    }
    .gnb_list {
      list-style: none;
      overflow: hidden;
      height: 25px;
      background: #4385ff;
      margin: 0 0;
      li {
        float: right;
      }
    }
    button {
      cursor: pointer;
      height: 25px;
      border: 1px solid black;
      margin: 0 0.5px;
      &:hover {
        background: #f56c6c;
        color: white;
      }
    }
  }
}
</style>
