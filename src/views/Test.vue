<template>
  <div class="test">
    <div class="test__header">
      <h1>연구실</h1>
    </div>
    <div class="test__body">
      <div v-if="boards.isShow">
        <ul>
          <li>
            <board-component bid="15"></board-component>
          </li>
          <li>
            <board-component bid="16"></board-component>
          </li>
        </ul>
      </div>
    </div>
    <div class="test__footer">
      <button @click="onClickSwitchTrelloBaords">Switch Trello boards</button>
      <el-button round type="primary" @click="onClickTestBtn" :icon="isLoading ? 'el-icon-loading' : ''">{{fetchData ? 'Good':'Start'}}</el-button>
      <button @click="onClickShowGlobalDialog">Global Dialog</button>
    </div>
  </div>
</template>

<script type="module">
import boardComponent from '../components/Board/Board'
import axios from '../api'

export default {
  name: 'Test',
  components: {
    boardComponent
  },
  data () {
    return {
      boards: {
        isShow: false
      },
      isLoading: false,
      fetchData: 0
    }
  },
  computed: {
  },
  watch: {
    getFetchData (to, from) {
      console.log('watch')
      console.log(`${to} , ${from}`)
    }
  },
  methods: {
    async onClickTestBtn () {
      console.log('s----------------------------')
      console.log('on click test btn')
      this.isLoading = true
      // const res = await this.$store.dispatch('fetchUserData')
      const fetchData = await axios
        .user
        .findByEmail({ email: 'wmp@wemakeprice.com' })
      console.log(fetchData)
      console.log('finish req api')
      this.isLoading = false
      console.log('f----------------------------')
    },
    onClickShowGlobalDialog () {
      console.log('NO implement method')
      this.$router.push({ name: 'globalDialog' })
    },
    onClickSwitchTrelloBaords () {
      this.boards.isShow = !this.boards.isShow
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
<style lang="scss">
  .test__body {
    ul {
      list-style: none;
    }
  }

  .test__footer {
    button {
      margin: 10px;
      border-radius: 10px;
    }
  }
</style>
