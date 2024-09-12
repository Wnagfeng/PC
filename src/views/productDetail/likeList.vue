<template>
  <div class="likeList">
    <div class="likeProTit">
      <div class="likeListTit"><i></i><span>猜你喜欢</span><i></i></div>
      <span class="description">Guess you like it</span>
    </div>
    <div class="likeListBox">
      <div @click="goToProDetail(item)" class="likeProItem" v-for="(item) of similarProducts" :key="item.id">
        <div class="itemImgBox">
          <div class="imgBox">
            <img ref="getHeight" :src="$api.BASEURL + item.image">
          </div>
        </div>
        <div class="text">
          <h4 class="h4">{{item.storeName}}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'likeList',
  props: {
    similarProducts: Array
  },
  methods: {
    // 跳转到商品详情
    goToProDetail (item) {
      let data = {
        productId: item.id
      }
      this.$router.push({
        path: '/productDetail',
        query: {
          proData: JSON.stringify(data)
        }
      })
      this.$emit('reloadDetail')
    }
  }
}
</script>

<style lang="scss" scoped>
 .likeList {
   .likeProTit {
     text-align: center;
     margin-bottom: 40px;
     .likeListTit {
       width: 100%;
       display: flex;
       justify-content: center;
       height: 30px;
       align-items: center;
       i {
         width: 53px;
         height: 2px;
         background: #686868;
       }
       span {
         margin: 0 15px;
       }
     }
     .description {
       color: #666666;
       font-size: 12px;
     }
   }
   .likeListBox {
     .likeProItem {
       margin-bottom: 30px;
       cursor: pointer;
       .itemImgBox {
         height: auto;
         display: flex;
         flex-direction: column;
         justify-content: center;
         .imgBox {
           padding-bottom: 80%;
           position: relative;
           img {
             max-width: 100%;
             height: 100%;
             max-height: 100%;
             position: absolute;
             margin: auto;
             top: 0;
             right: 0;
             bottom: 0;
             left: 0;
           }
         }
       }
       .text {
         h4 {
           font-size: 16px;
           color: #333333;
           font-weight: 400;
           line-height: 35px;
           text-align: center;
         }
       }
     }
   }
 }
</style>
