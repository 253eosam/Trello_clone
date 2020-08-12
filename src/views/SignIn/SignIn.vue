<script src="src/router/index.ts"></script>
<template>
  <div class="sign-in">
    <Header title="Login" />
    <el-form class="sign-in-form" label-position="top" label-width="100px" :rules="rules" :model="signInForm" ref="signInForm">
      <el-form-item label="Email" prop="email">
        <el-input placeholder="Please input Email" v-model="signInForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pwd">
        <el-input show-password placeholder="Please input password" v-model="signInForm.pwd"></el-input>
      </el-form-item>
      <el-form-item class="sign-in-form-footer">
        <el-button @click="onClickSignIn" round>로그인</el-button>
        <el-button @click="onClickSignUp" round>회원가입</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Header from '@/components/common/Header/Header.vue'
  import { userSessionHandler }  from '../../mixins/userSessionHandler.js'
  import { mapActions } from 'vuex'
  export default {
    name: 'Login',
    components: {
      Header
    },
    data () {
      return {
        signInForm: {
          uid: 0,
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
        },
      }
    },
    methods: {
      ...mapActions([
        'findUserByEmail'
      ]),
      async onClickSignIn () {
        console.log('sign in view, sign in btn')
        const res = await this.findUserByEmail(this.signInForm)
        console.log('sign in view, sign in btn', res)
      },
      onClickSignUp () {
        this.$router.push({ path: '/sign-up' })
      }
    },
    mixins: [userSessionHandler]
  }

</script>

<style>
  .sign-in-form {
    margin: 10vw;
    text-align: left;
  }

  .sign-in-form-footer {
    text-align: right;
  }
</style>
