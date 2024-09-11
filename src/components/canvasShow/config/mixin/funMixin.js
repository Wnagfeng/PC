import api from '../api'
import {sendReq} from './sendReqMixin'
import router from '@/router'
import { mapMutations } from 'vuex'

export const tool = {
  mixins: [sendReq],
  methods: {
    jumpLink (linkObj) {
      var link = ''
      if(linkObj && linkObj.typeText && linkObj.data){
        switch (linkObj.typeText) {
          case '类别':
            router.push({name:'category',query:{classifyData:JSON.stringify(linkObj.data)}})
            break
          case '店辅':
            router.push({
              path: '/store',
              query: {shopId: linkObj.data.shopId}
            });
            break
          case '商品':
            let data = {
              productId: linkObj.data.productId,
              skuId: linkObj.data.skuId,
              shopId: linkObj.data.shopId
            }
            router.push({
              path: "/productDetail",
              query: {
                proData: JSON.stringify(data)
              }
            })
            break
          case '自定义':
            break
        }
      } else if(linkObj.selsectValue==='/index'){
        router.push("/index");
      }
      return link
    },
    jumpCategory(item){
      router.push({name:'category',query:{classifyData:JSON.stringify(item)}})
    },
    jumpStore(item){
      router.push({
        path: '/store',
        query: {shopId: item.shopId}
      });
    },
    jumpProductDetail(item){
      let data = {
        productId: item.productId,
        skuId: item.skuId,
        shopId: item.shopId
      }
      router.push({
        path: "/productDetail",
        query: {
          proData: JSON.stringify(data)
        }
      });
    },
    jumpSeckills(item){
      router.push({
        path: '/rabatt',
        query: {shopId: item.shopId,id:item.id}
      });
    },
    jumpGroupWorks(item){
      router.push({
        path: '/groupBuy',
        query: {shopId: item.shopId,id:item.id}
      });
    },
    jumpDiscount(item){
      router.push({
        path: '/spitze',
        query: {shopId: item.shopId,id:item.id}
      });
    },
    searchPro (key,type) {
      if (this.$route.name !== 'search') {
        this.$router.push({
          path: '/search',
          query: {
            keyword: key,
            searchVal: type
          }
        })
      } else {
        this.$emit('search', this.keyword, this.searchVal)
      }
    }
  }
}
