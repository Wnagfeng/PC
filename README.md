# PC端练习指南:memo:：

```js
Write By CoderJoon
Time: 2024-09-08 —— 2024-
```

***



我做的替换全打了标注：

你可以直接全局查询，查看到我的替换

```js
// 替换变量
// 替换混入
// 全部替换为less
// 部分替换为less语法
//改变源代码
```

***



### 1.前置条件:lock:：

为了练习该项目我对本机进行了版本降级 以下是该`Pc`项目运行所需的环境：

| 环境类型     | 版本号   |
| ------------ | -------- |
| Node         | ^14.17.6 |
| `Elemenu—Ui` | ^2.12.0  |
| `Vue—Router` | ^3.0.1   |
| `Vue`        | ^2.5.2`  |
| `Npm`        | 6.14.15  |

### 2.项目初始化:rocket:：

使用该脚手架创建自己的练习项目

```shell
npm install -g @vue/cli@4.5.13  `---最后一个与vue2.5.14匹配的cli`
vue create Pc
```

除此之外以下列出的库是最基本的依赖不可缺失：

```
npm install element-ui@^2.12.0
npm install vue-router@^3.0.1
npm install js-cookie@^2.2.0 
npm install axios@^0.18.0 
npm install vuex@^3.1.0
npm install es6-promise@^4.2.5
```

### 3.我擅自手动更新了core-js:rotating_light:：​

因为有报错，必须更新：

```
 npm install core-js@3
```

同时你需要替换`babel.config.js`：

```
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3
      }
    ]
  ]
};

```

### 4.关于路由:truck:：​

以下是可能需要自己添加的路由：

```js
import orderDetail from '../views/orderDetail/index.vue'//1.订单详情
import productDetail from '../views/productDetail/index.vue'//2.商品详情
import placeOrder from '../views/placeOrder/placeOrder.vue'//3.下单

// 自己添加的路由
// 1.订单详情
{
    path: '/orderDetail',
    name: 'orderDetail',
    component: orderDetail,
    meta: {
        logoText: '',
        searchVisible: true
    }

},
// 2.商品详情
{
    path: '/productDetail',
    name: 'productDetail',
    component: productDetail,
    meta: {
        logoText: '',
        searchVisible: true
    }
},
// 3.下单
{
    path: '/placeOrder',
    name: 'placeOrder',
    component: placeOrder,
    meta: {
        logoText: '',
        searchVisible: true
    }
},
```

### 5.关于API:alien:：

以下是可能需要自己添加的API：

```js
  //myOrder.vue(订单模块)
  getOrderList: `${BASEURL}/order/list`, // 查询订单列表
  payOrder: `${BASEURL}/order/pay`, // 订单支付
  cancelOrder: `${BASEURL}/order/cancel`, // 取消订单
  deleteOrder: `${BASEURL}/order/del`, // 删除订单
  confirm: `${BASEURL}/order/take`, // 确认收货
  getTrolleyList: `${BASEURL}/cart/list`,// 购物车查询
  
  // signingAddress.vue(地址模块)
  getaddressList: `${BASEURL}/city_list`,//获取城市列表
  addressList: `${BASEURL}/address/list`, // 收货地址管理查询
  changeAddress: `${BASEURL}/receive/getById`, // 修改收货地址查询
  delAddress: `${BASEURL}/address/del`, // 删除收货地址
  editAddress: `${BASEURL}/address/edit`, // 编辑收货地址
  selectAddress: `${BASEURL}/receive/getSelect`, // 选择收货地址查询
  
  // productDetail.vue(商品详情模块)
  getEvaluateData: `${BASEURL}/reply/config/`, // 获取商品评价数据
  getEvaluateList: `${BASEURL}/reply/list/`, // 获取商品评价列表
  getProducts: `${BASEURL}/products`, // 查询商品
  getProDetail: `${BASEURL}/product/detail/`, // 商品详情
  addCart: `${BASEURL}/cart/add`, // 加入购物车
  collect: `${BASEURL}/collect/add`, // 收藏商品
  getIndexLike: `${BASEURL}/index/like`, // 获取首页猜你喜欢
  
  // 订单详情模块(orderDetail.vue)
  getUser: `${BASEURL}/userinfo`, // 个人信息查询
  getOrderDetail: `${BASEURL}/order/detail/`, // 查询订单详情
      
  // 支付页面(placeOrder.vue)
  orderSubmit: `${BASEURL}/order/create/`, // 订单创建
  orderComputed: `${BASEURL}/order/computed/`, // 计算订单金额
  orderConfirm: `${BASEURL}/order/confirm`, // 获取订单信息
```

### 6.关于代码的疑惑:boom:：​

####  1.`productDetail.vue`:hammer:：

##### 1.1 数据结构问题:card_file_box: :

该页面中的加入购物车逻辑中，`skuList`感觉是他写错了，应该是对象他可能写成了数组,暂时不知道，比赛再看，我的练习暂时使用对象代替：

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

##### 1.2 样式问题：

该页面的整体样式都要做一下微调，笔记本上看是刚好的，在副屏上看就分布不是太均匀了，可以考虑调整一下布局，让其更加美观

##### 1.3 路由问题：

当我点击商品详情页面的猜你喜欢的时候，别人写的源码是拿到点击的商品ID `push` 到当前页面，也就是我们需要做一次强刷，主办方给的部分源码中在`App.vue`中对`reload`方法做了提供，我们只在需要使用的页面中做一下 `inject: ['reload']` 就能直接通过 `this.reload`直接使用！

但是，我的项目在跳转路由的时候会提示`xxxcatch`，好像是我没有捕获该次跳转路由的失败情况，暂时我解决不掉，比赛肯定不会跳转路由报错，所以这里给出三种解决方案：

######  方案一 :clown_face:：

子组件push路由携带id 父组件强行刷新页面(我的项目不好使)

父组件：

```js
reloadDetail() {
      this.$router.go(0)
      this.reload()
}
```

子组件：

```js
goToProDetail(item) {
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
```

###### 方案二 :wastebasket: ：

子组件 *emit*  id,父组件监听获取, 然后手动获取数据  (缺点:路由没有更新后果未知)

父组件 ：

```js
reloadDetail(GuessData) {
    this.currentPro = GuessData
    console.log("newId", this.currentPro)
    // 发请求获取数据
    this.getProductInfo()
    this.getLikeProduct()
}
```

子组件：

```js
goToProDetail(item) {
  let data = {
    productId: item.id
  }
  this.$emit('reloadDetail', data)
}
```

###### 方案三 :bulb:：

子组件不仅更新路由,且emit 新 id 到父组件 

父组件：

```js
reloadDetail(GuessData) {
    this.currentPro = GuessData
    console.log("newId", this.currentPro)
    // 发请求获取数据
    this.getProductInfo()
    this.getLikeProduct()
}
```

子组件：

```js
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

#### 2.`placeOrder.vue`:hammer: :

##### 2.1数据结构问题:card_file_box: :

该页面中的`orderInfo`给的是数组结构，我感觉是对象，这里我做了改动，一切已实际比赛为准!





