<template>
  <div class="shopOrder">
    <div class="shopList">
      <div class="orderList">
        <div class="orderItem" v-for="(shop, index) in shopsData" :key="index">
          <div class="commodity itemBox">
            <!-- 替换Url -->
            <!-- <img :src="$api.BASEURL + shop.productInfo.image" :alt="shop.productInfo.storeName"> -->
            <img :src="shop.productInfo.image" :alt="shop.productInfo.storeName">
            <span>{{ shop.productInfo.storeName }}</span>
          </div>
          <div class="attributes itemBox">
            <span>{{ shop.productInfo.attrInfo.sku }}</span>
          </div>
          <div class="unitPrice itemBox">￥{{ shop.productInfo.attrInfo.price }}</div>
          <div class="numberBox itemBox">{{ shop.cartNum }}</div>
          <div class="totalBox itemBox">￥{{ shop.productInfo.attrInfo.price * shop.cartNum }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shopOrder',
  props: {
    shopsData: Array,
    type: Number
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.shopOrder {
  .shopName {
    padding-left: 20px;
    margin-bottom: 30px;
    color: #333333;
    font-size: 16px;
  }

  .orderList {
    width: 100%;

    .orderItem {
      width: 100%;
      display: flex;
      border: 1px solid #E5E5E5;
      border-bottom: none;
      padding: 30px 0;
      box-sizing: border-box;

      .itemBox {
        color: #333333;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .commodity {
        width: 40%;
        display: flex;

        img {
          width: 80px;
          height: 80px;
          margin-left: 15px;
        }

        span {
          width: 320px;
          margin-left: 30px;
          text-align: left;
        }
      }

      .attributes {
        width: 20%;
        text-align: left;
        color: #999999;
        font-size: 16px;

        span {
          display: block;
          margin-bottom: 5px;
        }
      }

      .unitPrice {
        width: 15%;
        text-align: center;
      }

      .numberBox {
        width: 15%;
        text-align: center;
      }

      .activityBox {
        width: 10%;
        text-align: center;
        font-size: 16px;
      }

      .discountBox {
        width: 20%;
        display: flex;
        justify-content: center;
        color: #666666;

        >>>.el-select {
          width: 200px;

          .el-input__inner {
            height: 34px;
            line-height: 34px;
          }
        }
      }

      .totalBox {
        width: 10%;
        text-align: center;
        color: #FF7800;
        font-weight: bold;
      }
    }

    .orderItem:last-child {
      border-bottom: 1px solid #E5E5E5;
    }
  }

  .remarksBox {
    display: flex;
    background: #F7F7F7;
    padding: 25px 35px;

    .remarksInfo {
      width: 100%;

      >>>.el-textarea__inner {
        width: 100%;
        height: 84px;
      }
    }

    .selectBox {
      margin-left: 70px;

      label {
        color: #666666;
        font-size: 16px;
        font-weight: normal;
      }
    }

    .shopTotal {
      color: #FF7800;
      flex: 1;
      text-align: right;
    }
  }

  .shopList {
    margin-bottom: 50px;

    .orderTotalBox {
      margin-top: 20px;
      text-align: right;

      .shippingBox {
        color: #333333;
        font-size: 14px;
      }

      .orderTotalBox {
        font-size: 14px;
        color: #333333;

        b {
          color: #FF7800;
        }
      }
    }
  }
}
</style>
