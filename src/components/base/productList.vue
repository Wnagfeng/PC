<template>
  <div class="product">
    <div class="productBox" v-for="(item, index) in productList" :key="index">
      <!-- 改变源代码 -->
      <!-- <img class="cur-poi" :src="$api.BASEURL + item.image" /> -->
      <img class="cur-poi" :src="item.image" />
      <p class="productName">{{ item.storeName }}</p>
      <div class="price">
        <span class="presentPrice">¥{{ item.price }}</span>
        <span class="originalPrice">¥{{ item.otPrice }}</span>
      </div>
      <div class="line"></div>
      <p class="productDesc">{{ item.storeInfo }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['productList'],
  data() {
    return {}
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.product {
  width: 100%;
  display: flex;
  flex-flow: wrap;
  margin-bottom: 30px;

  .productBox {
    width: 282px;
    margin-bottom: 50px;
    margin-right: 11px;
    transition: all 0.3s linear;
    text-align: center;

    img {
      width: 282px;
      height: 282px;
      margin-bottom: 27px;
    }

    .productName {
      font-weight: bold;
      margin-bottom: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .price {
      margin-bottom: 12px;

      .presentPrice {
        font-size: 18px;
        font-weight: bold;
        color: #ff7800;
      }

      .originalPrice {
        font-size: 16px;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }

    .line {
      width: 160px;
      height: 2px;
      background-color: #f0f0f0;
      margin: 0 auto;
    }

    .productDesc,
    .shopName {
      margin-top: 20px;
      color: #999999;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;

      span {
        width: 16px;
        height: 14px;
        margin-right: 5px;
        background-image: url("../../static/image/banner@2x.png");
      }
    }

    .shopName {
      cursor: pointer;
    }
  }

  .productBox:nth-of-type(4n) {
    margin-right: 0;
  }

  .productBox:hover {
    box-shadow: 0 0 20px #cccccc;
  }
}
</style>
