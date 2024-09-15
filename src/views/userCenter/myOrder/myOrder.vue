<template>
    <div class="myOrder">
        <div class="top">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="待付款" name="first">
                    <div class="sub-main" v-loading="loading">
                        <OrderList :flag="flag" :orderList="orderList" :total="total" :page="page" @isCancel="isCancel"
                            @isConfirm="isConfirm" @handleCurrentChange="handleCurrentChange" @payOrder="payOrder"
                            @HandelOrderDelete="isDelete">
                        </OrderList>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="待发货" name="second">
                    <div class="sub-main" v-loading="loading">
                        <OrderList :flag="flag" :orderList="orderList" :total="total" :page="page" @isCancel="isCancel"
                            @isConfirm="isConfirm" @handleCurrentChange="handleCurrentChange"></OrderList>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="待收货" name="third">
                    <div class="sub-main" v-loading="loading">
                        <OrderList :flag="flag" :orderList="orderList" :total="total" :page="page" @isCancel="isCancel"
                            @isConfirm="isConfirm" @handleCurrentChange="handleCurrentChange"></OrderList>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="待评价" name="fourth">
                    <div class="sub-main" v-loading="loading">
                        <OrderList :flag="flag" :orderList="orderList" :total="total" :page="page" @isCancel="isCancel"
                            @isConfirm="isConfirm" @handleCurrentChange="handleCurrentChange"></OrderList>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已完成" name="fiveth">
                    <div class="sub-main" v-loading="loading">
                        <OrderList :flag="flag" :orderList="orderList" :total="total" :page="page" @isCancel="isCancel"
                            @isConfirm="isConfirm" @handleCurrentChange="handleCurrentChange">
                        </OrderList>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-dialog class="cancelOrder" :visible.sync="cancelOrderShow" close-on-click-modal
                :before-close="handleClose1" width="50%" title="是否取消该订单" center>
                <div>
                    <p>您确定要取消该订单吗？取消订单后，不能恢复。</p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="leftBtn" @click="cancelOrder" v-throttle>确定</el-button>
                    <el-button class="rightBtn" @click="handleClose1">取消</el-button>
                </span>
            </el-dialog>
            <el-dialog class="cancelOrder" :visible.sync="deleteOrderShow" close-on-click-modal
                :before-close="handleClose3" width="50%" title="是否删除该订单" center>
                <div>
                    <p>您确定要删除该订单吗？删除订单后，不能恢复。</p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="leftBtn" @click="deleteOrder" v-throttle>确定</el-button>
                    <el-button class="rightBtn" @click="handleClose3">取消</el-button>
                </span>
            </el-dialog>
            <el-dialog class="confirm" :visible.sync="confirmShow" close-on-click-modal :before-close="handleClose2"
                width="50%" title="是否确认收货" center>
                <div>
                    <p>为了保证您的售后权益，请收到商品检查无误后再确认收货</p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="leftBtn" @click="confirm" v-throttle>确定</el-button>
                    <el-button class="rightBtn" @click="handleClose2">取消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
/*
0——待付款
1——待发货
2——待收货
3——待评价
4——已完成
 */
import { mapMutations } from 'vuex'
import api from '../../../api'
import { listSearchMixin } from '../../../config/mixin'
import OrderList from '../../../components/base/orderList.vue'
export default {
    mixins: [listSearchMixin],
    components: {
        OrderList
    },
    name: 'myOrder',
    data() {
        return {
            // 测试数据
            orderList: [
                {
                    unique: "123",
                    createTime: "2023-12-1",
                    orderId: "1",
                    realName: "CoderJoon",
                    totalPrice: "899",
                    statusDto: {
                        type: 0
                    },
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
                }
            ],
            page: 1,
            activeName: 'first',
            state: '',
            cancelOrderShow: false,
            cancelId: null,
            deleteId: null,
            deleteOrderShow: false,
            confirmId: null,
            confirmShow: false,
            checked: false,
            total: 0,
            flag: true,
            loading: false
        }
    },
    mounted() {
        this.getOrderList()
        this.getTrolleyList()
    },
    methods: {
        ...mapMutations({
            setCartNumber: 'SET_CARTNUMBER',
            setShoppingCart: 'SET_SHOPPINGCART'
        }),
        // 1.获取订单列表
        getOrderList() {
            console.log("1.点击了获取订单列表")
            let self = this
            // self.loading = true
            let params = {
                url: api.getOrderList + `?type=${self.state}&page=${self.page}&limit=5`,
                method: 'GET',
                data: {
                }
            }
            self.sendReq(params, (res) => {
                if (res.status === 200) {
                    self.orderList = res.data.content
                    self.total = res.data.totalElements
                    if (self.orderList.length) {
                        this.flag = true
                    } else {
                        this.flag = false
                    }
                    self.loading = false
                } else {
                    self.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
        },
        // 2.支付订单
        payOrder(id) {
            console.log("2.支付订单")
            let self = this
            let params = {
                url: api.payOrder,
                method: 'POST',
                data: {
                    from: 'h5',
                    paytype: 'yue',
                    uni: id
                }
            }
            self.sendReq(params, (res) => {
                if (res.status === 200) {
                    self.getOrderList()
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
        },
        // 3.取消订单
        cancelOrder() {
            console.log("3.取消订单")
            let self = this
            let params = {
                url: api.cancelOrder,
                method: 'POST',
                data: {
                    id: self.cancelId
                }
            }
            self.sendReq(params, (res) => {
                if (res.status === 200) {
                    self.$message({
                        message: '订单取消成功',
                        type: 'success'
                    })
                    self.cancelOrderShow = false
                    self.getOrderList()
                } else {
                    self.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
        },
        // 4.删除订单
        deleteOrder() {
            console.log("4.删除订单")
            let self = this
            let params = {
                url: api.deleteOrder,
                method: 'POST',
                data: {
                    uni: self.deleteId
                }
            }
            self.sendReq(params, (res) => {
                if (res.status === 200) {
                    self.$message({
                        message: '订单删除成功',
                        type: 'success'
                    })
                    self.deleteOrderShow = false
                    self.getOrderList()
                } else {
                    self.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
        },
        // 5.确认收货
        confirm() {
            console.log("5.确认收货")
            let self = this
            let params = {
                url: api.confirm,
                method: 'POST',
                data: {
                    uni: self.confirmId
                }
            }
            self.sendReq(params, (res) => {
                if (res.status === 200) {
                    self.$message({
                        message: '确认收货成功',
                        type: 'success'
                    })
                    self.confirmShow = false
                    self.getOrderList()
                } else {
                    self.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
        },
        // 删除订单
        HandelisDelete() {
            console.log("myOrder")
        },
        // 打开确认收货弹窗
        isConfirm(id) {
            this.confirmId = id
            this.confirmShow = true
        },
        // 切换订单列表
        handleClick(event) {
            console.log("点击切换订单列表了：", event)
            this.state = event.index
            this.page = 1
            this.getOrderList()
        },
        // 打开取消订单弹窗
        isCancel(id) {
            this.cancelOrderShow = true
            this.cancelId = id
        },
        // 关闭取消订单弹窗
        handleClose1() {
            this.cancelOrderShow = false
            this.cancelId = null
        },
        // 打开删除订单弹窗
        isDelete(id) {
            console.log("点击删除订单", id)
            this.deleteOrderShow = true
            this.deleteId = id

        },
        // 关闭删除订单弹窗
        handleClose3() {
            this.deleteOrderShow = false
            this.deleteId = null
        },
        // 关闭确认收货弹窗
        handleClose2() {
            this.confirmShow = false
            this.confirmId = null
        },
        // 分页器跳转
        handleCurrentChange(val) {
            this.page = val
            console.log("点击了分页器", val)
            this.getOrderList()
        },
        // 购物车列表
        async getTrolleyList() {
            const vm = this
            const params = {
                url: api.getTrolleyList,
                method: 'GET'
            }
            vm.sendReq(params, res => {
                const d = res.data.valid
                this.setShoppingCart(d)
                this.setCartNumber(d.length)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.myOrder {
    width: 100%;

    .top {
        width: 100%;
        font-size: 14px;
        box-sizing: border-box;
        position: relative;

        // 部分替换为less语法
        >>>.el-tabs {
            .el-tabs__header {
                border: 1px solid #E5E5E5;
                margin-bottom: 30px;
                height: 56px;
            }

            .el-tabs__nav {
                margin-left: 20px;
                height: 56px;
            }

            .el-tabs__item {
                height: 56px;
                line-height: 56px;
            }

            .el-tabs__nav-wrap::after {
                height: 0;
            }
        }


        >>>.search {
            font-size: 12px;
            margin-right: 20px;
            display: flex;
            position: absolute;
            height: 56px;
            display: flex;
            align-items: center;
            top: 0;
            right: 0;

            .el-input {
                flex: 3;
                border-radius: 0;

                .el-input__inner {
                    border-radius: 0;
                }

                .el-input-group__append {
                    border-radius: 0;
                    border-left: 0;

                    .el-button {
                        border-left: 0;
                    }
                }
            }

            .el-select {
                flex: 1;
                border-radius: 0;
                height: 40px;
            }
        }

    }

    // 部分替换为less语法

    >>>.cancelOrder,
    .confirm {
        .el-dialog__body {
            display: flex;
            justify-content: center;

            div {
                text-align: center;

                p {
                    font-size: 16px;
                }
            }
        }

        .el-dialog__footer {
            .leftBtn {
                background-color: #FF7800;
                border: 1px solid #FF7800;
                color: #FFFFFF;
                border-radius: 0;
            }

            .rightBtn {
                color: #FF7800;
                border: 1px solid #FF7800;
                background-color: #FFFFFF;
                box-sizing: border-box;
                border-radius: 0;
            }
        }
    }


    // 部分替换为less语法

    >>>.refund {
        .el-dialog__body {
            display: flex;
            justify-content: center;
            background-color: #F8F8F8;
            padding: 20px 75px;
            box-sizing: border-box;

            .box {
                display: flex;
                flex-wrap: wrap;
                overflow-x: auto;
                height: 350px;
                width: 100%;
                text-align: center;
            }

            .el-checkbox {
                display: flex;
                align-items: center;
            }

            .el-checkbox__input {
                line-height: 18px;
            }

            .el-checkbox__label {
                font-size: 18px;
            }

            .back {
                width: 208px;
                padding: 10px 20px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                text-align: center;
                flex-direction: column;
                background-color: #FFFFFF;
                margin: 0 20px 20px 0;
                border: 1px solid transparent;
                position: relative;

                img {
                    width: 171px;
                    height: 171px;
                }

                .choice {
                    width: 30px;
                    height: 30px;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    display: none;
                }
            }

            .back:nth-of-type(3n) {
                margin-right: 0;
            }

            .backActive {
                border: 1px solid #FF7800;

                .choice {
                    display: block;
                }
            }
        }

        .el-dialog__footer {
            .leftBtn {
                background-color: #FF7800;
                border: 1px solid #FF7800;
                color: #FFFFFF;
                border-radius: 0;
            }

            .rightBtn {
                color: #FF7800;
                border: 1px solid #FF7800;
                background-color: #FFFFFF;
                box-sizing: border-box;
                border-radius: 0;
            }
        }
    }

}

.sub-main {
    min-height: 400px;
}
</style>