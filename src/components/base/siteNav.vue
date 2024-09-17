<template>
  <div class="header-warp">
    <div class="pc-header">
      <div class="site-nav">
        <div class="warp clearfix">
          <!-- 更新vue代码 -->
          <!-- 原版left模块 -->
          <!-- <div class="left" v-if="userInfo.nickname">
            <div class="welcome" @mouseover="isShowOut = true" @mouseleave="isShowOut = false">
              欢迎你

              {{ userInfo.nickname }}
              <span class="iconfont hoverShowOut">&#xe695;</span>
              <div class="outLogin" v-show="isShowOut" @click="outLoginBtn">退出登录</div>
            </div>
          </div> -->
          <!-- 改版的left模块 -->
          <div class="left" v-if="true">
            <div class="welcome" @mouseover="isShowOut = true" @mouseleave="isShowOut = false">
              欢迎你

              {{ "CoderJoon" }}
              <span class="iconfont hoverShowOut">&#xe695;</span>
              <div class="outLogin" v-show="isShowOut" @click="outLoginBtn">退出登录</div>
            </div>
          </div>
          <div class="left" v-else>
            你好 请先 <span @click="loginBtn(2)">登录</span> 或 <span @click="loginBtn(1)">注册</span>
          </div>
          <div class="right">
            <div class="item">
              <a class="hover-item">我的订单</a>
            </div>
            <div class="item item-select">
              <span class="hover-item"><i class="iconfont icon-shoppingCart"></i>购物车</span>
              <div v-if="!isLogin" class="cart-box cart-no-login">
                <a class="btn" @click="loginBtn">登录</a>
                <p class="p">登录后查看商品</p>
              </div>
            </div>
            <div class="item item-select">
              <span class="hover-item"><i class="iconfont icon-user"></i>我的<i
                  class="ico-arrow el-icon-arrow-down"></i></span>
              <div class="cart-box user-box">
                <ul>
                  <li @click="goToUserInfo">个人信息</li>
                  <li @click="goToUserOrder">我的订单</li>
                  <li @click="goToUserAddress">收货地址</li>
                  <li @click="gotoUserRecharge">钱包充值</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="outLoginDialog" width="30%">
      <span>确定退出登录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="outLoginDialog = false">取 消</el-button>
        <el-button type="primary" @click="outLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import {mapGetters, mapMutations} from 'vuex'
// import {listSearchMixin} from '@/config/mixin'
// import Cookie from 'js-cookie'
// import { Encrypt } from '@/util/secret'
export default {
  // mixins: [listSearchMixin],
  name: 'siteNav',
  props: {
    componentContent: {
      type: Object
    }
  },
  computed: {
    // ...mapGetters([
    //   'userInfo',
    //   'shoppingCart',
    //   'cartNumber'
    // ])
  },
  data() {
    return {
      isShowOut: false,
      menuOpen: false,
      isLogin: true,
      outLoginDialog: false,
      isShowNum: false,
      deleteOpt: {
        visiable: false
      },
      proList: [],
      noticeList: []
    }
  },
  created() {
    // if (Cookie.get('token')) {
    //   this.isShowNum = true
    // }
  },
  methods: {
    // ...mapMutations({
    // setUserInfo: 'SET_USERINFO',
    // setCartNumber: 'SET_CARTNUMBER',
    // setShoppingCart: 'SET_SHOPPINGCART',
    // setNewAddress: 'SET_NEWADDRESS',
    // setAreaCode: 'SET_AREACODE',
    // setNoticeId: 'SET_NOTICEID'
    // }),
    outLoginBtn() {
      console.log(" outLoginBtn")
      // this.outLoginDialog = true
    },
    outLogin() {
      // this.outLoginDialog = false
      // Cookie.remove('token')
      // this.setUserInfo({})
      // this.setCartNumber('')
      // this.setShoppingCart({})
      // this.setNewAddress({})
      // this.setAreaCode([])
      // this.$router.push({ path: '/login', query: { type: 2 } })
      console.log(" outLogin")
    },
    goToUserInfo() {
      // 有报错不用管没有捕获而已
      this.$router.push({ path: '/userInfo' })
    },
    goToUserOrder() {
      this.$router.push({ path: '/myOrder' })
    },
    loginBtn(type) {
      this.$router.push({ path: '/login', query: { type: type } })
    },
    goToUserAddress() {
      this.$router.push({ path: '/signingAddress' })
    },
    gotoUserRecharge() {
      this.$router.push({ path: '/recharge' })
    },
    hover() {
      this.isShowOut = true
    }
  }
}
</script>

<style lang="less" scoped>
.site-nav {
  height: 42px;
  background-color: #F1F2F7;
  line-height: 42px;
  font-size: 14px;

  .welcome {
    margin-left: 50px;
    position: relative;

    .outLogin {
      position: absolute;
      width: 100%;
      z-index: 999;
      background: #FFFFFF;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 0 20px #cccccc;
    }
  }

  .left {
    float: left;

    span {
      // 替换变量
      // color: $mainColor;
      color: #FF7800;
      cursor: pointer;
    }
  }

  .notice {
    float: left;
    width: 280px;
    margin-left: 30px;

    .noticeBox {
      display: flex;
      width: 100%;

      .noticeTitle {
        display: flex;
        align-items: center;

        img {
          width: 22px;
          height: 22px;
          margin-right: 3px;
        }
      }

      .el-carousel {
        flex: 1;
        margin-left: 10px;
      }
    }
  }

  .right {
    float: right;
    margin-right: 50px;

    .item {
      padding: 0 15px;
      display: inline-block;

      span {
        cursor: pointer;

        b {
          // 替换变量
          // color: $mainColor;
          color: #FF7800;
          padding: 0 2px;
        }
      }

      .iconfont {
        margin-right: 5px;
      }

      .icon-user {
        font-size: 14px;
      }

      &.item-select {
        padding-right: 33px;
        position: relative;

        .ico-arrow {
          position: absolute;
          right: 15px;
          top: 0;
          margin-right: 0;
          line-height: 43px;
        }
      }

      &:hover {
        background-color: #fff;

        .cart-no-data,
        .cart-no-login {
          display: flex;
        }

        .cart-list,
        .user-box {
          display: block;
        }

        .hover-item {
          //  替换变量
          // color: $mainColor;
          color: #FF7800;
        }
      }
    }
  }

  .cart-box {
    position: absolute;
    top: 100%;
    background-color: #fff;
    z-index: 999;
    border-radius: 0px 0px 4px 4px;
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.06);

    .cartImgBox {
      img {
        width: 100%;
      }
    }

    &.cart-no-login {
      width: 100%;
      left: 0;
      height: 160px;
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .btn {
        display: inline-block;
        padding: 0 15px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        color: #fff;
        // 替换变量
        // background-color: $mainColor;
        background-color: #FF7800;

        border-radius: 4px;
        margin-bottom: 40px;
      }

      .p {
        color: #666666;
        line-height: 1em;
      }
    }

    &.cart-no-data {
      width: 264px;
      height: 110px;
      left: 50%;
      margin-left: -132px;
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #666;
    }

    &.cart-list {
      width: 348px;
      left: 50%;
      margin-left: -174px;
      display: none;
      padding: 10px;

      dl {
        margin-bottom: 10px;

        dt {
          float: left;
          cursor: pointer;
        }

        dd {
          margin-left: 54px;
          position: relative;
          padding-right: 60px;
          min-height: 42px;
          line-height: 21px;

          h4 {
            color: #333;
            cursor: pointer;
            font-size: 14px;
            // 替换混入
            // @include ellipsis;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          p {
            color: #999;
            font-size: 14px;
            // 替换混入
            // @include ellipsis;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          span {
            // 替换变量
            // color: $mainColor;
            color: #FF7800;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 14px;
          }

          .btn-del {
            color: #333;
            position: absolute;
            top: 20px;
            right: 0;
            font-size: 14px;
          }
        }
      }

      .btn-view-all {
        display: inline-block;
        float: right;
        padding: 0 15px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        color: #fff;
        // 替换变量
        // background-color: $mainColor;
        background-color: #FF7800;
        border-radius: 4px;
        margin-top: 10px;
        cursor: pointer;
      }
    }

    &.user-box {
      width: 100%;
      left: 0;
      padding: 18px 0;
      display: none;

      li {
        font-size: 14px;
        display: block;
        cursor: pointer;
        color: #666;
        text-align: center;

        &:hover {
          background-color: #FFEEE3;
        }
      }
    }
  }
}
</style>
