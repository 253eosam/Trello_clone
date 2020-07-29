<script src="../../router/index.ts"></script>
<template>
  <div class="sign-up">
    <el-row type="flex" justify="space-around">
      <el-col style="text-align: center;">
        <div class="sign-up-box">
          <h1 class="sign-up-title">Sign Up</h1>
          <h5 class="sign-up-subtitle">We Make Price</h5>
          <div style="margin: 20px;"></div>
          <el-form class="sign-up-form" label-position="top" label-width="100px" :model="signUpForm" >
            <el-form-item label="ID">
              <el-input placeholder="Please input ID" v-model="signUpForm.id"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input show-password placeholder="Please input password" v-model="signUpForm.pwd"></el-input>
            </el-form-item>
            <el-form-item label="Verify">
              <el-input show-password placeholder="Please input password" v-model="signUpForm.VerifyPwd"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right">
              <el-button type="primary" @click="onClickSignUp" class="sign-up-btn" round>회원가입</el-button>
              <el-button class="sign-up-btn" @click="onClickCancle" round>취소</el-button>
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
        signUpForm: {
          uid: 0,
          id: '',
          pwd: '',
          VerifyPwd: '',
        },
      }
    },
    methods: {
      onClickSignUp (){
        console.log("SignUp page, onClickSignUp method")
        alert(`success sign up..!!`)
        this.$router.push({path : `/user/${this.signUpForm.uid}/trello`})
      },
      onClickCancle () {
        console.log("SignUp page, onClickCancle method")
        window.history.length ? this.$router.go(-1) : this.$router.psuh({path : '/'});
      }
    },
    watch: {
      'signUpForm.VerifyPwd'(newValue){
        console.log(newValue)
      }
    }
  }

</script>

<style>
  .sign-up-btn{
    text-align: center;
  }
  .sign-up-form{
    margin: 10vw;
    text-align: left;
  }
  .sign-up-box{
    width: 100%;
  }
  .sign-up-title{
    color: #F56C6C;
    font-size: 82px;
    text-align: center;
  }
  .sign-up-subtitle{

  }
</style>
