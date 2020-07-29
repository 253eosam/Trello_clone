<script src="../../router/index.ts"></script>
<template>
  <div class="sign-in">
    <Header />
    <el-form class="sign-in-form" label-position="top" label-width="100px" :model="signInForm" >
      <el-form-item label="ID">
        <el-input placeholder="Please input ID" v-model="signInForm.id"></el-input>
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

export default {
  name: 'Login',
  components: {
    Header
  },
  data () {
    return {
      signInForm: {
        uid : 0,
        id: '',
        pwd: ''
      }
    }
  },
  methods: {
    onClickSignIn(){
      console.log("SignIn page, onClickSignIn method")
      console.log("No Implements Feature" + "onClickSignIn")
      this.$router.push({path : `/user/${this.signInForm.uid}/trello`})
      alert("success sign in..!!")
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
