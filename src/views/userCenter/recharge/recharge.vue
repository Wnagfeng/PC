<template>
    <div class="recharge">
        <el-tabs v-model="activeName">
            <el-tab-pane label="充值方案" name="recharge">
                <div class="rechargeList" v-if="rechargeList.length > 0">
                    <div class="clearfix sub-main">
                        <div class="rechargeItem active" v-for="(item, index) in rechargeList" :key="index">
                            <div class="rechargeItemTop">
                                <img src="../../../assets/images/indexLogo.png" alt="">
                                <span><i>￥</i>{{ item.value.give_price }}</span>
                                <span>使用条件：充值￥{{ item.value.price }} 赠送￥{{ item.value.give_price }}</span>
                                <div class="rechargeType">充值</div>
                            </div>
                            <div class="rechargeItemBot" @click="userecharge(item.id)">
                                立即使用
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nothing sub-main" v-else>
                    <img src="../../../static/image/noorder@2x.png" alt="">
                    <p class="fs20 font-color-999">没有充值方案～</p>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import api from '@/api'
import { listSearchMixin } from '@/config/mixin'
export default {
    name: 'recharge',
    mixins: [listSearchMixin],
    data() {
        return {
            activeName: 'recharge',
            rechargeList: [
                {
                    value: {
                        give_price: 100,
                        price: 1000
                    }
                }
            ]
        }
    },
    mounted() {
        this.getRecharge()
    },
    methods: {
        // 充值方案列表
        getRecharge(state) {
            const rLoading = this.openLoading()
            let self = this
            let params = {
                url: api.getRecharge,
                method: 'GET'
            }
            self.sendReq(params, (res) => {
                if (res.status === 200) {
                    self.rechargeList = res.data.recharge_price_ways
                    rLoading.close()
                } else {
                    self.$message.warning(res.msg)
                }
            })
        },
        // 充值
        userecharge(id) {
            const rLoading = this.openLoading()
            let self = this
            let params = {
                url: api.setRecharge,
                method: 'POST',
                data: {
                    rechar_id: id
                }
            }
            self.sendReq(params, (res) => {
                if (res.status === 200) {
                    self.$message.success('充值成功')
                    rLoading.close()
                } else {
                    self.$message.warning(res.msg)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.recharge {
    border: 1px solid #E5E5E5;
    min-height: 500px;

    >>>.el-tabs__nav-scroll {
        padding-left: 30px;

        .el-tabs__nav {
            height: 60px;
            line-height: 60px;
        }
    }

    >>>.el-tabs__content {
        padding: 0 30px;
    }

    .rechargeList {
        margin-bottom: 30px;
        padding: 20px;

        .rechargeItem {
            width: 245px;
            border: 1px solid #EEEEEE;
            border-radius: 18px;
            overflow: hidden;
            margin: 0 100px 50px 0;
            float: left;

            &:nth-child(3n) {
                margin-right: 0;
            }

            .rechargeItemTop {
                background: #d7d7d7;
                color: #ffffff;
                padding: 20px;
                box-sizing: border-box;
                position: relative;

                img {
                    opacity: 0.2;
                    position: absolute;
                    top: 40%;
                }

                .rechargeType {
                    position: absolute;
                    top: 1px;
                    right: -33px;
                    width: 100px;
                    transform: rotate(45deg);
                    background: #FFFFFF;
                    color: #999999;
                    text-align: center;
                    height: 40px;
                    line-height: 50px;
                }

                span {
                    font-size: 14px;
                    display: block;
                    margin-bottom: 18px;
                    cursor: pointer;

                    i {
                        margin-right: 5px;
                        font-style: normal;
                        font-size: 16px;
                    }
                }

                span:nth-child(2) {
                    font-size: 28px;
                }

                span:nth-child(4) {
                    margin-bottom: 0;
                }
            }

            .rechargeItemBot {
                height: 40px;
                line-height: 40px;
                color: #999999;
                position: relative;
                text-align: center;
                background: #FFFFFF;
                cursor: pointer;
            }
        }

        .active {
            .rechargeItemTop {
                background: #fd5b5b;
                color: #ffffff;

                .rechargeType {
                    background: #FFFFFF;
                    color: #fd5b5b;
                }
            }

            .rechargeItemBot {
                background: #f3f3f3;
                color: #333333;
            }
        }
    }
}

.sub-main {
    min-height: 400px;
}

.nothing {
    width: 100%;
    text-align: center;
    min-height: 400px;

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
</style>