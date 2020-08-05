<script src="src/router/index.ts"></script>
<template>
  <div class="sign-in">
    <Header/>
    <el-form class="sign-in-form" label-position="top" label-width="100px" @submit.native.prevent="onClickSignIn"
             :rules="rules" :model="signInForm" ref="signInForm">
      <el-form-item label="Email" prop="email">
        <el-input placeholder="Please input Email" v-model="signInForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pwd">
        <el-input show-password placeholder="Please input password" v-model="signInForm.pwd"></el-input>
      </el-form-item>
      <el-form-item class="sign-in-form-footer">
        <el-button native-type="submit" round>로그인</el-button>
        <el-button @click="onClickSignUp" round>회원가입</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Header from '@/components/common/Header/Header.vue'
  import userAPI from '../../api/userAPI.js'
  import { userSessionHandler } from '@/mixins/userSessionHandler.js'

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
          pwd: ''
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
      onClickSignIn () {
        const errorMsg = (msg) => {
          alert(msg)
        }
        userAPI
          .findByEmail({ email: this.signInForm.email },
            res => {
              if (res.status == 200) {
                if (res.data[0].pwd === this.signInForm.pwd) {
                  console.log('SignIn onClickSignIn method, Success login..!')

                  // bind store user info
                  const resUserInfo = res.data[0]
                  userSessionHandler.methods.login({
                    user: {
                      uid: resUserInfo.id,
                      email: resUserInfo.email,
                      pwd: resUserInfo.pwd
                    },
                    board: resUserInfo.boards
                  })

                  // go route
                  this.$router.push({ path: `/user/${res.data[0].id}/trello` })

                } else {
                  console.log('Incorrect ID or Password')
                  errorMsg('Login Failed.. Incorrect ID or Password')
                } // login info
              } // status
              else {
                console.log(`The expected status is 200, but the response is ${res.status}`)
                errorMsg('Login Failed.. wait for login')
              }
            },
            err => console.log(err),
            () => {
              console.log('finally')
            })
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
