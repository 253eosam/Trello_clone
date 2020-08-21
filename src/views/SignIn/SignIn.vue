<template>
  <div class="sign-in">
    <el-form class="sign-in__form" label-position="top" label-width="100px" :rules="rules" :model="signInForm" @submit.native.prevent="onClickSignInBtn">
      <el-form-item label="Email" prop="email">
        <el-input placeholder="Please input Email" v-model="signInForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pwd">
        <el-input show-password placeholder="Please input password" v-model="signInForm.pwd"></el-input>
      </el-form-item>
      <el-form-item class="sign-in__form__btns">
        <el-button native-type="submit" round>로그인</el-button>
        <el-button @click="onClickSignUpBtn" round>회원가입</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SignIn',
  data () {
    return {
      signInForm: {
        email: 'wmp@wemakeprice.com',
        pwd: 'q1w2e3r4'
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Please input email',
            trigger: 'change'
          }
        ],
        pwd: [
          {
            required: true,
            message: 'Please input password',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'findUserByEmail'
    ]),
    async onClickSignInBtn () {
      const res = await this.findUserByEmail(this.signInForm)
      this.$message(res.content)
      if (res.isOk) this.$router.push({ name: 'Hello' })
    },
    onClickSignUpBtn () {
      this.$router.push({ name: 'SignUp' })
    }
  }
}

</script>

<style lang="scss">
  .sign-in {
    .sign-in__form {
      margin: 10vw;
      text-align: left;
    }

    .sign-in__form__btns {
      text-align: right;
    }
  }
</style>
