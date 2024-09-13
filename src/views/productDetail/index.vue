<!-- eslint-disable -->
<template>
    <div>
        <div class="productBox warp">
            <div class="productConcise clearfix">
                <div class="swiper-box" style="height: 560px">
                    <!-- swiper1 -->
                    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
                        <!-- 替换url -->
                        <!-- :style="{ backgroundImage: 'url(' + $api.BASEURL + item + ')' }" -->
                        <swiper-slide v-for="(item) of productDetailData.sliderImageArr" :key="item"
                            :style="{ backgroundImage: 'url(' + item + ')' }"></swiper-slide>
                    </swiper>
                    <!-- swiper2 Thumbs -->
                    <div class="swiperThumbsLeft">
                        <div class="thumbsBox">
                            <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
                                <!-- 替换url -->
                                <!-- :style="{ backgroundImage: 'url(' + $api.BASEURL + item + ')' }" -->
                                <swiper-slide v-for="(item, index) of productDetailData.sliderImageArr" :key="index"
                                    :style="{ backgroundImage: 'url(' + item + ')' }">
                                    <div style="width: 100%; height: 100%;" @click="thumbsClick(index)"></div>
                                </swiper-slide>
                            </swiper>
                            <div class="swiper-button-prev swiper-button-white iconfont" slot="button-prev">&#xe660;
                            </div>
                            <div class="swiper-button-next swiper-button-white iconfont" slot="button-next">&#xe695;
                            </div>
                        </div>
                    </div>
                </div>
                <div class="proDuctInfo">
                    <h3 class="productTit">{{ productDetailData.storeName }}</h3>
                    <p class="introduction">{{ productDetailData.storeInfo }}</p>
                    <div class="priceDataInfo">
                        <div class="promotionInfo">
                            <span>价格:</span>
                            <span>￥{{ skuInfo.price }}</span>
                            <span>￥{{ skuInfo.otPrice }}</span>
                        </div>
                    </div>
                    <div class='sku-box'>
                        <ul v-for='(item, index) in specList' :key='index'>
                            <li>
                                <p class="proDescribeTit">{{ item.attrName }}</p>
                                <p>
                                    <span @click='selectSku(index, sindex)' v-for='(spec, sindex) in item.attrValue'
                                        :key='sindex' :class="[{ 'selected-item': spec.check }]">
                                        {{ spec.attr }}
                                    </span>
                                </p>
                            </li>

                        </ul>
                    </div>
                    <div class="productNumber">
                        <div class="proDescribeTit">数量：</div>
                        <div class="proNumberList">
                            <el-input-number v-model="productNumber" :min="1" :max="skuInfo.stock"
                                label="库存"></el-input-number>
                            <span>库存<b>{{ skuInfo.stock }}</b>件</span>
                        </div>
                    </div>
                    <div class="btnBox">
                        <div class="buyBox" v-if="skuInfo.stock !== 0">
                            <span @click="clickAddCart">加入购物车</span>
                            <span @click='buyGood'>购买</span>
                        </div>
                        <div class="noStock" v-if="skuInfo.stock === 0">
                            <span>已售空</span>
                        </div>
                        <div class="favoritesBtn" @click="collect">
                            <!-- ../../../static/image/sc0.png -->
                            <img style="width:18px;height:18px;margin-top:3px;" v-if="favorite === false"
                                src="../../static/image/sc0.png" alt="">
                            <img style="width:18px;height:18px;margin-top:3px;" v-else src="../../static/image/sc0.png"
                                alt="">
                            <span>收藏</span>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <!-- 商品详情底部图片和评论区 -->
            <div class="productDetail  ">
                <div class="detailTabs">

                    <span :class="{ compActive: currentComp === 'detailData' }"
                        @click="clickSwitchTab('detailData'); showPl = false">宝贝详情</span>
                    <span :class="{ compActive: currentComp != 'detailData' }"
                        @click="currentComp = ''; showPl = true, compActive = false; getPlConfig(); getPlList()">商品评论</span>
                </div>

                <div class="detailBox clearfix">
                    <div v-if="!showPl" class="detailInfoBox">
                        <!-- 图片模块 -->
                        <div v-show="currentComp === 'detailData'">
                            <div class="detailBox">
                                <!-- 替换url -->
                                <!-- <div class="detailCont"
                                    v-html="replaceImgSrc($api.BASEURL, productDetailData.description)"></div> -->
                                <div class="detailCont" v-html="productDetailData.description"></div>
                            </div>
                        </div>
                        <div v-show="currentComp === 'evaluation'">
                        </div>
                    </div>
                    <!--
                     0 全部 1 好评 2 中评 3 差评
                     -->
                    <div :style="!showPl ? 'border-right: 1px solid #e0e0e0;' : ''" class="pingl" v-else>
                        <div v-show="plConfig.sumCount > 0" class="pl_top " v-if="plConfig.sumCount">
                            <div @click="type = 0" :style="type === 0 ? 'color: #EE7800;border-color: #EE7800;' : ''">全部
                                ({{ plConfig.sumCount }})</div>
                            <div @click="type = 1" :style="type === 1 ? 'color: #EE7800;border-color: #EE7800;' : ''">好评
                                ({{ plConfig.goodCount }})</div>
                            <div @click="type = 2" :style="type === 2 ? 'color: #EE7800;border-color: #EE7800;' : ''">中评
                                ({{ plConfig.inCount }})</div>
                            <div @click="type = 3" :style="type === 3 ? 'color: #EE7800;border-color: #EE7800;' : ''">差评
                                ({{ plConfig.poorCount }})</div>
                        </div>
                        <div v-show="plConfig.sumCount > 0" class="pl_list ">
                            <div class="pl_item" v-for="item in plList" :key="item.id">
                                <div class="user">
                                    <img src="../../assets/images/avatar.png" alt="">
                                    <div>{{ item.nickname }}</div>
                                </div>
                                <div class="sesion">
                                    <div>{{ item.comment }}</div>
                                    <div class="img_list">
                                        <!-- 替换url -->
                                        <!-- <el-image v-for="image in item.picturesArr" :key="image"
                                            style="width: 100px; height: 100px" :src="$api.BASEURL + image"
                                            :preview-src-list="[$api.BASEURL + image]"
                                            >
                                        </el-image> -->
                                        <!-- review-src-list 查看图片 -->
                                        <el-image v-for="image in item.picturesArr" :key="image"
                                            style="width: 100px; height: 100px" :src="image"
                                            :preview-src-list="[image]">
                                        </el-image>
                                    </div>
                                    <div class="font-color-999 fs14">{{ item.createTime }}</div>
                                </div>
                            </div>
                        </div>
                        <el-pagination sytle="margin-top:20px" v-if="plList.length > 0" :current-page="page"
                            :page-size="limit" @current-change="handleCurrentChange" background
                            layout='prev, pager, next,jumper' :total='plList.length'>
                        </el-pagination>

                    </div>
                    <div class="likeProductBox">
                        <like-list @reloadDetail="reloadDetail" :similarProducts="similarProducts"></like-list>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import detailData from './detailData'
import likeList from './likeList'
import 'swiper/dist/css/swiper.css'
// import CereHeader from '../../components/canvasShow/cereshop/pc/header'
import api from '../../api'
import { listSearchMixin } from '../../config/mixin'
import { mapMutations } from 'vuex'
import Cookie from 'js-cookie'
export default {
    name: 'ProductDetail',
    components: {
        // CereHeader,
        swiper,
        swiperSlide,
        // detailData,
        likeList
    },
    mixins: [listSearchMixin],

    // inject: ['reload'],
    data() {
        return {
            showPl: false,
            currentComp: 'detailData',
            swiperTop: null,
            swiperThumbs: null,
            swiperOptionTop: {
                spaceBetween: 10,
                loop: true,
                loopedSlides: 20
            },
            swiperOptionThumbs: {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                direction: 'vertical',
                spaceBetween: 10,
                slidesPerView: 3,
                loop: true,
                freeMode: true,
                loopedSlides: 20, // looped slides should be the same
                centeredSlides: true,
                watchSlidesVisibility: true
            },

            productDetailData: {
                id: 1,
                // 模拟数据
                sliderImageArr: [
                    "https://2c.zol-img.com.cn/product/222_800x600/918/ceZEvcveZhPV6.jpg",
                    "https://2b.zol-img.com.cn/product/252_800x600/385/cec8WM4298ynk.jpg",
                    "https://2f.zol-img.com.cn/product/252_800x600/263/ceNWt83DFZsIU.jpg"
                ],//轮播图数据
                storeName: "iPhone 15 Pro Max", //商品名称
                storeInfo: "Apple iPhone 15 Pro Max 256GB 银色 移动联通电信4G手机 双卡双待",//商品简介
                description: "<img src='https://2c.zol-img.com.cn/product/222_800x600/918/ceZEvcveZhPV6.jpg'></img> <img src='https://2b.zol-img.com.cn/product/252_800x600/385/cec8WM4298ynk.jpg'></img> <img src='https://2f.zol-img.com.cn/product/252_800x600/263/ceNWt83DFZsIU.jpg'></img> <img src='https://2c.zol-img.com.cn/product/222_800x600/918/ceZEvcveZhPV6.jpg'></img> <img src='https://2b.zol-img.com.cn/product/252_800x600/385/cec8WM4298ynk.jpg'></img> <img src='"
            },
            specList: [
                {
                    attrName: "内存",
                    attrValue: [
                        { attr: "64GB", check: false },
                        { attr: "128GB", check: false },
                        { attr: "256GB", check: false }
                    ]
                }
            ], // 规格列表对应的价格
            // skulist可能是对象，暂时用对象模拟数据，后面改成数组
            // skuList: [
            //     // 模拟数据
            //     // "64GB":
            // ], // sku列表
            skuList: {
                // 模拟数据
                "64GB": {
                    id: 1,
                    unique: "123456789",
                    price: 1299,
                    otPrice: 1599,
                    stock: 100,
                },
                "128GB": {
                    id: 2,
                    unique: "123456789",
                    price: 2299,
                    otPrice: 2599,
                    stock: 100,
                },
                "256GB": {
                    id: 3,
                    unique: "123456789",
                    price: 3299,
                    otPrice: 3599,
                    stock: 100,
                }
            }, // sku列表
            skuInfo: {
                id: 1,
                unique: "123456789",
                price: 1299,
                otPrice: 1599,
                stock: 100,
            }, // 商品信息
            specSelected: [], // 选中的规格
            favorite: false,
            activeName: 'Detail',
            similarProducts: [],
            currentProductData: {},
            replyCount: 0,
            productNumber: 1,
            currentPro: JSON.parse(this.$route.query.proData),//获取到商品的id 用于请求商品详情数据!
            type: 0,//0 全部 1 好评 2 中评 3 差评
            // 评论列表
            plList: [
                {
                    nickname: "CoderJoon",//用户名
                    comment: "很好用，很满意，很划算",//评论内容
                    // 评论图片
                    picturesArr: [
                        "https://tse3-mm.cn.bing.net/th/id/OIP-C.uVL-tZV0JftKcqjC4GJSYQHaI4?rs=1&pid=ImgDetMain",
                        "https://tse2-mm.cn.bing.net/th/id/OIP-C.4NNpzpzPNRr_FwxSlU61-AHaJ4?rs=1&pid=ImgDetMain",
                        "https://www.zqcyzg.com/uploads/allimg/230109/2_230109100252_1.jpg"
                    ],
                    createTime: "2022-01-09 10:00:00",
                },
                {
                    nickname: "CoderJoon",//用户名
                    comment: "很好用，很满意，很划算",//评论内容
                    // 评论图片
                    picturesArr: [
                        "https://tse3-mm.cn.bing.net/th/id/OIP-C.uVL-tZV0JftKcqjC4GJSYQHaI4?rs=1&pid=ImgDetMain",
                        "https://tse2-mm.cn.bing.net/th/id/OIP-C.4NNpzpzPNRr_FwxSlU61-AHaJ4?rs=1&pid=ImgDetMain",
                        "https://www.zqcyzg.com/uploads/allimg/230109/2_230109100252_1.jpg"
                    ],
                    createTime: "2022-01-09 10:00:00",
                }
            ],
            page: 1,
            limit: 10,
            // 评论数量
            plConfig: {
                sumCount: 10,
                goodCount: 10,
                inCount: 10,
                poorCount: 10
            }
        }
    },
    created() {
        // 发请求获取数据
        this.getProductInfo()
        this.getLikeProduct()
    },
    mounted() {
        this.$nextTick(() => {
            this.swiperTop = this.$refs.swiperTop.swiper
            this.swiperThumbs = this.$refs.swiperThumbs.swiper
            this.swiperTop.controller.control = this.swiperThumbs
            this.swiperThumbs.controller.control = this.swiperTop
        })
    },
    watch: {
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
            // skuList可能是对象，暂时用对象模拟数据，后面改成数组
            this.skuInfo = s[sku]
            console.log("s", s[sku])
        },
        type() {
            this.getPlList()
        }
    },
    methods: {
        ...mapMutations({
            setCartNumber: 'SET_CARTNUMBER',
            setShoppingCart: 'SET_SHOPPINGCART',
            setCollectData: 'SET_COLLECTDATA'
        }),
        //0.获取评论列表
        getPlList() {
            let params = {
                method: 'get',
                url: api.getEvaluateList + this.currentPro.productId,
                payload: {
                    limit: this.limit,
                    page: this.page,
                    type: this.type
                }
            }
            this.sendReq(params, res => {
                this.plList = res.data
            })
        },
        // 切换分页
        handleCurrentChange(data) {
            this.page = data
            this.getPlList()
        },
        // 1.获取评论数据(总数等...)
        getPlConfig() {
            let params = {
                method: 'get',
                url: api.getEvaluateData + this.currentPro.productId
            }
            this.sendReq(params, res => {
                this.plConfig = res.data
            })
        },
        // 2.获取商品详情
        getProductInfo() {
            // const rLoading = this.openLoading()
            let self = this
            let params = {
                url: api.getProDetail + self.currentPro.productId,
                method: 'GET'
            }
            self.sendReq(params, (res) => {
                if (res.status === 200) {
                    self.productDetailData = res.data.storeInfo
                    self.specList = res.data.productAttr
                    self.favorite = self.productDetailData.userCollect
                    self.skuList = res.data.productValue
                    self.replyCount = res.data.replyCount
                    // 规格 默认选中第一条
                    this.specList.forEach((item) => {
                        item.attrValue[0].check = true
                        this.specSelected.push(item.attrValue[0])
                    })
                    window.scrollTo(0, 0)
                    rLoading.close()
                } else {
                    self.$message(res.msg)
                }
            })
        },
        // 3.获取猜你喜欢
        getLikeProduct() {
            var _this = this
            let params = {
                url: api.getIndexLike,
                method: 'GET'
            }
            this.sendReq(params, (res) => {
                if (res.status === 200) {
                    this.similarProducts = res.data.splice(0, 4)
                } else {
                    _this.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
        },
        // 
        reloadDetail() {
            this.$router.go(0)
            // this.reload()
        },

        // 加入购物车请求
        clickAddCart() {
            console.log("点击了加入购物车")
            console.log("cartNum", this.productNumber)
            console.log("uniqueId", this.skuInfo.unique)
            console.log("productId", this.productDetailData.id)
            console.log("new", 0)
            if (this.skuInfo.stock > 0) {
                let self = this
                let params = {
                    url: api.addCart,
                    method: 'POST',
                    data: {
                        cartNum: self.productNumber,
                        uniqueId: self.skuInfo.unique,
                        productId: self.productDetailData.id,
                        new: 0
                    }
                }
                self.sendReq(params, (res) => {
                    if (res.status === 200) {
                        self.$message.success('添加成功')
                        self.getTrolleyList()
                    } else {
                        self.$message(res.msg)
                    }
                })
            } else {
                this.$message.warning('商品库存不足')
            }
        },
        // 获取购物车列表
        async getTrolleyList() {
            const self = this
            const params = {
                url: api.getTrolleyList,
                method: 'GET'
            }
            self.sendReq(params, res => {
                const d = res.data.valid
                this.setShoppingCart(d)
                this.setCartNumber(d.length)
            })
        },
        // 点击切换tab
        clickSwitchTab(type) {
            this.currentComp = type
        },
        handleClick(tab, event) {
            // console.log(tab, event)
        },
        // 购买请求
        buyGood() {
            let self = this
            if (this.skuInfo.stock > 0) {
                // if (!Cookie.get('token')) {
                //     this.$message.warning('请先登录')
                //     this.$store.commit('resetVuex')
                //     this.$router.push({ path: '/login' })
                // } else {
                // 测试跳转到订单页面
                this.$router.push({
                    path: '/placeOrder',
                    query: {
                        cartId: 1
                    }
                })
                let params = {
                    url: api.addCart,
                    method: 'POST',
                    data: {
                        cartNum: self.productNumber,
                        uniqueId: self.skuInfo.unique,
                        productId: self.productDetailData.id,
                        new: 1
                    }
                }
                self.sendReq(params, (res) => {

                    if (res.status === 200) {
                        let cartId = res.data.cartId
                        this.$router.push({
                            path: '/placeOrder',
                            query: {
                                cartId: cartId
                            }
                        })
                    } else {
                        self.$message(res.msg)
                    }
                })
            }
            // } else {
            //     this.$message.warning('商品库存不足')
            // }
        },
        // 选择规格sku
        selectSku(index, cindex) {
            this.specSelected = []//清空已选规格
            // console.log("specSelected", specSelected)
            // 选中当前规格
            this.specList.forEach((item, sindex) => {
                if (index === sindex) {
                    for (let i = 0; i < item.attrValue.length; i++) {
                        if (i === cindex) {
                            item.attrValue[i].check = true
                        } else {
                            item.attrValue[i].check = false
                        }
                    }
                }
            })

            // 将选中的规格放入specSelected
            this.specList.forEach((item) => {
                for (let i = 0; i < item.attrValue.length; i++) {
                    if (item.attrValue[i].check) {
                        this.specSelected.push(item.attrValue[i])
                    }
                }
            })
            console.log("当前选中的规格", this.specSelected)
        },
        // 轮播图
        thumbsClick(index) {
            this.swiperThumbs.slideTo(index, 300, false)
            this.swiperTop.slideTo(index, 300, false)
        },
        // 收藏请求
        collect() {
            if (this.favorite === false) {
                let params = {
                    url: api.collect,
                    method: 'POST',
                    data: {
                        category: 'collect',
                        id: this.productDetailData.id
                    }
                }
                this.sendReq(params, (res) => {
                    if (res.status === 200) {
                        this.$message.success('收藏成功')
                        this.favorite = true
                    }
                })
            } else {
                let params = {
                    url: api.unfavorite,
                    method: 'POST',
                    data: {
                        category: 'collect',
                        id: this.productDetailData.id
                    }
                }
                this.sendReq(params, (res) => {
                    if (res.status === 200) {
                        this.$message.success('取消成功')
                        this.favorite = false
                    }
                })
            }
        },
        // 封装替换url的hook函数
        replaceImgSrc(basePrefix, questionContent) {
            if (questionContent) {
                questionContent = questionContent.replace(new RegExp(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi), function (match, capture) {
                    match = match.replace(new RegExp(capture, 'g'), basePrefix + capture)
                    return match
                })
                return questionContent
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// 定义公共样式 
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
}

.productBox {
    margin-top: 50px;

    .productConcise {
        margin-bottom: 60px;

        .swiper-box {
            width: 580px;
            position: relative;
            margin-right: 50px;
            float: left;

            .swiper-slide {
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;

                &.slide-1 {
                    background-image: url("../../static/image/tu1@2x.png");
                }

                &.slide-2 {
                    background-image: url("../../static/image/tu3@2x.png");
                }

                &.slide-3 {
                    background-image: url("../../static/image/tup2@2x.png");
                }

                &.slide-4 {
                    background-image: url("../../static/image/likeProduct1.png");
                }

                &.slide-5 {
                    background-image: url("../../static/image/poornetwork@2x.png");
                }
            }

            .gallery-top {
                height: 100% !important;
                width: 440px;
                position: absolute;
                right: 0;
            }

            .swiperThumbsLeft {
                width: 120px;
                position: absolute;
                left: 0;
                top: 10%;
                box-sizing: border-box;
                padding: 10px 0;
                height: 80%;

                .thumbsBox {
                    width: 100%;
                    height: 100%;
                    position: relative;

                    .swiper-button-prev,
                    .swiper-button-next {
                        position: absolute;
                        left: 45px;
                        background: none;
                        width: 32px;
                        height: 32px;
                        line-height: 32px;
                        text-align: center;
                        background: #999999;
                        color: #ffffff;
                    }

                    .swiper-button-prev {
                        position: absolute;
                        top: -30px;
                    }

                    .swiper-button-next {
                        position: absolute;
                        top: initial;
                        bottom: -50px;
                    }
                }
            }

            .gallery-thumbs {
                position: relative;
                width: 100%;
                height: 100%;
            }

            .gallery-thumbs .swiper-slide {
                width: 100%;
                opacity: 0.7;
            }

            .gallery-thumbs .swiper-slide-active {
                opacity: 1;
                border: 1px solid #FF7800;
                box-sizing: border-box;
            }
        }

        .proDuctInfo {
            width: 578px;
            float: left;

            .productTit {
                font-size: 22px;
                color: #333333;
            }

            .introduction {
                color: #999999;
                font-size: 14px;
                line-height: 30px;
                margin: 10px 0;
            }

            .priceDataInfo {
                background: #fff8f2;
                height: auto;

                .groupBuyInfo {
                    display: flex;
                    justify-content: space-between;
                    background: #ff6b63;
                    height: 32px;
                    align-items: center;
                    padding: 0 16px;

                    .groupLeft {
                        display: flex;
                        color: #ffffff;
                        align-items: center;

                        i {
                            font-size: 22px;
                            margin-right: 5px;
                        }

                        span {
                            font-family: YouSheBiaoTiHei;
                            font-style: italic;
                            font-weight: bold;
                        }
                    }

                    .groupRight {
                        color: #ffffff;
                    }

                    .countdown {
                        display: flex;
                        font-size: 14px;
                        color: #ffffff;

                        .countdownTit {
                            line-height: 20px;
                            margin-right: 5px;
                        }

                        .timeDown {
                            span {
                                display: inline-block;
                                text-align: center;
                                height: 20px;
                                line-height: 20px;
                            }

                            .time {
                                min-width: 20px;
                                background-color: #fff;
                                color: #ff6b63;
                            }
                        }
                    }
                }

                .priceSpike {
                    display: flex;
                    margin-top: 15px;
                    padding: 0 15px;
                    justify-content: space-between;

                    .priceSpikeLeft {
                        display: flex;
                        color: #ec4b42;
                        align-items: center;
                        font-size: 16px;

                        b {
                            color: #FF7800;
                            font-size: 22px;
                            margin-right: 10px;
                        }

                        span {
                            font-size: 16px;
                            font-weight: 400;
                            text-decoration: line-through;
                            color: #666666;
                        }
                    }

                    .priceSpikeRight {
                        display: flex;
                        align-items: center;

                        span {
                            margin-right: 15px;
                            color: #999999;
                            font-size: 14px;
                        }

                        >>>.el-progress {
                            box-sizing: border-box;
                            width: 100px;
                            height: 10px;
                            border-radius: 0;
                            border: 1px solid #ff736c;
                            background: #f5f5f5;

                            .el-progress-bar {
                                display: block;
                                height: 100%;

                                .el-progress-bar__inner {
                                    border-radius: 0;
                                    height: 100%;
                                }

                                .el-progress-bar__outer {
                                    border-radius: 0;
                                    height: 100% !important;
                                }

                                .el-progress-bar__innerText {
                                    display: none;
                                }
                            }
                        }
                    }
                }

                .promotionInfo {
                    padding: 16px 16px 20px 16px;

                    span:nth-child(1) {
                        font-size: 16px;
                        color: #999999;
                    }

                    span:nth-child(2) {
                        font-size: 22px;
                        color: #FF7800;
                    }

                    span:nth-child(3) {
                        font-size: 16px;
                        color: #666666;
                        text-decoration: line-through;
                    }
                }

                .proDiscount {
                    padding: 2px 0 16px;
                    max-height: 112px;
                    overflow-y: auto;
                    box-sizing: border-box;

                    .discountInfo {
                        span:nth-child(1) {
                            font-size: 16px;
                            color: #999999;
                        }

                        span:nth-child(2) {
                            font-size: 14px;
                            color: #FF7800;
                            border: 1px solid #FF7800;
                            padding: 0 2px;
                            border-radius: 4px;
                        }

                        span:nth-child(3) {
                            font-size: 14px;
                            color: #666666;
                        }
                    }

                    .activityLabel {
                        padding-left: 20px;
                        margin-bottom: 20px;

                        span:nth-child(1) {
                            font-size: 14px;
                            color: #FF7800;
                            border: 1px solid #FF7800;
                            padding: 1px 2px;
                            border-radius: 4px;
                        }

                        span:nth-child(2) {
                            font-size: 14px;
                            color: #666666;
                        }

                        span:nth-child(3) {
                            font-size: 14px;
                            color: #FF7800;
                            text-decoration: underline;
                            cursor: pointer;
                        }
                    }

                    .activityLabel:last-child {
                        margin-bottom: 0;
                    }
                }
            }

            .proDescribeTit {
                color: #000000;
                font-size: 16px;
                margin: 18px 0;
            }

            .productColor {
                .proColorList {
                    display: flex;

                    div {
                        border: 1px solid #ffffff;
                        padding: 4px;
                        margin-right: 15px;
                        cursor: pointer;

                        span {
                            display: block;
                            height: 37px;
                            width: 37px;
                            border: 1px solid #eeeeee;

                            img {
                                width: 100%;
                            }
                        }
                    }

                    // div.colorActive {
                    // }
                }
            }

            .sku-box {
                ul {
                    li {
                        p {
                            &:nth-child(2) {
                                span {
                                    display: inline-block;
                                    padding: 0 10px;
                                    height: 32px;
                                    line-height: 32px;
                                    text-align: center;
                                    color: #666666;
                                    font-size: 18px;
                                    background: #efefef;
                                    margin-right: 20px;
                                    margin-bottom: 15px;
                                    cursor: pointer;
                                }

                                .selected-item {
                                    background: #FF7800;
                                    color: #ffffff;
                                }
                            }
                        }
                    }
                }
            }

            .productSize {
                .proSizeList {
                    display: flex;

                    span {
                        padding: 0 10px;
                        height: 32px;
                        line-height: 32px;
                        text-align: center;
                        color: #666666;
                        font-size: 18px;
                        background: #efefef;
                        margin-right: 20px;
                        cursor: pointer;
                    }

                    span.sizeActive {
                        background: #FF7800;
                        color: #ffffff;
                    }
                }
            }

            .proNumberList {
                .el-input-number {
                    width: 140px;
                    margin-right: 25px;
                }

                b {
                    font-size: 16px;
                    font-weight: 500;
                    color: #FF7800;
                    padding: 0 5px;
                }
            }

            .btnBox {
                display: flex;
                align-items: center;
                margin-top: 30px;

                .buyBox {
                    display: flex;

                    span {
                        width: 135px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        font-size: 16px;
                        color: #FF7800;
                        border: 1px solid #FF7800;
                        margin-right: 10px;

                        &:hover {
                            cursor: pointer;
                        }
                    }

                    span:nth-child(2) {
                        background: #FF7800;
                        color: #ffffff;
                    }
                }

                .favorites {
                    display: flex;

                    .StartGroup {
                        width: 135px;
                        height: 40px;
                        background: #ff7800;
                        display: block;
                        color: #ffffff;
                        text-align: center;
                        line-height: 40px;
                        cursor: pointer;
                    }

                    .oddBuy {
                        width: 135px;
                        height: 40px;
                        display: block;
                        box-sizing: border-box;
                        color: #FF7800;
                        border: 1px solid #FF7800;
                        margin-right: 10px;
                        text-align: center;
                        line-height: 40px;
                        cursor: pointer;
                    }
                }

                .noStock {
                    display: flex;

                    span {
                        width: 135px;
                        height: 40px;
                        background: #999999;
                        display: block;
                        color: #ffffff;
                        text-align: center;
                        line-height: 40px;
                    }
                }

                .favoritesBtn {
                    width: 40px;
                    height: 38px;
                    background: #ffffff;
                    border: 1px solid #cccccc;
                    text-align: center;
                    margin-left: 10px;
                    cursor: pointer;

                    i {
                        color: #666666;
                        display: block;
                        margin-top: 2px;
                    }

                    span {
                        display: block;
                        font-size: 12px;
                        color: #999999;
                    }
                }
            }
        }
    }

    >>>.el-tabs--border-card {
        box-shadow: none;
        border: none;
    }

    .productDetail {


        .detailTabs {
            margin-bottom: 30px;
            height: 46px;
            line-height: 46px;
            border: 1px solid #e5e5e5;
            background: #f6f6f6;
            display: flex;

            span {
                padding: 0 30px;
                border-right: 1px solid #e5e5e5;
                cursor: pointer;
                color: #333333;
                font-size: 16px;
            }

            .compActive {
                background: #ffffff;
            }
        }

        .detailBox {

            margin-bottom: 100px;

            .detailInfoBox {
                width: 890px;
                float: left;
                min-height: 1200px;
                border-right: 1px solid #cacaca;
            }

            .detailCont>>>img {
                // 渲染的html的样式
                max-width: 100%;
                height: auto;
            }

            .detailCont>>>ul {
                // 渲染的html的样式
                list-style-type: none;
            }

            .likeProductBox {
                width: 280px;
                float: left;
                padding-left: 44px;
            }
        }

        .pingl {
            width: 890px;
            // height: 50px; // 高度自适应
            float: left;

            box-sizing: border-box;
            padding-right: 10px;

            .pl_top {
                display: flex;
                gap: 20px;

                >div {
                    width: 120px;
                    line-height: 38px;
                    text-align: center;
                    cursor: pointer;
                    border: 1px solid #e0e0e0;
                    border-radius: 16px;
                    color: #666;
                }
            }

            .pl_list {
                margin-top: 20px;
                margin-bottom: 20px;
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;
                border-bottom: 1px solid #e0e0e0;

                >.pl_item {
                    padding: 20px 0;
                    display: flex;
                    border-top: 1px solid #e0e0e0;

                    .user {
                        flex: 1;
                        overflow: hidden;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;

                        img {
                            width: 64px;
                            height: 64px;
                            margin-bottom: 15px;
                        }

                        div {
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }

                    .sesion {
                        flex: 9;
                        box-sizing: border-box;
                        padding-left: 30px;
                        justify-content: space-between;

                        .img_list {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 20px;
                            margin: 20px 0;
                        }
                    }
                }
            }
        }
    }
}

.pinListBox::-webkit-scrollbar {
    width: 4px;
    height: 16px;
    background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
.pinListBox::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    border-radius: 0px;
    background-color: #ffffff;
}

/*定义滑块 内阴影+圆角*/
.pinListBox::-webkit-scrollbar-thumb {
    border-radius: 0px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #e3e3e3;
}
</style>