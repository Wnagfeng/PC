<template>
  <div class="orderDetail">
    <div class="content">
      <!-- 头部 -->
      <div class="head">
        <router-link to="/myOrder">
          <div class="myOrder">我的订单</div>
        </router-link>
        <div class='arrow'></div>
        <div class="myOrderDetail">订单详情</div>
      </div>
      <!-- 订单状态 -->
      <div class="status">
        <div class="left">
          <p class="myOrderDetailNumber">订单号：{{ orderDetail.orderId }}</p>
          <div class="box" v-if="orderDetail.statusDto && orderDetail.statusDto.type == 0">
            <p class="statusTestOne">等待付款</p>
            <el-button plain size="small" @click="closeOrder" class="cancel">取消订单</el-button>
            <el-button plain size="small" @click="getUrl" class="pay">付款</el-button>
          </div>
          <div class="box" v-if="orderDetail.statusDto && orderDetail.statusDto.type == 1">
            <p class="statusTextOne">待发货</p>
          </div>
          <div class="box" v-if="orderDetail.statusDto && orderDetail.statusDto.type == 2">
            <p class=" statusOffer">待收货</p>
          </div>
          <div class="box" v-if="orderDetail.statusDto && orderDetail.statusDto.type == 3">
            <p class="statusTestOne">待评价</p>
          </div>
          <div class="box" v-if="orderDetail.statusDto && orderDetail.statusDto.type == 4">
            <p class="statusTestOne">已完成</p>
          </div>
        </div>

        <div class="right">
          <!-- 0.等待付款 -->
          <PendingPayment :createTime="orderDetail.createTime"
            v-if="orderDetail.statusDto && orderDetail.statusDto.type == 0">
          </PendingPayment>
          <!-- 1.付款成功待发货 -->
          <PaymentSuccess :createTime="orderDetail.createTime"
            v-if="orderDetail.statusDto && orderDetail.statusDto.type == 1">
          </PaymentSuccess>
          <!-- 2.发货成功待收货 -->
          <ReceiptPending :createTime="orderDetail.createTime"
            v-if="orderDetail.statusDto && orderDetail.statusDto.type == 2"></ReceiptPending>
          <!-- 3.已完成待评价 -->
          <PendingReview :createTime="orderDetail.createTime"
            v-if="orderDetail.statusDto && orderDetail.statusDto.type > 2"></PendingReview>
        </div>
      </div>
      <!-- 描述 -->
      <div class="desc">
        <div class="receivingInfo">
          <p class="title">收货信息</p>
          <div class="info">
            <p>收货地址：{{ orderDetail.userAddress }}</p>
            <p>收货人：{{ orderDetail.realName }}</p>
            <p>收货电话：{{ orderDetail.userPhone }}</p>
          </div>
        </div>
        <!-- Ordertitle -->
        <div class="orderInfo">
          <p class="title">订单信息</p>
          <div class="info">
            <p>订单号：{{ orderDetail.orderId }}</p>
            <p>创建时间：{{ orderDetail.createTime }}</p>
            <p>备注：{{ orderDetail.remark }}</p>
          </div>
        </div>
        <!-- 订单商品信息 -->
        <div class="productInfo">
          <div class="top">
            <span class="baby">宝贝</span>
            <span>宝贝属性</span>
            <span>状态</span>
            <span>数量</span>
            <span>单价</span>
          </div>
          <div class="bottom" v-for="(item, idx) in orderDetail.cartInfo" :key="idx">
            <div class="baby">
              <!-- 替换Url -->
              <!-- <img :src="$api.BASEURL + item.productInfo.image" alt=""> -->
              <img :src="item.productInfo.image" alt="">
              <p>{{ item.productInfo.storeName }}</p>
            </div>
            <div style="flex-direction: column;">
              <p>{{ item.productInfo.attrInfo.sku }}</p>
            </div>
            <div v-if="orderDetail.statusDto && orderDetail.statusDto.type == 0">待付款</div>
            <div v-if="orderDetail.statusDto && orderDetail.statusDto.type == 1">待发货</div>
            <div v-if="orderDetail.statusDto && orderDetail.statusDto.type == 2">待收货</div>
            <div v-if="orderDetail.statusDto && orderDetail.statusDto.type == 3">已完成</div>
            <div>{{ item.cartNum }}</div>
            <div class="bottomPrice">¥{{ item.productInfo.attrInfo.price }}</div>
          </div>
        </div>
        <!-- 订单结算信息 -->
        <div class="settlement">
          <div class="box">
            <div class="left">
              <p>商品总价：<span class="right" style="color:#FF7800;">¥{{ orderDetail.totalPrice }}</span></p>
              <p>运费：<span class="right">￥{{ orderDetail.payPostage }}</span></p>
              <p v-if="orderDetail.statusDto && orderDetail.statusDto.type == 0" class="mar-top-20">需付款：<span
                  class="right" style="color:#FF7800;">¥{{ orderDetail.payPrice }}</span></p>
              <p v-if="orderDetail.statusDto && orderDetail.statusDto.type != 0" class="mar-top-20">实付款：<span
                  class="right" style="color:#FF7800;">¥{{ orderDetail.payPrice }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="提示" :visible.sync="closeOrderDialog" width="30%" :before-close="closeOrderBtn">
      <span>是否取消该订单?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrderDialog = false">取 消</el-button>
        <el-button type="primary" @click="cancelOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import PendingPayment from './cpns/PendingPayment .vue'
import PaymentSuccess from './cpns/PaymentSuccess .vue'
import ReceiptPending from './cpns/ReceiptPending .vue'
import PendingReview from './cpns/PendingReview .vue'
import api from '../../api'
import { listSearchMixin } from '../../config/mixin'
import { mapMutations } from 'vuex'
export default {
  mixins: [listSearchMixin],
  components: {
    PendingPayment,
    PaymentSuccess,
    ReceiptPending,
    PendingReview
  },
  data() {
    return {
      orderDetail: {
        orderId: "00001",
        createTime: "2021-01-01 12:00:00",
        userAddress: "北京市海淀区西二旗",
        realName: "张三",
        userPhone: "13812345678",
        remark: "不吃辣",
        totalPrice: "1999",
        payPostage: "10",
        payPrice: "10",
        statusDto: {
          type: 2,
        },
        cartInfo: [
          {
            cartNum: 11,
            productInfo: {
              image: "https://bpic.588ku.com/element_origin_min_pic/23/04/25/2a96cb3b448e184dd2f85772b8389bd9.jpg",
              storeName: "CoderJoon",
              attrInfo: {
                sku: "12+256",
                price: "1999"
              }
            }
          }
        ]

      },
      text: '',
      orderId: '',
      endTime: '',
      closeOrderDialog: false,
      setTime: null,
      chatTimer: null
    }
  },
  created() {
    this.orderId = this.$route.query.orderId
  },
  mounted() {
    this.getOrderDetail()
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'SET_USERINFO'
    }),
    // 获取用户信息
    getUserInfo() {
      let params = {
        url: api.getUser,
        method: 'GET'
      }
      this.sendReq(params, (res) => {
        if (res.status === 200) {
          this.setUserInfo(res.data)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    // 获取订单详情
    getOrderDetail() {
      // const rLoading = this.openLoading() //打开加载动画
      let self = this
      let params = {
        url: api.getOrderDetail + self.orderId,
        method: 'GET',
        data: {
        }
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          self.orderDetail = res.data
          self.getUserInfo()
          rLoading.close()
        } else {
          self.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    // 取消订单
    cancelOrder() {
      let self = this
      let params = {
        url: api.cancelOrder,
        method: 'POST',
        data: {
          id: self.orderDetail.orderId
        }
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          self.closeOrderDialog = false
          this.$router.push({ path: '/myOrder' })
        } else {
          self.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    // 取消订单
    closeOrder() {
      this.closeOrderDialog = true
    },
    closeOrderBtn() {
      this.closeOrderDialog = false
    },
    // 付款
    getUrl() {
      let self = this
      let params = {
        url: api.payOrder,
        method: 'POST',
        data: {
          from: 'h5',
          paytype: 'yue',
          uni: self.orderDetail.orderId
        }
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          self.getOrderDetail()
          self.$message({
            message: res.msg,
            type: 'success'
          })
        } else {
          self.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.orderDetail {
  width: 100%;

  .content {
    width: 1252px;
    // background-color: antiquewhite;
    margin: 0 auto;

    .head {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      display: flex;
      align-items: center;

      .myOrder {
  
        margin-right: 10px;
      }

      .myOrderDetail {
        margin-right: 10px;
      }





      .arrow {
        background-image: url('../../static/image/xiangyou@2x.png');
        width: 5px;
        height: 10px;
        margin-right: 10px;
      }
    }

    .status {
      width: 100%;
      height: 325px;
      border: 1px solid #E5E5E5;
      box-sizing: border-box;
      padding: 15px;
      display: flex;
      margin-bottom: 20px;

      .myOrderDetailNumber {
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 60px;
      }

      .statusTestOne {
        font-size: 24px;
        font-weight: bold;

        margin-bottom: 10px;
        color: #71B247;

      }

      .statusTextOne {
        font-size: 24px;
        font-weight: bold;
        color: #FF7800;
      }

      .statusOffer {
        font-size: 24px;
        font-weight: bold;
        color: #FF7800;
        margin-bottom: 10px;
      }

      .left {
        flex: 1;
        border-right: 1px solid #E5E5E5;
        display: flex;
        align-items: center;
        flex-direction: column;

        .cancel {
          width: 100px;
          margin-left: 0;
          margin-bottom: 10px;
        }

        .invite {
          width: 100px;
          border: 1px solid #FF7800;
          color: #FF7800;
        }

        .pay {
          width: 100px;
          border-color: #FF7800;
          color: #FF7800;
          margin-left: 0;
          margin-bottom: 10px;
        }

        .pay:hover {
          background-color: rgba($color: #FF7800, $alpha: 0.3);
        }

        .box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: 40px;
        }

        .groupShopping {
          .groupShopTit {
            font-size: 24px;
            font-weight: bold;
            color: #FF7800;
            margin-bottom: 18px;
          }

          span {
            width: 100px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #FF7800;
            border-radius: 4px;
            color: #FF7800;
            font-size: 14px;
            display: block;
            text-align: center;
            margin-bottom: 12px;
            cursor: pointer;
          }

          .closeOrder {
            font-size: 14px;
            color: #999999;
            border: 1px solid #999999;
          }
        }
      }

      .right {
        flex: 3;
        padding: 20px;
        box-sizing: border-box;
      }
    }

    .logistics {
      padding: 25px;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 20px;
      border: 1px solid #E5E5E5;

      .content {
        display: flex;

        .left {
          padding: 20px 0;
          flex: 2;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          border-right: 2px solid #E5E5E5;

          img {
            width: 200px;
            height: 200px;
            margin-right: 40px;
          }

          div {
            p {
              font-size: 14px;
              color: #666666;
              margin-bottom: 20px;
            }
          }
        }

        .right {
          flex: 3;
          padding: 20px;
          box-sizing: border-box;
          display: flex;

          .dilevery {
            height: 280px;
            width: 600px;
            overflow-x: auto;
            padding: 20px;
            box-sizing: border-box;
            // div{
            //     padding-left: 25px;
            //     margin-bottom: 25px;
            //     position: relative;
            //     box-sizing: border-box;
            //     white-space: nowrap;
            //     .dot{
            //         // display: inline-block;
            //         width: 6px;
            //         height: 6px;
            //         border-radius: 3px;
            //         background-color: #D9D9D9;
            //         margin-right: 10px;
            //         position: absolute;
            //         left: 0;
            //         top: 50%;
            //         transform: translate(50%,0);
            //         .line{
            //             position: absolute;
            //             left: 50%;
            //             top: 12px;
            //             transform: translate(-50%,0);
            //             width: 2px;
            //             height: 25px;
            //             background-color: #F1F1F1;
            //         }
            //     }
            // .line{
            //     width: 100%;
            //     border-left: 2px solid #F1F1F1;
            //     height: 25px;
            //     margin-left: -21px;
            // }
            // }
            // div:last-child{
            //     margin-bottom: 0;
            //     .line{
            //         display: none;
            //     }
            // }
            // .active{
            //     .dot{
            //         background-color: #FF7800;
            //     }
            // }
          }
        }
      }
    }

    .desc {
      width: 100%;
      border: 1px solid #E5E5E5;
      margin-bottom: 140px;

      .receivingInfo,
      .storeInfo,
      .orderInfo {
        padding: 25px;
        border-bottom: 1px solid #E5E5E5;

        .title {
          font-size: 16px;
          margin-bottom: 25px;
        }

        .info {
          display: flex;
          margin-left: 75px;
          flex-wrap: wrap;

          p {
            line-height: 30px;
            width: 50%;
            font-size: 14px;
          }
        }
      }

      .orderInfo,
      .receivingInfo {
        .info {
          p {
            width: 33.33%;
          }
        }
      }

      .productInfo {
        width: 100%;


        .top {
          height: 40px;
          width: 100%;
          background-color: #EDEDED;
          display: flex;
          align-items: center;
          text-align: center;

          span {
            flex: 1;
            font-size: 12px;
          }

          .baby {
            flex: 2;
          }
        }

        .bottom {
          width: 100%;
          padding: 20px 0;
          box-sizing: border-box;
          text-align: center;
          display: flex;
          border-bottom: 1px solid #E5E5E5;

          div {
            flex: 1;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;

            p {
              font-size: 14px;
              line-height: 20px;
            }
          }

          .baby {
            text-align: left;
            flex: 2;
            display: flex;
            box-sizing: border-box;
            justify-content: flex-start;
            align-items: center;

            img {
              width: 80px;
              height: 80px;
              margin: 0 20px;
            }

            p {
              width: 50%;
            }
          }
        }

        .bottomPrice {
          color: #FF7800;
          font-weight: bold;
        }
      }

      .settlement {
        width: 100%;
        display: flex;
        padding: 25px;
        box-sizing: border-box;
        justify-content: flex-end;

        .box {
          display: flex;

          .left {
            text-align: right;

            p {
              width: 250px;
              display: flex;
              justify-content: space-between;
              font-size: 20px;
              color: #666666;
              line-height: 30px;
            }

            .right {
              text-align: right;
              margin-left: 40px;
            }
          }
        }
      }
    }
  }

  .groupBuying {
    border: 1px solid #E5E5E5;
    height: 325px;
    padding: 20px;
    margin-bottom: 20px;

    .groupBuyTit {
      font-size: 16px;
      color: #333333;
      font-weight: bold;
    }

    .groupBuyBox {
      text-align: center;
      margin-top: 30px;

      .result {
        font-size: 18px;
        margin-bottom: 20px;
      }

      .result0 {
        color: #EC4B42;
      }

      p {
        font-size: 14px;
        color: #333333;
        margin-bottom: 20px;

        span {
          color: #FF7800;
          font-size: 14px;
          font-weight: normal;
        }
      }

      .surplusTime {
        margin-bottom: 30px;
        font-size: 16px;
        color: #666666;
        display: flex;
        justify-content: center;
        align-items: center;

        .day {
          margin-left: 10px;
        }

        .time {
          color: #FF7800;
        }

        span {
          border: 1px solid #E5E5E5;
          border-radius: 2px;
          display: block;
          width: 24px;
          height: 24px;
          text-align: center;
          line-height: 20px;
          margin: 0 8px;
        }
      }

      .userList {
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          display: block;
          width: 76px;
          height: 76px;
          position: relative;
          margin: 0 13px;
          border-radius: 50%;
          box-sizing: border-box;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }

          i {
            position: absolute;
            left: 8px;
            bottom: -10px;
            width: 60px;
            height: 24px;
            background: #FF7800;
            border-radius: 12px;
            font-style: normal;
            text-align: center;
            line-height: 24px;
            color: #FFFFFF;
            font-size: 14px;
          }
        }

        .noPeople {
          border: 1px dashed #E5E5E5;
          color: #DBDBDB;
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        span:first-child {
          border: 1px solid #FF7800;
        }
      }
    }
  }

  .inviteDialog {
    text-align: center;

    .inviteTit {
      font-size: 22px;
      color: #444444;
    }

    .imgCode {
      width: 200px;
      height: 200px;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;
      }
    }

    p {
      margin: 25px 0;
    }

    .linkBox {
      display: flex;
      justify-content: center;

      .linkAddress {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        display: block;
        width: 220px;
        text-align: left;
        border: 1px solid #E5E5E5;
      }

      .copyBtn {
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #FFFFFF;
        border: 1px solid #FF7800;
        color: #FF7800;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }

  .weChatBox {
    display: flex;

    img {
      width: 100%;
    }

    .qCode {
      width: 50%;
      text-align: center;

      img {
        width: 80%;
      }
    }

    .weChatInfo {
      width: 50%;
    }
  }

  .weChat {
    >>>.el-dialog__body {
      background: #FFFFFF;
    }
  }
}
</style>
