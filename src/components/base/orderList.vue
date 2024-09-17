<template>
    <div class="orderList">
        <div class="head">
            <div style="flex:9;padding-left:20px;">
                <span style="flex:5;">宝贝</span>
                <span style="flex:2;">单价</span>
                <span style="flex:2;">数量</span>
            </div>
            <div style="flex:8;padding-right:20px;">
                <span style="flex:1;">收货人</span>
                <span style="flex:1;">实付款</span>
                <span style="flex:1;">状态</span>
                <span style="flex:1;">操作</span>
            </div>
        </div>
        <div v-if="flag">
            <div class="content" v-for="(item, index) in orderList" :key="index">
                <div class="top">
                    <div class="left">
                        <span class="time">{{ item.createTime }}</span>
                        <span class="orderCode">订单号：{{ item.orderId }}</span>
                    </div>
                    <div class="right">
                        <img class="cur-poi" v-if="item.state == 5" src="../../static/image/shanchu@2x.png" alt=""
                            @click="$emit('isDelete', item.orderId)">
                    </div>
                </div>
                <div class="productBox">
                    <div class="product">
                        <div class="left fs13">
                            <div class="box" v-for="(items, indexs) in item.cartInfo" :key="indexs">
                                <div class="desc cur-poi" @click="toProductDetail(items)">
                                    <!-- 替换展示图片 -->
                                    <!-- <img :src="$api.BASEURL + items.productInfo.image" alt=""> -->
                                    <img :src="items.productInfo.image" alt="">
                                    <div>
                                        <p class="name">{{ items.productInfo.storeName }}</p>
                                        <p class="size font-color-999"><span>{{ items.productInfo.attrInfo.sku }}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="price">¥{{ items.productInfo.attrInfo.price }}</div>
                                <div class="num">
                                    <p class="fs14">{{ items.cartNum }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="right" :class="item.cartInfo > 1 ? 'right_line' : ''">
                            <div class="consignee">{{ item.realName }}</div>
                            <div class="actualPay">
                                <div>
                                    <p class="fs13 mar-bot-5">¥{{ item.totalPrice }}</p>
                                    <p class="fs13">免邮费</p>
                                </div>
                            </div>
                            <div class="status">
                                <div>
                                    <p class="fs13 mar-bot-5 font-color-FF7" v-if="item.statusDto.type == 0">待付款</p>
                                    <p class="fs13 mar-bot-5 font-color-FF7" v-if="item.statusDto.type == 1">待发货</p>
                                    <p class="fs13 mar-bot-5 font-color-FF7" v-if="item.statusDto.type == 2">待收货</p>
                                    <p class="fs13 mar-bot-5 font-color-FF7" v-if="item.statusDto.type == 3">待评价</p>
                                    <p class="fs13 mar-bot-5 font-color-71B" v-if="item.statusDto.type == 4">已完成</p>
                                    <p class="fs13 cur-poi" @click="toOrderDetail(item.unique)">订单详情</p>
                                </div>
                            </div>
                            <div class="operate">
                                <div>
                                    <el-button class="handelbtn fs13 mar-bot-5" size="small"
                                        v-if="item.statusDto.type == 0" @click="$emit('payOrder', item.orderId)"
                                        v-throttle>立即支付</el-button>
                                    <el-button class="handelbtn fs13 mar-bot-5" size="small"
                                        v-if="item.statusDto.type == 1" @click="remind(item.orderId)"
                                        v-throttle>提醒发货</el-button>
                                    <el-button class="handelbtn fs13 mar-bot-5" size="small"
                                        v-if="item.statusDto.type == 2" @click="$emit('isConfirm', item.orderId)"
                                        v-throttle>确认收货</el-button>
                                    <p class="handelbtn fs13 tex-und cur-poi" @click="$emit('isCancel', item.orderId)"
                                        v-if="item.statusDto.type == 0" v-throttle>取消订单</p>
                                    <p class="handelbtn fs13 tex-und cur-poi" @click="HandelOrderDelete(item.orderId)"
                                        v-if="item.statusDto.type == 4" v-throttle>删除订单</p>
                                    <p class="handelbtn fs13 tex-und cur-poi" v-if="item.statusDto.type == 3"
                                        @click="toeavluate(item)" v-throttle>评价</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination :current-page="page" :page-size="5" @current-change="handleCurrentChange" background
                layout='prev, pager, next' :total='total'></el-pagination>
        </div>
        <div class="noorder" v-else>
            <img src="../../static/image/noorder@2x.png" alt="">
            <p class="fs20 font-color-999">你还没有订单哦～</p>
            <router-link to="/">
                <el-button>去首页看看</el-button>
            </router-link>
        </div>
    </div>
</template>
<script>
import { listSearchMixin } from '../../config/mixin'
export default {
    props: ['orderList', 'total', 'page', 'flag'],
    mixins: [listSearchMixin],
    data() {
        return {
        }
    },
    methods: {
        // 跳转到商品详情
        toProductDetail(item) {
            let data = {
                productId: item.productId
            }
            this.$router.push({
                path: '/productDetail',
                query: {
                    proData: JSON.stringify(data)
                }
            })
        },
        // 分页器跳转
        handleCurrentChange(val) {
            this.$emit('handleCurrentChange', val)
        },
        // 提醒发货
        remind(id) {
            this.$message({
                message: '已提醒卖家发货',
                type: 'success'
            })
        },
        // 跳转到订单详情
        toOrderDetail(id) {
            this.$router.push({
                path: '/orderDetail',
                query: {
                    orderId: id
                }
            })
        },
        toeavluate(item) {
            this.$router.push({
                name: 'evaluate',
                query: {
                    product: JSON.stringify(item)
                }
            })
            console.log(item)
        },
        // 点击删除订单
        HandelOrderDelete(OrderId) {
            this.$emit("HandelOrderDelete", OrderId)
            console.log("HandelOrderDelete", OrderId)
        }
    },
    mounted() {
        console.log("数据来了", this.$props.orderList)
    }
}
</script>
<style lang="scss" scoped>
.orderList {
    width: 100%;
   

    .handelbtn {
        cursor: pointer;
    }

    .noorder {
        width: 100%;
        text-align: center;
        padding: 100px 0;

        p {
            margin-bottom: 20px;
        }

        .el-button {
            background-color: #FF7800;
            color: #FFFFFF;
            font-weight: normal;
            border-radius: 0;
        }
    }

    .head {
        box-sizing: border-box;
        width: 100%;
        height: 44px;
        background-color: #F1F2F7;
        display: flex;
        align-items: center;
        text-align: center;
        margin-bottom: 20px;

        div {
            display: flex;
        }
    }

    .content {
        width: 100%;
        margin-bottom: 20px;
        border: 1px solid #E5E5E5;
        border-bottom: 0;
        box-sizing: border-box;

        .top {
            width: 100%;
            font-size: 13px;
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #F3F3F3;

            .left {
                flex: 15;

                .time {
                    margin-left: 20px;
                    margin-right: 60px;
                }
            }

            .right {
                flex: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-right: 20px;
            }
        }

        .productBox {
            width: 100%;
            box-sizing: border-box;

            .product {
                width: 100%;
                display: flex;

                .left {
                    flex: 9;

                    .box {
                        padding: 20px 0 20px 20px;
                        display: flex;
                        border-bottom: 1px solid #E5E5E5;

                        .desc {
                            flex: 5;
                            display: flex;

                            img {
                                width: 86px;
                                height: 86px;
                                margin-right: 10px;
                            }

                            div {
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;

                                .name {
                                    font-size: 14px;
                                }

                                .size {
                                    font-size: 13px;

                                    span {
                                        margin-right: 10px;
                                    }

                                    span:last-child {
                                        margin-right: 0;
                                    }
                                }
                            }
                        }

                        .price,
                        .num {
                            flex: 2;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }

                .right {
                    padding: 20px 20px 20px 0;
                    flex: 8;
                    display: flex;
                    border-bottom: 1px solid #E5E5E5;

                    .actualPay,
                    .consignee,
                    .status,
                    .operate {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        div {
                            text-align: center;

                            .el-button {
                                border: 1px solid #FF7800;
                                color: #FF7800;
                                border-radius: 0;
                            }
                        }
                    }
                }

                .right_line {
                    border-left: 1px solid #E5E5E5;
                }
            }
        }
    }

    >>>.el-pagination {
        margin-top: 40px;
        text-align: right;

        .el-pager {
            li:not(.disabled):hover {
                color: #FF7800;
            }

            li:not(.disabled).active {
                background-color: #FF7800;
            }

            li:not(.disabled).active:hover {
                color: #F4F4F5;
            }
        }
    }

    >>>.el-dialog {
        width: 33% !important;

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
}
</style>