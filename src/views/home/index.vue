<template>
    <div class="home">
        <!-- 轮播图 -->
        <div class="block">
            <div class="product-category-menu"></div>
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
        <!-- <mydataview></mydataview> -->
        <!-- <loading-toast ref="loadingToast"></loading-toast> -->
    </div>
</template>

<script>
import ProductList from '../../components/base/productList'
// import LoadingToast from '../../components/canvasShow/components/toast'
// import { listSearchMixin } from '../../config/mixin'
// import {mydataview} from './mydataview.vue'
// import api from '../../api'
export default {
    // mixins: [listSearchMixin],
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
            ]
        }
    },
    mounted() {
        this.getIndexBast()
    },
    methods: {
        // 获取首页精品推荐
        getIndexBast() {
            // this.$refs.loadingToast.setCanvasLoading(true)
            // var _this = this
            // let params = {
            //     url: api.getIndexBast,
            //     method: 'GET'
            // }
            // this.sendReq(params, (res) => {
            //     if (res.status === 200) {
            //         this.$refs.loadingToast.setCanvasLoading(false)
            //         this.BastList = res.data.splice(0, 4)
            //     } else {
            //         _this.$message({
            //             message: res.msg,
            //             type: 'warning'
            //         })
            //     }
            // })
        },
        // 获取我的数据

    }
}
</script>
<style scoped>
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

.product-category-menu ul {
    padding: 3px 5px;
}

.product-category-menu ul li {
    padding: 0 30px;
    list-style: none;
}

.product-category-menu ul li a {
    line-height: 26px;
    color: #ffffff;
    font-size: 16px;
    transition: color 0.3s;
    text-decoration: none;
}

.product-category-menu ul li p {
    padding-left: 18px;
}

.product-category-menu ul li p a {
    line-height: 20px;
    color: #bbbbbb;
    font-size: 14px;
    margin-right: 10px;
    white-space: nowrap;
    transition: color 0.3s;
    text-decoration: none;
}

.product-category-menu ul li p a:hover {
    color: #FF7800;
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
</style>