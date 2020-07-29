<script src="../../router/index.ts"></script>
<template>
  <div class="sign-in">
    <el-row type="flex" justify="space-around">
      <el-col style="text-align: center;">
        <div class="sign-in-box">
          <h1 class="sign-in-title">Trello</h1>
          <h5 class="sign-in-subtitle">We Make Price</h5>
          <div style="margin: 20px;"></div>
          <el-form class="sign-in-form" label-position="top" label-width="100px" :model="signInForm" >
            <el-form-item label="ID">
              <el-input placeholder="Please input ID" v-model="signInForm.id"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input show-password placeholder="Please input password" v-model="signInForm.pwd"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right">
              <el-button class="sign-in-btn" @click="onClickSignIn" round>로그인</el-button>
              <el-button class="sign-in-btn" @click="onClickSignUp" round>회원가입</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Login',
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
  .sign-in-btn{
    text-align: center;
  }
  .sign-in-form{
    margin: 10vw;
    text-align: left;
  }
  .sign-in-box{
    width: 100%;
  }
  .sign-in-title{
  color: #F56C6C;
  font-size: 82px;
  text-align: center;
  }
</style>
