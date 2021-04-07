<template>
  <div class="sign-up">
    <form class="sign-up__box" @submit.prevent="onClickSignUpBtn">
      <h1>회원가입</h1>
      <input
        id="email__input"
        type="email"
        class="input"
        name="email"
        placeholder="email.."
        v-model="email"
      />
      <input
        id="name__input"
        type="text"
        class="input"
        name="email"
        placeholder="name.."
        v-model="name"
      />
      <input
        type="password"
        class="input"
        name="password"
        placeholder="password.."
        v-model="password"
      />
      <input
        type="password"
        class="input"
        name="password"
        placeholder="verify password.."
        v-model="passwordVerify"
      />
      <span class="sign-up__controller">
        <input type="submit" class="btn sign-up__btn" value="회원가입" />
        <input
          type="button"
          @click="$router.go(-1)"
          class="btn back__btn"
          value="뒤로가기"
        />
      </span>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      name: '',
      password: '',
      passwordVerify: ''
    }
  },
  computed: {
    isVerifyPassword () {
      return (
        !!this.password &&
        !!this.passwordVerify &&
        this.passwordVerify === this.password
      )
    }
  },
  methods: {
    ...mapActions('userModules', { POST_USER: 'postSignUp' }),
    async onClickSignUpBtn () {
      try {
        if (!this.email) throw new Error('Email을 입력해주세요.')
        if (!this.name) throw new Error('이름을 입력해주세요.')
        if (!this.password) throw new Error('비밀번호를 입력해주세요.')
        if (!this.isVerifyPassword) throw new Error('비밀번호가 올바르지않습니다.')
        await this.POST_USER({
          email: this.email,
          name: this.name,
          password: this.password
        })
        this.$message.success('회원가입 성공!!')
        this.$router.push({ name: 'trello.board' })
      } catch (err) {
        this.$message.error(err.message)
      }
    },
    onClickCancelBtn () {
      window.history.length
        ? this.$router.go(-1)
        : this.$router.push({ path: '/' })
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
  background: #d32f4c;
  border: 3px solid rgba(241, 85, 151, 0.5);
  color: white;
}
</style>
