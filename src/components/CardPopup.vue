<template>
  <article id="card_popup">
    <form @submit.prevent>
      <label for="card_content">카드 내용 :
      <input type="text" id="card_content" v-model="content"></label>
      <input class="util_btns submit" type="submit" value="생성" @click="createCard">
      <input class="util_btns cancel" type="button" value="취소" @click="cancel">
    </form>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

@Component
export default class CardPopup extends Vue {
  @namespace('trelloModules').Action('postCard') postCard!: (data: any) => Promise<void>
  @Prop({ type: Number, required: true }) bid!: number
  @Prop({ type: Number, required: true }) position!: number
  @Prop({ type: Function, required: true }) submit!: () => void

  content = ''

  async createCard () {
    if (!this.content) return
    // eslint-disable-next-line @typescript-eslint/camelcase
    await this.postCard({ content: this.content, b_list: this.bid, position: `${this.position}` })
    await this.fetch()
    this.$emit('close')
  }

  async fetch () {
    await this.submit()
  }

  cancel () {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
#card_popup {
  position: relative;
  width: 100%;
  height: 300px;
  form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    label {
      display: block;
      input[type="text"] {
        padding: 5px 10px;
        border-color: #0469a7;
        border-radius: 5px;
        &:focus {
          outline: none;
        }
      }
    }
  }
}
.util_btns {
  float: right;
  padding: 5px 15px;
  margin: 2px;
  border-radius: 5px;
  border: 0;
}
.submit {
  background: #0469a7;
  color: #ffffff;
}

</style>
