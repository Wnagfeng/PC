# 日志::lock:
# 0、最终项目最好以本地为主，如果真的要是以这里为主最好down下来，功能全部测试一遍

# 1、我做的替换全打了标注

```js
   // 替换变量
   // 替换混入
   // 全部替换为less
   // 部分替换为less语法
   //改变源代码
```





# 2、productDetail.vue中也就是加入购物车逻辑中，skuList感觉是他写错了，应该是对象他写成了数组!

这个还是要以具体真实的数据为主先用对象代替了一下

```js
// 监听选择规格参数变化
specSelected(value) {
    console.log(value)
    let sku = ''
    value.forEach((item, sindex) => {
        console.log(item)
        sku += item.attr + ','
    })
    sku = sku.substring(0, sku.length - 1)
    console.log("当前选中的key", sku)
    let s = this.skuList
    // console.log(s)
    // skuList可能是对象，暂时用对象模拟数据，后面改成数组，如果是数组s[sku]取的数据是啥??，除非用key：value去模拟数据！
    this.skuInfo = s[sku]
    console.log("s", s[sku])
}
```

# 3、商品详情页面的样式需要进行微调，在笔记本上看是刚好的，在副屏上看就分布不是太均匀了，可以考虑调整一下布局，让其更加美观



## 4、商品详情页面Bug，我这里自己搭建的项目 跳转路由有报错，不知道那边项目会不会报错，如果不报错直接使用 `this.reload()` 强刷就行了，直接能更新数据

### 这里给出三个解决方案

```js
父组件
//1. 方案一: 子组件push路由携带id强行刷新页面
/*   reloadDetail() {
      this.$router.go(0)
      this.reload()
  }, */
//2. 方案二:子组件排法id,父组件监听,手动获取数据(缺点:路由没有更新后果未知)
reloadDetail(GuessData) {
    this.currentPro = GuessData
    console.log("newId", this.currentPro)
    // 发请求获取数据
    this.getProductInfo()
    this.getLikeProduct()
},
//3. 方案三:子组件更新路由,且emit携带id过来(方案二就能处理了)
    
子组件
 // 跳转到商品详情
//1. 方案一:子组件push路由携带id强行刷新页面
/*    goToProDetail(item) {
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
   }, */
//2. 方案二:子组件排法id,父组件监听,手动获取数据(缺点:路由没有更新后果未知)
// goToProDetail(item) {
//   let data = {
//     productId: item.id
//   }
//   this.$emit('reloadDetail', data)
// }
//3. 方案三:子组件更新路由,且emit携带id过来
goToProDetail(item) {
  let data = {
    productId: item.id
  }
  this.$router.replace({
    path: '/productDetail',
    query: {
      proData: JSON.stringify(data)
    }
  })
  this.$emit('reloadDetail', data)
}
```



