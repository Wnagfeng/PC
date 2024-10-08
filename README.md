# PC端练习指南:memo:：

```js
Write By CoderJoon
Time: 2024-09-13 —— 2024-09-19
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

你除了需要准备以上环境以外，建议在开始练习以前还需要去先去看看 文件上传和图片的展示，不是普通的展示图片。

后端：

https://github.com/Wnagfeng/StaticexampleBack

前端：

https://github.com/Wnagfeng/staticExample



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
      
  // 我的收藏(favorites.vue)
  getAllProduct: `${BASEURL}/collect/user`, // 获取收藏列表或者足迹列表 Type区分
  unfavorite: `${BASEURL}/collect/del`, // 取消收藏
  unfavorites: `${BASEURL}/collect/dels/`, // 收藏和足迹的批量取消
      
  // 钱包重置(recharge.vue)
  getRecharge: `${BASEURL}/recharge/index`, // 获取充值方案
  setRecharge: `${BASEURL}/recharge/test`, // 充值
```

### 6.关于代码的疑惑:boom:：​

####  6.1.`productDetail.vue`:hammer:：

##### 6.1.1 数据结构问题:card_file_box: :

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

##### 6.1.2 样式问题：

该页面的整体样式都要做一下微调，笔记本上看是刚好的，在副屏上看就分布不是太均匀了，可以考虑调整一下布局，让其更加美观

##### 6.1.3 路由问题：

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

#### 6.2.`placeOrder.vue`:hammer: :

##### 6.2.1数据结构问题:card_file_box: :

该页面中的`orderInfo`给的是数组结构，我感觉是对象，这里我做了改动，一切已实际比赛为准

### 7.关于请求 :construction_worker:：

在本地测试环境中，如果你想联合后端测试，接口能否跑通，或者想练练接口的Crud，建议关闭 `withCredentials: true`

我在测试阶段就是这个东西一打开就是跨域问题 关闭就好了,sb主办方给的请求 用的cookie验证方式 我本地用的是token！建议先关闭再练习！

### 8.练习题汇总:ambulance:：

* ①：PC商城实现订单查看 :white_check_mark:
* ②：PC商城首页实现商品分类和分类列表展示功能 :white_check_mark:
* ③：PC商城实现商品详情 :white_check_mark:
* ④：PC商城实现商品收藏 :white_check_mark:
* ⑤：PC商城实现订单评论 :white_check_mark:
* ⑥：PC商城实现地址管理 :white_check_mark:

### 9.关于订单详情页面:package:：

我的订单页面和订单详情页面，无疑是最复杂的页面，由于没有写后端，所以关于不同的订单状态只能通过写死来控制

#### 9.1订单状态详情:label:：

```shell
0——待付款
1——待发货
2——待收货
3——待评价
4——已完成
```

#### 9.2订单状态页面的思路:label:

首页整个myOrder.vue负责整个我的订单列表的展示

OrderList.vue组件负责展示各种不同的订单分为0-4四种状态，其实就是 status和operate 中用了v-if去控制不同的订单状态去展示。该页面接受props 也就是orderList来展示，所以你如果像看其他的状态直接在myOrder.vue页面中的orderList中的statusDto中的type去修改对应的数字就能看见了。

但是当你修改了myOrder.vue中的type你会发现他改变的只是点订单的状态，点击查看订单详情，还是没有变啊，未鸡毛啊？因为在orderList.vue中你在点击商品详情的时候他会携带当前点击的订单的id去到 `orderDetail` 展示你需要查看的订单的详情数据

```js
// 跳转到订单详情
toOrderDetail(id) {
    this.$router.push({
        path: '/orderDetail',
        query: {
            orderId: id
        }
    })
},
```

以上就是跳转到订单详情页面的函数，我只是携带了当前点击的订单的id去跳转，并没有携带其他的数据！所以就你点击订单详情，只是跳转了，因为没有后端，数据都是写死的，所以你如果想做到不同的订单查看不同的订单详情页面，你还需要去到orderDetail.vue页面去修改statusDto中的type，这样能查看五种订单状态与订单详情了。

你可能会有的疑惑：

问：手动修改，比赛怎么办，岂不是GG了？

答：我只是在这里写死，比赛都有后端，每个页面都有网络请求，都会自动根据不同的订单获取到不同的订单数据，比赛并不需要我们手动修改，这点有点前端经验都知道data都是空的，数据都在后端，Come On ！



总结：
该页面比较特殊，想要查看不同的订单状态与不同的订单详情页面，需要修改两个数据

* 1、myOrder.vue中的statusDto中的type
* 2、orderDetail.vue中的statusDto中的type

