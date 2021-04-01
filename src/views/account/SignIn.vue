<template>
  <div id="sign-in">
    <h2>로그인</h2>
    <input
      id="email__input"
      type="email"
      class="input"
      name="email"
      placeholder="email.."
      v-model="user.email"
    />
    <input
      type="password"
      class="input"
      name="password"
      placeholder="password.."
      v-model="user.password"
    />
    <span class="sign-in__controller">
      <input
        type="submit"
        @click="onClickSignInBtn"
        class="btn sign-in__btn"
        value="로그인"
      />
      <input
        type="button"
        @click="onClickSignUpBtn"
        class="btn sign-up__btn"
        value="회원가입"
      />
    </span>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SignIn',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState('userModules', {
      USER_INFO: 'user'
    })
  },
  methods: {
    ...mapActions('userModules', {
      SIGN_IN: 'signIn'
    }),
    async onClickSignInBtn () {
      (await this.SIGN_IN(this.user))
        ? this.$message.success('로그인 성공!!') &&
          this.$router.push({ name: 'trello.board' })
        : this.$message.error(
          '이메일 또는 비밀번호가 올바르지않습니다.\n다시 시도해주세요.'
        )
    },
    onClickSignUpBtn () {
      this.$router.push({ name: 'user.signUp' })
    }
  }
}
</script>

<style lang="scss" scoped>
#sign-in {
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -60%);
  h2 {
    text-align: center;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 50px;
    line-height: 117px;
    letter-spacing: 0.2em;
    color: #ffffff;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  }
}
.input {
  display: block;
  margin-bottom: 10px;
  width: 300px;
  height: 30px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  padding: 0 15px;
}
.sign-in__controller {
  float: right;
  &::after {
    clear: both;
  }
}
.btn {
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  width: 70px;
  height: 25px;
  margin-right: 5px;
}
.sign-in__btn {
  background: #2f3fd3;
  border: 3px solid rgba(34, 147, 251, 0.5);
  color: white;
}
.sign-up__btn {
  background: #1db65d;
  border: 3px solid #34d176;
  color: white;
}
</style>
