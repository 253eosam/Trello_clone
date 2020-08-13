<template>
  <div class="sign-up">
    <t-header title="Join us"/>
    <el-form class="sign-up__form" label-position="top" label-width="100px" :model="signUpForm" @submit.native.prevent="onClickSignUpBtn">
      <el-form-item label="Email">
        <el-input placeholder="Please input Email" v-model="signUpForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input show-password placeholder="Please input password" v-model="signUpForm.pwd"></el-input>
      </el-form-item>
      <el-form-item label="Verify">
        <el-input show-password placeholder="Please input password" v-model="signUpForm.verifyPwd"></el-input>
      </el-form-item>
      <el-form-item class="sign-up__form__btns">
        <el-button native-type="submit" type="primary" round :disabled="!isVerifyPwd">회원가입
        </el-button>
        <el-button @click="onClickCancelBtn" round>취소</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tHeader from '@/components/common/Header/Header.vue'
import { mapActions } from 'vuex'
export default {
  name: 'SignUp',
  components: {
    tHeader
  },
  data () {
    return {
      signUpForm: {
        email: 'wmp@wemakeprice.com',
        pwd: 'q1w2e3r4',
        verifyPwd: ''
      },
      isVerifyPwd: false
    }
  },
  methods: {
    ...mapActions([
      'saveUser'
    ]),
    async onClickSignUpBtn () {
      const res = await this.saveUser(this.signUpForm)
      this.$message(res.content)
      if (res.isOk) this.$router.push({ name: 'Hello' })
    },
    onClickCancelBtn () {
      window.history.length ? this.$router.go(-1) : this.$router.push({ path: '/' })
    }
  },
  watch: {
    'signUpForm.verifyPwd' (newValue) {
      this.isVerifyPwd = (this.signUpForm.pwd === newValue)
    }
  }
}

</script>

<style lang="scss">
  .sign-up {
    .sign-up__form {
      margin: 10vw;
      text-align: left;
    }

    .sign-up__form__btns {
      text-align: right;
    }
  }
</style>
