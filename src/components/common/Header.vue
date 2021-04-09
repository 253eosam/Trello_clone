<template>
  <header id="main_header">
    <h1><a href="#">Trello</a></h1>
    <div @click="isShowAccountMenu = !isShowAccountMenu" id="account_avatar">Profile avatar</div>
    <div v-if="isShowAccountMenu" id="account_menu">
      <template v-if="user">
        <strong>Account</strong>
        <div id="profile_box">
          <div class="avatar"/><span class="nick-name">{{ user.name }}</span><span class="email">{{ user.email }}</span>
        </div>
        <div @click="onClickSignOut">Log out</div>
      </template>
    </div>
  </header>
</template>

<script lang="ts">
import { UserType } from '@/model/account/User'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

@Component
export default class Header extends Vue {
  @namespace('userModules').Getter('user') user!: UserType
  @namespace('userModules').Mutation('clearUser') logout!: () => void

  isShowAccountMenu = false

  onClickSignOut () {
    this.logout()
    this.$router.push('/')
  }
}
</script>

<style lang="scss" scoped>
#main_header {
  position: static;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: #0469a7;

  h1 {
    font-size: 20px;
    font-weight: 700;
    height: 40px;
    line-height: 40px;
    text-align: center;
    a {
      text-decoration: none;
      color: #5b92bf;
    }
  }
  #account_avatar {
    position: absolute;
    right: 5px;
    top: 4px;
    height: 32px;
    width: 32px;
    text-indent: -99999px;
    background: url('../../assets/avatar_default.png');
    background-size: 32px 32px;
  }
  #account_menu {
    position: absolute;
    right: 5px;
    box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
    border-radius: 3px;
    width: 304px;
    padding: 0 12px;

    strong {
      padding: 0 32px;
      color: #5e6c84;
      text-align: center;

      display: block;
      height: 40px;
      border-bottom: 1px solid rgba(9,30,66,.13);
      margin-bottom: 8px;
      line-height: 40px;
    }

    div {
      display: block;
      height: 40px;
      border-bottom: 1px solid rgba(9,30,66,.13);
      margin-bottom: 8px;
    }
    div:last-child {
      line-height: 40px;
    }

    #profile_box {
      position: relative;
      .avatar {
        position: absolute;
        left: 0;
        width: 32px;
        height: 32px;
        background: #ddd;
        border-radius: 100%;
      }
      .nick-name {
        position: absolute;
        top: 2px;
        left: 40px;
        font-size: 14px;
      }
      .email {
        position: absolute;
        bottom: 8px;
        left: 40px;
        font-size: 9pt;
        color: #b3bac5;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 230px;
        white-space: nowrap;
      }
    }
  }
}
</style>
