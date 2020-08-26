<template>
    <div class="service_wrap">
        <div class="service_img_wrap">
            <img width="210" height="130" class="service_img" src="https://via.placeholder.com/210x130" alt="서비스 이미지">
        </div>
        <div class="service_title_wrap">
            <div class="service_title_area">
                <h2 class="service_title">service</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ServiceBox'
}
</script>

<style lang="scss">
.service_wrap {
    width: 570px;
    height: 130px;
    text-align: center;
    box-shadow: 0px 0px 13px 2px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    .service_img_wrap {
        display: inline-block;
        width: 210px;
        height: 100%;
        margin-right: -10px;
        border-radius: inherit;
        .service_img {
            border-radius: 10px 0 0 10px;
        }
    }
    .service_title_wrap {
        display: inline-block;
        width: 370px;
        height: 128px;
        vertical-align: top;
        z-index: 10;
        // test expression css
        border: 1px solid black;
        background: white;
        width: 368px;
        border-radius: inherit;
        .service_title_area {
            display: flex;
            height: 100%;
            .service_title {
                font-family: Roboto;
                font-size: 50px;
                margin: auto;
            }
        }
    }
    &:hover {
        box-shadow: 0px 0px 13px 5px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
}
</style>
