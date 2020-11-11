<template>
  <div class="sign-up">
    <form class="sign-up__box" @submit.prevent="onClickSignUpBtn">
      <h1>회원가입</h1>
      <input id="email__input" type="email" class="input" name="email" placeholder="email.." v-model="signUpForm.email">
      <input type="password" class="input" name="password" placeholder="password.." v-model="signUpForm.password">
      <input type="password" class="input" name="password" placeholder="verify password.." v-model="signUpForm.passwordVerify">
      <span class="sign-up__controller">
        <input type="submit" :disabled="!isVerifyPassword" class="btn sign-up__btn" value="회원가입" >
        <input type="button" @click="$router.go(-1)" class="btn back__btn" value="뒤로가기" >
      </span>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'SignUp',
  data () {
    return {
      signUpForm: {
        email: 'wmp@wemakeprice.com',
        password: 'q1w2e3r4',
        passwordVerify: ''
      },
      isVerifyPassword: false
    }
  },
  computed: {
    ...mapState('userModules', { USER_INFO: 'user' })
  },
  methods: {
    ...mapActions('userModules', { SIGN_UP: 'save' }),
    async onClickSignUpBtn () {
      await this.SIGN_UP(this.signUpForm)
      if (this.USER_INFO) {
        this.$message.success('회원가입 성공!!')
        this.$router.push({ name: 'SignIn' })
      } else {
        this.$message.error('이메일 또는 비밀번호가 올바르지않습니다.\n다시 시도해주세요.')
      }
    },
    onClickCancelBtn () {
      window.history.length ? this.$router.go(-1) : this.$router.push({ path: '/' })
    }
  },
  watch: {
    'signUpForm.passwordVerify' (newValue) {
      this.isVerifyPassword = (this.signUpForm.password === newValue)
    }
  }
}

</script>

<style lang="scss" scoped>
.sign-up {
  display: flex;
  height: 90vh;
}
.sign-up__box {
  margin: auto;
  text-align: center;
  h1 {
    margin: 0;
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
.sign-up__controller {
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
.sign-up__btn {
  background: #1db65d;
  border: 3px solid #34d176;
  color: white;
  &:disabled {
    opacity: 40%;
  }
}
.back__btn {
  background: #D32F4C;
  border: 3px solid rgba(241, 85, 151, 0.5);
  color: white;
}
</style>
