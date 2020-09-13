<template>
  <div class="sign-in">
    <form class="sign-in__box" @submit.prevent="onClickSignInBtn">
      <h1>로그인</h1>
      <input id="email__input" type="email" class="input" name="email" placeholder="email.." v-model="user.email">
      <input type="password" class="input" name="password" placeholder="password.." v-model="user.password">
      <span class="sign-in__controller">
        <input type="submit" class="btn sign-in__btn" value="로그인" >
        <input type="button" @click="onClickSignUpBtn" class="btn sign-up__btn" value="회원가입" >
      </span>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignIn',
  data () {
    return {
      user: {
        email: 'wmp@wemakeprice.com',
        password: 'q1w2e3r4'
      }
    }
  },
  methods: {
    ...mapActions('userModules', {
      SAVE_USER: 'save',
      SIGN_IN: 'signIn'
    }),
    async onClickSignInBtn () {
      const isSignIn = await this.SIGN_IN(this.user)
      isSignIn
        ? this.$message.success('로그인 성공!!') && this.$router.push({ name: 'Trello' })
        : this.$message.error('이메일 또는 비밀번호가 올바르지않습니다.\n다시 시도해주세요.')
    },
    onClickSignUpBtn () {
      this.$router.push({ name: 'SignUp' })
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-in {
  display: flex;
  height: 100%;
}
.sign-in__box {
  margin: auto;
  text-align: center;
  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 50px;
    line-height: 117px;
    letter-spacing: 0.2em;
    color: #FFFFFF;
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
  background: #2F3FD3;
  border: 3px solid rgba(34, 147, 251, 0.5);
  color: white;
}
.sign-up__btn {
  background: #D32F4C;
  border: 3px solid rgba(241, 85, 151, 0.5);
  color: white;
}
</style>
