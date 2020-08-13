<template>
  <div class="sign-in">
    <t-header title="Login"/>
    <el-form class="sign-in__form" label-position="top" label-width="100px" :rules="rules" :model="signInForm" ref="signInForm">
      <el-form-item label="Email" prop="email">
        <el-input placeholder="Please input Email" v-model="signInForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pwd">
        <el-input show-password placeholder="Please input password" v-model="signInForm.pwd"></el-input>
      </el-form-item>
      <el-form-item class="sign-in__form__footer">
        <el-button @click="onClickSignInBtn" round>로그인</el-button>
        <el-button @click="onClickSignUpBtn" round>회원가입</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tHeader from '@/components/common/Header/Header.vue'
import { mapActions } from 'vuex'
export default {
  name: 'SignIn',
  components: {
    tHeader
  },
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
      await this.findUserByEmail(this.signInForm)
      this.router.push({ name: 'Hello' })
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

    .sign-in__form__footer {
      text-align: right;
    }
  }
</style>
