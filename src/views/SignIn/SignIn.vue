<script src="../../router/index.ts"></script>
<template>
  <div class="sign-in">
    <Header />
    <el-form class="sign-in-form" label-position="top" label-width="100px" :model="signInForm" >
      <el-form-item label="Email">
        <el-input placeholder="Please input Email" v-model="signInForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input show-password placeholder="Please input password" v-model="signInForm.pwd"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button @click="onClickSignIn" round>로그인</el-button>
        <el-button @click="onClickSignUp" round>회원가입</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Header from '@/components/common/Header/Header.vue'
import userAPI from '../../api/userAPI'
export default {
  name: 'Login',
  components: {
    Header
  },
  data () {
    return {
      signInForm: {
        uid : 0,
        email: 'wmp@wemakeprice.com',
        pwd: 'q1w2e3r4'
      }
    }
  },
  methods: {
    onClickSignIn(){
      console.log("SignIn page, onClickSignIn method")
      userAPI
        .findByEmail({email: this.signInForm.email},
        res => {
        if(res.data.length === 1 && res.data[0].pwd === this.signInForm.pwd){
          console.log("Success Login")
          this.$store.commit('setUser',res.data[0])
          this.$router.push({path : `/user/${res.data[0].id}/trello`})
        }else {
          console.log("Fail Login")
        }
      },
      err => console.log(err),
        () => {
          console.log("finally")
        })
    },
    onClickSignUp () {
      console.log("SignIn page, onClickSignUp method")
      this.$router.push({ path: '/sign-up' })
    }
  }
}

</script>

<style>
  .sign-in-form{
    margin: 10vw;
    text-align: left;
  }
</style>
