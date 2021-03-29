<template>
  <div id="wrap">
    <nav id="lnb">
      <div class="menu_wrap">
        <span class="lnb-item menu">Board</span>
        <div class="menu_box">
          <ul>
            <li>Board item 01</li>
            <li>Board item 02</li>
          </ul>
        </div>
      </div>
      <h2 class="lnb-item">title</h2>
    </nav>
    <section class="board">
      <article class="list">
        <header>
          <h3>List title</h3>
          <div class="list_menu">
            <span class="none">dot menu</span>
            <div class="list_menu_wrap">
              <div class="list_menu_box">
                <strong>List actions</strong>
                <div>Delete</div>
              </div>
            </div>
          </div>
        </header>
        <div class="card"><p>card content</p></div>
        <div class="card"><p>card content</p></div>
        <footer>
          <div>+ Add another card</div>
        </footer>
      </article>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Trello extends Vue {}
</script>

<style lang="scss" scoped>
#wrap {
  #lnb {
    padding: 5px;
    .lnb-item {
      display: inline-block;
      background: rgba($color: #aaa, $alpha: 0.3);
      padding: 5px 13px;
      margin-left: 5px;
      border-radius: 3px;
      height: 20px;
      line-height: 20px;
    }
    .menu_wrap {
      display: inline-block;
      position: relative;
      &:hover > .menu_box {
        display: block;
      }
      .menu_box {
        display: none;
        position: absolute;
        top: 25px;
        left: 5px;
        width: 150px;
        ul {
          margin-top: 10px;
          padding: 10px;
          box-shadow: 0 0 2px #000;
          background: #fff;
          li {
            padding: 10px 6px;
            text-align: center;
            &::after {
              display: block;
              content: "";
              margin: 10px 2px 0 2px;
              border-bottom: 1px solid rgba($color: #000000, $alpha: 0.3);
            }
            &:last-child::after {
              display: none;
            }
          }
        }
        &:hover {
          display: block;
        }
      }
      .menu {
        &:hover + .menu_box {
          display: block;
        }
      }
      .menu::after {
        display: inline;
        margin-left: 5px;
        content: "⌵";
      }
    }
    h2 {
      vertical-align: top;
      font-size: 20px;
      font-weight: 700;
    }
  }

  .board {
    overflow: auto;
    width: 100vw;
    height: calc(100vh - 80px);
    padding: 10px;
    box-sizing: border-box;
    white-space: nowrap;
    &::after {
      display: block;
      content: '';
      clear: both;
    }
    .list {
      display: inline-block;
      margin-right: 10px;
      width: 272px;
      background: rgba($color: #aaa, $alpha: 0.3);
      border-radius: 3px;
      padding: 10px 7px;
      header {
        padding: 5px;
        h3 {
          float: left;
          font-size: 17px;
          font-weight: bold;
        }
        .list_menu {
          position: relative;
          &::after {
            display: block;
            content: "";
            clear: both;
          }
          .none {
            float: right;
            text-indent: -99999px;
            background: url("../../assets/dot-menu.png");
            background-size: 16px;
            width: 16px;
            height: 16px;
            &:hover + .list_menu_wrap {
              display: block;
            }
          }
          .list_menu_wrap {
            display: none;
            position: absolute;
            top: 10px;
            right: -284px;
            padding-top: 10px;
            &:hover {
              display: block;
            }
            .list_menu_box {
              width: 100px;
              background: #fff;
              border-radius: 3px;
              width: 304px;
              padding: 0 12px 3px 12px;
              box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
                0 0 0 1px rgba(9, 30, 66, 0.08);
              strong {
                padding: 0 32px;
                color: #5e6c84;
                text-align: center;
                display: block;
                height: 40px;
                border-bottom: 1px solid rgba(9, 30, 66, 0.13);
                margin-bottom: 8px;
                line-height: 40px;
              }
              div {
                display: block;
                height: 40px;
                border-bottom: 1px solid rgba(9, 30, 66, 0.13);
                margin-bottom: 8px;
              }
              div:last-child {
                line-height: 40px;
              }
            }
          }
        }
        &::after {
          display: block;
          content: "";
          clear: both;
        }
      }
      .card {
        padding: 10px 7px;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0 1px rgba($color: #000000, $alpha: 0.2);
        margin-bottom: 5px;
      }
      footer {
        div {
          height: 20px;
          padding: 5px;
          color: gray;
          line-height: 25px;
        }
      }
    }
  }
}
</style>
