<template>
    <div class='search'>
        <div class='content'>
            <div class='head'>
                <div class='all'>全部结果</div>
                <div class='arrow'></div>
                <div class='keyword'>{{ categoryName }}</div>
                <div class='arrow'></div>
            </div>
            <div class='result'>
                <div class='sort'>
                    <div>排序：</div>
                    <div class='default' :class="index == '1' ? 'active' : ''" @click="defaultSort()">默认</div>
                    <div class='price' :class="index == '2' ? 'active' : ''" @click="priceSort()">
                        价格
                        <div class='arr'>
                            <div class='up' :class="priceOrder == 'asc' ? 'low' : ''"></div>
                            <div class='down' :class="priceOrder == 'desc' ? 'high' : ''"></div>
                        </div>
                    </div>
                </div>
                <div class='titleName'>{{ categoryName }}</div>
                <div class="pro" v-if="noProduct == false" v-loading="loading">
                    <ProductList :productList='productList'></ProductList>
                </div>
                <div class="empty" v-if="noProduct == true && network == false">
                    <img src="../../static/image/nosearch@2x.png" alt="">
                    <p class="tip ">搜索不到你要找的宝贝呢换个词试试吧～</p>
                </div>
                <div class="network" v-if="network">
                    <img src="../../static/image/poornetwork@2x.png" alt="">
                    <p class="tip">哎呀，网络开小差了～</p>
                </div>
                <el-pagination v-if="productList.length > 0" :current-page="page" :page-size="12"
                    @current-change="handleCurrentChange" background layout='prev, pager, next' :total='total'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../../api'
import { listSearchMixin } from '../../config/mixin'
import ProductList from '../../components/base/productList'
import { mapGetters } from 'vuex'
// desc 降序 asc 升序 默认为空
export default {
    mixins: [listSearchMixin],
    components: {
        ProductList
    },
    data() {
        return {
            flag: true,
            page: 1,
            sid: '',
            categoryName: '',
            priceOrder: '',
            index: '1',
            productList: [
                {
                    id: 1,
                    storeName: "Phone15",
                    price: 999,
                    otPrice: 888,
                    storeInfo: "苹果15",
                    image: "https://bpic.588ku.com/element_origin_min_pic/23/04/25/2a96cb3b448e184dd2f85772b8389bd9.jpg"
                },
                {
                    id: 1,
                    storeName: "Phone15",
                    price: 999,
                    otPrice: 888,
                    storeInfo: "苹果15",
                    image: "https://bpic.588ku.com/element_origin_min_pic/23/04/25/2a96cb3b448e184dd2f85772b8389bd9.jpg"
                },
                {
                    id: 1,
                    storeName: "Phone15",
                    price: 999,
                    otPrice: 888,
                    storeInfo: "苹果15",
                    image: "https://bpic.588ku.com/element_origin_min_pic/23/04/25/2a96cb3b448e184dd2f85772b8389bd9.jpg"
                },
                {
                    id: 1,
                    storeName: "Phone15",
                    price: 999,
                    otPrice: 888,
                    storeInfo: "苹果15",
                    image: "https://bpic.588ku.com/element_origin_min_pic/23/04/25/2a96cb3b448e184dd2f85772b8389bd9.jpg"
                }
            ],
            total: 0,
            network: false,
            noProduct: false,
            loading: false
        }
    },
    mounted() {
        this.categoryName = this.$route.query.categoryName
        this.sid = this.$route.query.cid
        this.getSearchProducts()
    },
    computed: {
        ...mapGetters([
            'searchObj'
        ])
    },
    methods: {
        // 跳转商品详情
        toProductDetail(id, item) {
            let data = {
                shopId: id,
                productId: item.productId,
                skuId: item.skuId
            }
            this.$router.push({
                path: '/productDetail',
                query: {
                    proData: JSON.stringify(data)
                }
            })
        },
        // 获取搜索商品数据
        getSearchProducts() {
            let self = this
            // 请打开Loading组件
            // self.loading = true
            let params = {
                url: api.getProducts,
                method: 'GET',
                payload: {
                    sid: this.sid,
                    priceOrder: self.priceOrder,
                    page: self.page,
                    limit: '12'
                }
            }
            self.sendReq(params, (res) => {
                if (res.status === 200) {
                    console.log("Category.vue getSearchProducts", res.data)
                    self.productList = res.data.content
                    self.total = res.data.totalElements
                    self.loading = false
                    self.network = false
                    if (res.data.content.length < 1) {
                        self.noProduct = true
                    } else {
                        self.noProduct = false
                    }
                } else {
                    self.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                    self.network = true
                }
            })
        },
        handleCurrentChange(val) {
            this.page = val
            this.getSearchProducts()
        },
        // 默认排序
        defaultSort() {
            this.priceOrder = ''
            this.index = '1'
            this.page = 1
            this.getSearchProducts()
        },
        // 价格排序
        priceSort() {
            if (this.priceOrder !== 'desc') {
                this.priceOrder = 'desc'
            } else {
                this.priceOrder = 'asc'
            }
            this.page = 1
            this.index = '2'
            this.getSearchProducts()
        }
    }
}
</script>
<style lang='scss' scoped>
/deep/.el-pagination {
    // min-width: 150px;
    float: right;
    // padding-bottom: 10px;
    margin-bottom: 30px;
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    // position: relative;
    background-color: #FF7800;
    // right: 0;
}

.search {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    padding-bottom: 143px;
    text-align: center;

    .content {
        width: 1252px;
        height: 100%;
        margin: 0 auto;

        .head {
            width: 100%;
            height: 64px;
            line-height: 64px;
            font-size: 16px;
            display: flex;
            align-items: center;

            .all {
                margin-right: 20px;
            }

            .keyword {
                margin: 0 20px;
                color: #ff7800;
            }

            .arrow {
                background-image: url('../../static/image/xiangyou@2x.png');
                width: 5px;
                height: 10px;
            }
        }

        .result {
            width: 100%;
            background-color: #ffffff;
            padding: 0 45px 49px;
            box-sizing: border-box;
            margin-bottom: 30px;

            .titleName {
                height: 120px;
                width: 100%;
                font-size: 20px;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .sort {
                width: 100%;
                height: 63px;
                line-height: 27px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #f1f1f1;
                color: #666666;
                margin-bottom: 28px;

                .default {
                    margin-left: 20px;
                    cursor: pointer;
                }

                .sales {
                    margin-right: 20px;
                    cursor: pointer;

                    img {
                        width: 9px;
                        height: 16px;
                        vertical-align: middle;
                    }
                }

                .price {
                    display: flex;
                    margin: 0 20px;
                    cursor: pointer;

                    .arr {
                        vertical-align: middle;
                        width: 12px;
                        margin-left: 3px;

                        .up {
                            width: 0;
                            height: 0;
                            border: 6px solid transparent;
                            border-bottom-color: #999999;
                        }

                        .down {
                            width: 0;
                            height: 0;
                            border: 6px solid transparent;
                            border-top-color: #999999;
                            margin-top: 3px;
                        }
                    }
                }

                .active {
                    color: #FF7800;

                    .arr {
                        .high {
                            border-top-color: #FF7800;
                        }

                        .low {
                            border-bottom-color: #FF7800;
                        }
                    }
                }

                .priceBox {
                    display: flex;

                    .min,
                    .max {
                        display: flex;
                        width: 100px;
                        height: 28px;
                        padding: 0 5px;
                        border: 1px solid #ccc;
                        box-sizing: border-box;

                        input {
                            width: 70px;
                            flex: 1;
                            outline: none;
                            border: none;
                        }
                    }

                    .btn {
                        width: 50px;
                        height: 28px;
                        border: 1px solid #ccc;
                        box-sizing: border-box;
                        cursor: pointer;
                        margin: 0 20px;
                    }

                    .clear {
                        cursor: pointer;
                        color: #999999;
                    }
                }
            }

            .empty,
            .network {
                .tips {
                    font-size: 20px;
                    color: #999999;
                }

                width: 100%;
                text-align: center;
                padding: 100px 0;
            }

            .store {
                width: 100%;
                box-sizing: border-box;
                min-height: 400px;

                .storeBox {
                    width: 100%;
                    margin-bottom: 50px;

                    .top {
                        display: flex;

                        .storeImg {
                            width: 80px;
                            height: 80px;
                            margin-right: 30px;
                        }

                        .storeDesc {
                            flex: 1;
                            text-align: left;

                            .storeName {
                                font-size: 20px;
                                margin-bottom: 10px;
                            }

                            .storeSite {
                                font-size: 14px;
                            }
                        }

                        .enter {
                            color: #ff7800;
                            cursor: pointer;
                        }
                    }

                    .content {
                        display: flex;
                        margin-left: 110px;
                        width: 1048px;
                        overflow-y: auto;
                        padding: 20px 10px;
                        box-sizing: border-box;
                        background-color: #f5f5f5;
                        border: 1px solid #e5e5e5;

                        .productBox {
                            cursor: pointer;
                            width: 190px;
                            padding: 10px 15px;
                            margin-right: 20px;
                            box-sizing: border-box;
                            background-color: #ffffff;

                            img {
                                width: 160px;
                                height: 160px;
                            }

                            .productName {
                                font-size: 12px;
                                font-weight: bold;
                                margin: 13px 0;
                            }

                            .price {
                                font-size: 16px;
                                color: #ff7800;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }

        .guessYouLike {
            width: 100%;
            padding: 30px 45px;
            background-color: #ffffff;
            box-sizing: border-box;

            .title {
                text-align: left;
                font-size: 26px;
                margin-bottom: 22px;
            }
        }
    }
}

>>>.el-pagination {
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

.recommendPage {
    padding: 0 56px;
    box-sizing: border-box;
    position: relative;

    .swiper-container {
        position: static;
        width: 100%;

        .swiper-slide {
            width: 100%;
            text-align: center;

            img {
                width: 100%;
                height: 229px;
                margin-bottom: 20px;
            }

            .name {
                font-size: 13px;
                font-weight: bold;
            }

            .price {
                margin: 12px 0;

                .presentPrice {
                    font-size: 15px;
                    color: #FF7800;
                    font-weight: bold;
                }

                .originalPrice {
                    font-size: 13px;
                    color: #666666;
                    text-decoration: line-through;
                }
            }

            .line {
                width: 130px;
                height: 2px;
                background-color: #F0F0F0;
                margin: 0 auto;
                margin-bottom: 10px;
            }

            .desc {
                font-size: 13px;
                color: #999999;
            }
        }
    }
}

.mySwiperLbtn {
    width: 32px;
    height: 32px;
    background-image: url('../../static/image/zuoa@2x.png');
    background-size: cover;
    left: 0;
}

.mySwiperRbtn {
    width: 32px;
    height: 32px;
    background-image: url('../../static/image/youa@2x.png');
    background-size: cover;
    right: 0;
}

.pro {
    min-height: 400px;
}
</style>