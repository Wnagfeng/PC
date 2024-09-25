<template>
    <div class="home">
        <!-- 轮播图 -->
        <div class="block">
            <div class="product-category-menu">
                <ul v-for="item in categoryList" :key="item.id">
                    <div>{{ item.cateName }}</div>
                    <li>
                        <div @click="tocateGory(items)" v-for="items in item.children" :key="items.id">{{ items.cateName
                            }}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="banner">
                <el-carousel height="470px">
                    <el-carousel-item>
                        <img style="width: 1000px;height: 470px" src="../../assets/images/banner1.png" />
                    </el-carousel-item>
                    <el-carousel-item>
                        <img style="width: 1000px;height: 470px" src="../../assets/images/banner2.png" />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!-- 轮播图END -->
        <div class="main-box">
            <div class="main">
                <div class="products">
                    <div class="box-hd">
                        <div class="title">精品推荐</div>
                        <div class="more">
                        </div>
                    </div>
                    <div class="box-bd">
                        <div class="list">
                            <ProductList :productList='BastList'></ProductList>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 猜你喜欢列表 -->
        <div class="main-box">
            <div class="main">
                <div class="products">
                    <div class="box-hd">
                        <div class="title">猜你喜欢</div>
                        <div class="more">
                        </div>
                    </div>
                    <div class="box-bd">
                        <div class="list">
                            <ProductList :productList='LikeList'></ProductList>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <loading-toast ref="loadingToast"></loading-toast> -->
    </div>
</template>

<script>
import ProductList from '../../components/base/productList'
// import LoadingToast from '../../components/canvasShow/components/toast'
import { listSearchMixin } from '../../config/mixin'
import api from '../../api'
export default {
    mixins: [listSearchMixin],
    name: 'index',
    components: { ProductList },
    data() {
        return {
            indexBanner: [],
            // 这里先写死后期改成从接口获取
            BastList: [
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
            // 猜你喜欢
            LikeList: [
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
            // 分类列表
            categoryList: [
                {
                    id: 1,
                    cateName: "手机",
                    children: [
                        { id: 101, cateName: "苹果" },
                        { id: 102, cateName: "三星" },
                        { id: 103, cateName: "小米" }
                    ]
                },
                {
                    id: 2,
                    cateName: "电脑",
                    children: [
                        { id: 201, cateName: "联想" },
                        { id: 202, cateName: "惠普" },
                        { id: 203, cateName: "华硕" }
                    ]
                },
                {
                    id: 3,
                    cateName: "家电",
                    children: [
                        { id: 301, cateName: "冰箱" },
                        { id: 302, cateName: "洗衣机" },
                        { id: 303, cateName: "空调" }
                    ]
                },
                {
                    id: 4,
                    cateName: "耳机",
                    children: [
                        { id: 401, cateName: "蓝牙耳机" },
                        { id: 402, cateName: "有线耳机" }
                    ]
                }
            ]
        }
    },
    mounted() {
        this.getIndexBast()
        this.getHomeCategory()
        this.getHomeGuessyourLike()
        this.getHomeBanner()
    },
    methods: {
        // 获取首页精品推荐
        getIndexBast() {
            // this.$refs.loadingToast.setCanvasLoading(true)
            var _this = this
            let params = {
                url: api.getIndexBast,
                method: 'GET'
            }
            this.sendReq(params, (res) => {
                if (res.status === 200) {
                    // this.$refs.loadingToast.setCanvasLoading(false)
                    this.BastList = res.data.splice(0, 4)
                    console.log("Home BastList", res)
                } else {
                    _this.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
        },
        // 获取分类列表
        getHomeCategory() {
            // this.$refs.loadingToast.setCanvasLoading(true)
            var _this = this
            let params = {
                url: api.getCategory,
                method: 'GET'
            }
            this.sendReq(params, (res) => {
                if (res.status === 200) {
                    // this.$refs.loadingToast.setCanvasLoading(false)
                    this.categoryList = res.data
                    console.log("Home categoryList", res)
                } else {
                    _this.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
        },
        // 获取猜你喜欢
        getHomeGuessyourLike() {
            var _this = this
            let params = {
                url: api.getIndexLike,
                method: 'GET'
            }
            this.sendReq(params, (res) => {
                console.log("Home LikeList", res)
                if (res.status === 200) {
                    this.LikeList = res.data.splice(0, 4)
                } else {
                    _this.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
        },
        // 跳转到分类页
        tocateGory(item) {
            this.$router.push({
                path: '/category',
                query: {
                    categoryName: item.cateName,
                    cid: item.id
                }
            })
        },
        // 获取首页轮播图
        getHomeBanner() {
            var _this = this
            let params = {
                url: api.getIndexBanner,
                method: 'GET'
            }
            this.sendReq(params, (res) => {
                if (res.status === 200) {
                    this.indexBanner = res.data
                } else {
                    _this.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.home {
    margin: 0 auto;
    width: 1250px;
}

/* 轮播图CSS */
.block {
    width: 100%;
    height: 470px;
    margin-bottom: 30px;
}

.banner {
    width: 1000px;
    flex: 1;
    float: right;
}

/* 轮播图CSS END */

.product-category-menu {
    width: 238px;
    height: 470px;
    background-color: #2d2d31;
    color: #fff;
    margin-right: 10px;
    float: left;
}

.box-hd {
    height: 58px;
    margin: 20px 0 0 0;
}

.box-hd .title {
    float: left;
    font-size: 30px;
    font-weight: 600;
    line-height: 58px;
    color: #333;
}

.box-hd .more {
    float: right;
}

.box-hd .more a {
    font-size: 16px;
    line-height: 58px;
    color: #424242;
}

.box-hd .more a:hover {
    color: #ff6700;
}

.box-bd {
    height: 500px;
}

.box-bd .list {
    min-height: 500px;
    padding: 20px 40px;
}

.product-category-menu {
    padding: 30px;
    box-sizing: border-box;

    >ul {
        &:nth-child(1) {
            >div {
                margin-top: 0;
            }
        }

        >div {
            margin: 18px 0;
        }

        >li {
            padding-left: 18px;
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 5px;

            >div {
                width: 48%;
                color: #BBBBBB;
                font-size: 14px;

                &:hover {
                    color: #ff6700;
                    cursor: pointer;
                }
            }
        }
    }

}
</style>