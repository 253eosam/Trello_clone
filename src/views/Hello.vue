<template>
  <div class="hello_wrap">
    <section class="container">
      <article class="content">
        <img
          class="content_img"
          src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          alt="노트북 타이핑하는 이미지"
          height="300"
        >
        <address class="introduce">
          <p class="name">이성준</p>
          <p class="birth">1994.05.27</p>
          <p class="address_1">서울 관악구 봉천동</p>
          <a href="mailto:dhzm2aud@naver.com" class="email">dhzm2aud@naver.com</a><br>
          <a href="tel:+821082623777" class="phone">010-8262-3777</a>
        </address>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Hello'
}

</script>

<style lang="scss" scoped>
.hello_wrap {
  width: 100%;
  .container {
    height: 820px;
    .content {
      padding: 0 10%;
      height: 300px;
      img {
        float: left;
        margin-right: 50px;
      }
      address {
        height: inherit;
        display: inline-block;
        text-align: center;
        * {
          position: relative;
          display: block;
          top: 20%;
          left: 100%
        }
      }
    }
  }
}
</style>
