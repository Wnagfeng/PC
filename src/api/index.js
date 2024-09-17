// 导入api接口模块
import home from './home'

// 获取当前环境变量 true => 生产环境 false => 开发环境
const BASEURL = '/api'
const IMGBASEURL = '/api'
export const api = {
  // 登录模块
  ...home(BASEURL),
  BASEURL: IMGBASEURL,
  vCode: `${BASEURL}/register/verify`,
  login: `${BASEURL}/login`,
  register: `${BASEURL}/register`,
  // 首页模块
  getIndexBanner: `${BASEURL}/index/banner`, // 获取首页轮播图
  getIndexBast: `${BASEURL}/index/bastList`, // 获取首页精品推荐
  // 分类模块
  getCategory: `${BASEURL}/category`, // 获取全部分类

  // 个人信息模块
  getUser: `${BASEURL}/userinfo`, // 个人信息查询
  uptPassword: `${BASEURL}/user/password`, // 修改密码
  uptUserInfo: `${BASEURL}/user/edit`,// 修改个人信息
  mydata: `${BASEURL}/mydata`,

  // 添加的接口

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

  // 订单评价模块(evaluate.vue)
  upload: `${BASEURL}/uploads`,  // 图片上传
  orderComment: `${BASEURL}/order/comment`, // 订单评价

  // 支付页面(placeOrder.vue)
  orderSubmit: `${BASEURL}/order/create/`, // 订单创建
  orderComputed: `${BASEURL}/order/computed/`, // 计算订单金额
  orderConfirm: `${BASEURL}/order/confirm`, // 获取订单信息

  // 我的收藏(favorites.vue)
  getAllProduct: `${BASEURL}/collect/user`, // 获取收藏列表或者足迹列表 Type区分
  unfavorite: `${BASEURL}/collect/del`, // 取消收藏
  unfavorites: `${BASEURL}/collect/dels/`, // 收藏和足迹的批量取消

}
export default api
