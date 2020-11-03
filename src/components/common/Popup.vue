<template>
  <div>
    <template v-for="(item, index) in popupStack">
      <component :is="item.popup" :key="index" v-bind="item.props" @closePopup="closePopup(index, item.cb, $event)"/>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  data () {
    return {
      popupStack: []
    }
  },
  watch: {
    '$route' () { this.popupStack = [] },
    popupStack (value) { window.document.body.style.overflowY = value.length ? 'hidden' : '' }
  },
  mounted () {
    this.$on('SHOW_POPUP', data => this.popupStack.push(data))
    this.$on('HIDE_POPUP', () => { this.popupStack = [] })
  },
  beforeDestroy () {
    this.$off('SHOW_POPUP')
    this.$off('HIDE_POPUP')
  },
  methods: {
    closePopup (index, cb, payload) {
      cb && cb(payload)
      this.popupStack.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
