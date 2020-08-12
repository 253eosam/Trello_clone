<template>
  <div v-if="isShow" class="global-dialog">
    <h1>{{isShow}}</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'GlobalDialog',
  data () {
    return {
      isShow: true
    }
  }
}
</script>

<style>
 .global-dialog {
 /* The Modal (background) */
   display: none; /* Hidden by default */
   position: fixed; /* Stay in place */
   z-index: 1; /* Sit on top */
   padding-top: 100px; /* Location of the box */
   left: 0;
   top: 0;
   width: 100%; /* Full width */
   height: 100%; /* Full height */
   overflow: auto; /* Enable scroll if needed */
   background-color: rgb(0,0,0); /* Fallback color */
   background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
 }
</style>
