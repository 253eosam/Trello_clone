<script src="../../router/index.ts"></script>
<template>
  <div class="sign-up">
    <Header title="Join us"/>
    <el-form class="sign-up-form" label-position="top" label-width="100px" :model="signUpForm">
      <el-form-item label="Email">
        <el-input placeholder="Please input Email" v-model="signUpForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input show-password placeholder="Please input password" v-model="signUpForm.pwd"></el-input>
      </el-form-item>
      <el-form-item label="Verify">
        <el-input show-password placeholder="Please input password" v-model="signUpForm.VerifyPwd"></el-input>
      </el-form-item>
      <el-form-item class="sign-up-form-footer">
        <el-button type="primary" @click="onClickSignUp" class="sign-up-btn" round :disabled="!isVerifyPwd">회원가입
        </el-button>
        <el-button class="sign-up-btn" @click="onClickCancle" round>취소</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Header from '@/components/common/Header/Header.vue'
  import userAPI from '../../api/userAPI.js'

  export default {
    name: 'Login',
    components: {
      Header
    },
    data () {
      return {
        signUpForm: {
          email: 'wmp@wemakeprice.com',
          pwd: 'q1w2e3r4',
          VerifyPwd: '',
        },
        isVerifyPwd: false,
      }
    },
    methods: {
      onClickSignUp () {
        const errorMsg = (msg) => {
          alert(msg)
        }
        userAPI.save(
          {
            email: this.signUpForm.email,
            pwd: this.signUpForm.pwd
          },
          res => {
            if (res.status === 200 || res.status === 204) {
              this.$store.commit('setUser', res.data)
              this.$router.push({ path: `/user/${res.data.id}/trello` })
            } else {
              console.log(`the expected tatus is 200 or 204, but the response is ${res.status}`)
              errorMsg('Join failed.. wait for join')
            } // status
          },
          err => {
            console.log(err)
            alert('Fail join ... !')
          },
          () => console.log('finally')
        )
      },
      onClickCancle () {
        window.history.length ? this.$router.go(-1) : this.$router.psuh({ path: '/' })
      }
    },
    watch: {
      'signUpForm.VerifyPwd' (newValue) {
        this.isVerifyPwd = (this.signUpForm.pwd === newValue)
      }
    }
  }

</script>

<style>
  .sign-up-form {
    margin: 10vw;
    text-align: left;
  }

  .sign-in-form-footer {
    text-align: right;
  }
</style>
