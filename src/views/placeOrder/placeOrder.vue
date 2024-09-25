<template>
    <div class="placeOrder warp">
        <div class="poAddressBox">
            <div class="poTitle">请选择收货地址</div>
            <div class="noAddress" v-if="addressData.length === 0" @click="addAddr">
                <div class="noAddressBox">
                    <span class="iconfont">&#xe6d4;</span>
                    <span>新增收货地址</span>
                </div>
            </div>
            <div class="poAddressList" v-if="addressData.length !== 0">
                <div class="poAddListTit">
                    <span>收件人信息</span>
                    <span @click="addAddr">新增地址</span>
                </div>
                <div class="poAddListBox">
                    <div class="showMoreBox" :class="{ showMoreAdd: showMoreAddress }">
                        <div class="addressItem" :class="{ addressActive: currentAddressId === item.id }"
                            @click="selectAddress(item)" v-for="(item, index) of addressData" :key="index">
                            <span class="userName">{{ item.realName }}<i v-if="currentAddressId === item.id"
                                    class="iconfont">&#xe612;</i></span>
                            <span class="addressInfo">{{ item.province + item.city + item.district }} {{ item.detail
                                }}</span>
                            <span class="phone">{{ item.phone }}</span>
                        </div>
                    </div>
                    <div class="openMore iconfont" @click="openMoreAdd"
                        v-html="showMoreAddress ? '收起地址&#xe660;' : '展开更多&#xe695;'"></div>
                </div>
            </div>
            <div class="poTitle">请确认订单信息</div>
            <div class="orderList">
                <div class="orderInfoTit">
                    <span>商品</span>
                    <span>商品属性</span>
                    <span>单价</span>
                    <span>数量</span>
                    <span>小计</span>
                </div>
            </div>
            <shop-order ref="shopOrder" :type="state" :shopsData="orderInfo.cartInfo"></shop-order>
        </div>
        <div class="remarksBox">
            <div class="remarksInfo">
                <el-input type="textarea" :rows="2" resize="none" placeholder="如有其他要求，请备注。" v-model="remarksInfo">
                </el-input>
            </div>
        </div>
        <div class="couponList">
            <div class="payTit">选择支付方式</div>
            <div class="payList">
                <span class="payActive">
                    <i class="iconfont">&#xe616;</i>
                    <b class="iconfont">&#xe612;</b>
                    钱包支付
                </span>
            </div>
        </div>
        <div class="placeOrderBtn">
            <span>运费：{{ orderComputedInfo.payPostage > 0 ? '+¥' + orderComputedInfo.payPostage : '免邮费' }}</span>
            <span>需付款：<b>￥{{ orderComputedInfo.payPrice ? orderComputedInfo.payPrice : 0 }}</b></span>
            <el-button @click="orderSubmit" type="primary" v-throttle>提交订单</el-button>
        </div>
        <el-dialog :visible.sync="showDialog" width="570px" title="新增收货地址" center>
            <address-edit @hideAddDialog="edit" @cancelAdd="() => showDialog = false"></address-edit>
        </el-dialog>
    </div>
</template>

<script>
import AddressEdit from '../../components/AddressEdit.vue';
import shopOrder from "../../components/shopOrder.vue"
import api from '@/api'
import { listSearchMixin } from '@/config/mixin'
import { mapMutations } from 'vuex'
export default {
    name: 'placeOrder',
    mixins: [listSearchMixin],
    components: {
        shopOrder, AddressEdit
    },
    data() {
        return {
            cartId: '',
            addressData: [
                {
                    id: '1',
                    realName: "CoderJoon",
                    phone: "13344556677",
                    province: "北京市",
                    city: "北京市",
                    district: " 东城区",
                    detail: "中关村",
                    isDefault: 0
                },
                {
                    id: '2',
                    realName: "CoderJoon",
                    phone: "13344556677",
                    province: "北京市",
                    city: "北京市",
                    district: " 东城区",
                    detail: "中关村",
                    isDefault: 0
                }
            ],//地址信息
            // OrderInfo 可能为数组，可能为对象 这里先用对象代替
            // orderInfo: [],
            orderInfo: {
                orderKey: "12379",
                cartInfo: [
                    {

                        productInfo: {

                            image: "https://bpic.588ku.com/element_origin_min_pic/23/04/25/2a96cb3b448e184dd2f85772b8389bd9.jpg",

                            storeName: "苹果11ProMax",

                            attrInfo: {

                                sku: "4+64,黑色",

                                price: "899"

                            }

                        },

                        cartNum: "1",

                    }
                ]
            },
            showMoreAddress: false,
            currentAddressId: '', // 选中地址id
            remarksInfo: '', // 备注
            orderComputedInfo: {
                payPrice: 999,
            }, // 订单金额
            chatTimer: '',
            state: 0,
            showDialog: false
        }
    },
    created() {
        if (this.$route.query.cartId) {
            this.cartId = this.$route.query.cartId
        }
    },
    mounted() {
        // 获取地址列表
        this.getAddressList()
        // 获取订单确认信息
        this.getOrderInfo()
    },
    computed: {
    },
    destroyed() {
        clearInterval(this.chatTimer)
    },
    methods: {
        ...mapMutations({
            setCartNumber: 'SET_CARTNUMBER', // 购物车数量
            setShoppingCart: 'SET_SHOPPINGCART', // 购物车
            setNewAddress: 'SET_NEWADDRESS'
        }),
        addAddr() {
            this.setNewAddress({
                "id": '',
                "realName": "",
                "phone": "",
                "province": "",
                "city": "",
                "district": "",
                "detail": "",
                "isDefault": 0
            })
            this.showDialog = true
        },
        edit(item) {
            let data = {
                id: item.id,
                real_name: item.realName,
                phone: item.phone,
                detail: item.detail,
                is_default: item.isDefault === 1,
                address: {
                    city: item.city,
                    district: item.district,
                    province: item.province,
                }
            }
            let param = {
                url: this.api.editAddress,
                data,
                method: "POST"
            }
            this.$sendReq(param, res => {
                if (res.status == 200) {
                    this.$message({
                        message: "添加成功",
                        type: 'success'
                    })
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                }
                this.showDialog = false
                this.getAddressList()

            })
        },
        // 获取收货地址
        getAddressList() {
            let self = this
            let params = {
                url: api.addressList,
                method: 'GET',
                payload: {
                    page: 1,
                    limit: 100
                }
            }
            self.sendReq(params, (res) => {
                console.log("地址列表", res)
                if (res.status === 200) {
                    self.addressData = res.data
                } else {
                    self.$message.warning(res.msg)
                }
            })
        },
        // 获取订单信息
        getOrderInfo() {
            let self = this
            let params = {
                url: api.orderConfirm,
                method: 'POST',
                data: {
                    cartId: this.cartId
                }
            }
            self.sendReq(params, (res) => {
                console.log("订单信息", res)
                if (res.status === 200) {
                    self.orderInfo = res.data
                    if (self.orderInfo.addressInfo) {
                        self.currentAddressId = self.orderInfo.addressInfo.id
                    }
                    this.orderComputed()
                } else {
                    self.$message.warning(res.msg)
                }
            })
        },
        // 计算订单金额
        orderComputed() {
            let self = this
            let params = {
                url: api.orderComputed + self.orderInfo.orderKey,
                method: 'POST',
                data: {
                    addressId: this.currentAddressId,
                    payType: 'yue',
                    shipping_type: 1
                }
            }
            self.sendReq(params, (res) => {
                console.log("订单金额", res)
                if (res.status === 200) {
                    self.orderComputedInfo = res.data.result
                } else {
                    self.$message.warning(res.msg)
                }
            })
        },
        // 选择地址
        selectAddress(item) {
            this.currentAddressId = item.id
        },
        // 展开更多地址
        openMoreAdd() {
            this.showMoreAddress = !this.showMoreAddress
        },
        // 提交订单
        orderSubmit() {
            let self = this
            let subData = {
                addressId: self.currentAddressId,
                couponId: 0,
                from: 'h5',
                mark: self.remarksInfo,
                payType: 'yue',
                shippingType: 1,
                pinkId: 0
            }
            let params = {
                url: api.orderSubmit + self.orderInfo.orderKey,
                method: 'POST',
                data: subData
            }
            clearInterval(self.chatTimer)
            self.sendReq(params, (res) => {
                console.log("提交订单", res)
                if (res.status === 200) {
                    self.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    self.getTrolleyList()
                    self.chatTimer = setInterval(() => {
                        self.$router.push({ path: '/myOrder' })
                    }, 2000)
                } else if (res.msg === '余额不足') {
                    self.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                    self.chatTimer = setInterval(() => {
                        self.$router.push({ path: '/myOrder' })
                    }, 2000)
                } else {
                    self.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
        },
        // 获取购物车列表
        async getTrolleyList() {
            const vm = this
            const params = {
                url: api.getTrolleyList,
                method: 'GET'
            }
            vm.sendReq(params, res => {
                console.log("购物车列表", res)
                const d = res.data.valid
                this.setShoppingCart(d)
                this.setCartNumber(d.length)
            })
        }
    },

    watch: {
        // 地址变化
        currentAddressId(e) {
            this.orderComputed()
        }
    }
}
</script>

<style lang="scss" scoped>
.placeOrder {
    margin: 20px auto;

    .poTitle {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
    }

    .poAddressList {
        width: 100%;
        border: 1px solid #F5F5F5;
        padding: 20px;
        margin-bottom: 30px;
        box-sizing: border-box;

        .poAddListTit {
            display: flex;
            justify-content: space-between;

            span:nth-child(1) {
                color: #333333;
                font-size: 16px;
            }

            span:nth-child(2) {
                color: #2D51B3;
                font-size: 14px;
                cursor: pointer;
            }
        }

        .poAddListBox {
            width: 100%;
            margin: 20px 50px 0 50px;

            .showMoreBox {
                height: 45px;
                overflow: hidden;
            }

            .showMoreAdd {
                height: auto;
            }

            .addressItem {
                display: flex;
                align-items: center;
                margin-bottom: 14px;

                span {
                    color: #666666;
                    font-size: 14px;
                }

                span:nth-child(1) {
                    width: 147px;
                    height: 31px;
                    line-height: 31px;
                    text-align: center;
                    border: 1px solid #CCCCCC;
                    border-radius: 2px;
                    margin-right: 15px;
                    cursor: pointer;
                    position: relative;

                    i {
                        font-size: 16px;
                        height: 16px;
                        line-height: 16px;
                        position: absolute;
                        right: -1px;
                        bottom: 0;
                        color: #FF7800;
                    }
                }

                span:nth-child(2) {
                    margin-right: 20px;
                }
            }

            .openMore {
                font-size: 12px;
                color: #666666;
                cursor: pointer;
            }

            .currentAddress {
                span:nth-child(1) {
                    border-color: #FF7800;
                }
            }

            .addressActive {
                span:nth-child(1) {
                    border-color: #FF7800;
                }
            }

            .showMoreAdd {
                height: auto;
            }
        }
    }

    >>>.el-dialog {
        .el-dialog__body {
            background: #F8F8F8;
        }

        .el-dialog__header {
            text-align: center;
        }

        .el-dialog__footer {
            text-align: center;

            .dialog-footer {
                text-align: center;

                button {
                    height: 45px;
                    width: 160px;
                }
            }
        }
    }

    .poAddressBox {
        .noAddress {
            width: 300px;
            height: 166px;
            display: flex;
            align-items: center;
            text-align: center;
            border: 2px solid #DDDDDD;
            border-radius: 4px;
            margin-top: 40px;
            justify-content: center;
            cursor: pointer;
            margin-bottom: 70px;

            span {
                font-size: 16px;
                color: #666666;
                display: block;
            }

            span:nth-child(1) {
                font-size: 26px;
                margin-bottom: 18px;
            }
        }
    }

    .orderList {
        background: #FCFCFC;
        border: 1px solid #E5E5E5;
        margin-bottom: 25px;

        .orderInfoTit {
            width: 100%;
            display: flex;
            height: 44px;
            line-height: 44px;
            color: #333333;
            font-size: 14px;
            font-weight: 400;
        }

        span {
            text-align: center;
        }

        span:nth-child(1) {
            width: 40%;
            text-align: left;
            padding-left: 125px;
            box-sizing: border-box;
        }

        span:nth-child(2) {
            width: 20%;
            text-align: center;
        }

        span:nth-child(3) {
            width: 15%;
        }

        span:nth-child(4) {
            width: 15%;
        }

        span:nth-child(5) {
            width: 10%;
        }

        span:nth-child(6) {
            width: 10%;
        }
    }

    .placeOrderBtn {
        margin-top: 50px;
        width: 100%;
        background: #F7F7F7;
        padding: 30px;
        box-sizing: border-box;
        text-align: right;

        span {
            display: block;
            margin-bottom: 20px;
            font-size: 14px;
            color: #333333;
        }

        span:nth-child(3) {
            font-size: 18px;

            b {
                color: #FF7800;
            }
        }
    }

    .payList {
        display: flex;
        margin: 20px 0 0 50px;

        span {
            color: #666666;
            font-size: 16px;
            font-weight: 400;
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;

            i {
                font-size: 26px;
                margin-right: 5px;
            }

            b {
                color: #FF7800;
                position: absolute;
                right: -1px;
                bottom: -1px;
                display: none;
            }
        }

        .payActive {
            border: 1px solid #FF7800;

            b {
                display: block;
            }
        }

        span {
            border: 1px solid #E5E5E5;
            padding: 5px 10px;
            margin-right: 15px;
        }

        span:nth-child(1) {
            i:nth-child(1) {
                color: #40ba49;
                cursor: pointer;
            }
        }

        span:nth-child(2) {
            i {
                color: #40ba49;
            }
        }
    }

    .remarksBox {
        display: flex;
        background: #F7F7F7;
        padding: 25px;
        border-radius: 8px;
        margin-bottom: 30px;

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
}
</style>