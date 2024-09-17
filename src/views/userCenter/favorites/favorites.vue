<template>
    <div class="attentionds">
        <div class="attentiondsTit">
            <div class="attentionBox">
                <div class="">
                    <div class="searchRight">
                        <span v-if="!edit" class="batch" @click="showEdit">批量管理</span>
                        <div v-else class="saveList">
                            <el-checkbox v-model="selectAll" @change="changeChecked" :true-label='1'
                                :false-label='0'>全选</el-checkbox>
                            <span class="delete" @click="cancelFun">取消收藏</span>
                            <span class="save" @click="saveList">保存</span>
                        </div>
                    </div>
                </div>
            </div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="收藏的商品" name="commodity">
                    <div class="list sub-main" v-if="flag" v-loading="loading">
                        <div class="attentiondsList">
                            <div class="listBox">
                                <div class="attentiondsItem" v-for="(item, index) of attentiondList" :key="index"
                                    :class="{ selected: item.selected === 1, edit: edit }"
                                    @click="selectPro(index, item.selected)">
                                    <div class="mc" v-if="edit"></div>
                                    <div class="imgBox" :class="{ offShelf: item.isShow === 0 }">
                                        <div class="tipText" v-if="item.isShow === 0">
                                            <span>已下架</span>
                                        </div>
                                        <!-- 替换url -->
                                        <!-- <img :src="$api.BASEURL + item.image" alt=""> -->
                                        <img :src="item.image" alt="">
                                    </div>
                                    <div class="info">
                                        <h3 class="overflow">{{ item.storeName }}</h3>
                                        <span class="price">¥{{ item.price }}</span>
                                    </div>
                                    <div class="btnBox">
                                        <span @click="unfavorite(item)">取消收藏</span>
                                        <span @click="toProductDetail(item)">查看详情</span>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                    <div class="nothing sub-main" v-else>
                        <img src="../../../static/image/nothing@2x.png" alt="">
                        <p class="fs20 font-color-999">你还没有收藏的商品～</p>
                        <router-link to="/">
                            <el-button>去首页看看</el-button>
                        </router-link>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import api from '../../../api/index'
import { listSearchMixin } from '@/config/mixin'
export default {
    name: 'favorites',
    mixins: [listSearchMixin],
    data() {
        return {
            edit: false,
            attentiondChecked: 0,
            selectAll: 0,
            activeName: 'commodity',
            keyword: '',
            attentiondList: [
                {
                    pid: 1,
                    image: "https://tse2-mm.cn.bing.net/th/id/OIP-C.4NNpzpzPNRr_FwxSlU61-AHaJ4?rs=1&pid=ImgDetMain",
                    storeName: "iPhone 15 Pro Max",
                    price: "1299"
                },
                {
                    pid: 2,
                    image: "https://tse2-mm.cn.bing.net/th/id/OIP-C.4NNpzpzPNRr_FwxSlU61-AHaJ4?rs=1&pid=ImgDetMain",
                    storeName: "iPhone 16 Pro Max",
                    price: "1299"
                },
                {
                    pid: 3,
                    image: "https://tse2-mm.cn.bing.net/th/id/OIP-C.4NNpzpzPNRr_FwxSlU61-AHaJ4?rs=1&pid=ImgDetMain",
                    storeName: "iPhone 17 Pro Max",
                    price: "1299"
                },
                {
                    pid: 4,
                    image: "https://tse2-mm.cn.bing.net/th/id/OIP-C.4NNpzpzPNRr_FwxSlU61-AHaJ4?rs=1&pid=ImgDetMain",
                    storeName: "iPhone 18 Pro Max",
                    price: "1299"
                },
                {
                    pid: 5,
                    image: "https://tse2-mm.cn.bing.net/th/id/OIP-C.4NNpzpzPNRr_FwxSlU61-AHaJ4?rs=1&pid=ImgDetMain",
                    storeName: "iPhone 19 Pro Max",
                    price: "1299"
                },
                {
                    pid: 6,
                    image: "https://tse2-mm.cn.bing.net/th/id/OIP-C.4NNpzpzPNRr_FwxSlU61-AHaJ4?rs=1&pid=ImgDetMain",
                    storeName: "iPhone 20 Pro Max",
                    price: "1299"
                },
                {
                    pid: 6,
                    image: "https://tse2-mm.cn.bing.net/th/id/OIP-C.4NNpzpzPNRr_FwxSlU61-AHaJ4?rs=1&pid=ImgDetMain",
                    storeName: "iPhone 20 Pro Max",
                    price: "1299"
                }
            ],
            shopList: [],
            flag: true,
            flag1: true,
            loading: false
        }
    },
    mounted() {
        this.getAllProduct()
    },
    methods: {
        // 收藏商品查询
        getAllProduct() {
            // 请打开Loading组件
            // this.loading = true
            let params = {
                url: api.getAllProduct,
                method: 'GET',
                payload: {
                    type: 'collect'
                }
            }
            this.sendReq(params, res => {
                if (res.status === 200) {
                    let data = res.data
                    let list = data.map(item => {
                        item.selected = 0
                        return item
                    })
                    this.attentiondList = list
                    if (res.data.length) {
                        this.flag = true
                    } else {
                        this.flag = false
                    }
                    this.loading = false
                } else {
                    this.$message.warning(res.msg)
                }
            })
        },
        // 跳转到商品详情
        toProductDetail(item) {
            let data = {
                productId: item.pid
            }
            this.$router.push({
                path: '/productDetail',
                query: {
                    proData: JSON.stringify(data)
                }
            })
        },
        // 商品单个选中
        selectPro(index, selected) {
            if (selected === 1) {
                this.attentiondList[index].selected = 0
            } else {
                this.attentiondList[index].selected = 1
            }
            this.selectAll = 1
            this.attentiondList.map(item => {
                if (item.selected === 0) {
                    this.selectAll = 0
                }
            })
        },
        // 全选
        changeChecked() {
            this.attentiondList.forEach(i => {
                this.$set(i, 'selected', this.selectAll)
            })
        },
        // 批量管理
        showEdit() {
            if (this.attentiondList.length === 0) {
                return
            }
            this.edit = true
        },
        saveList() {
            this.attentiondList.forEach(i => {
                this.$set(i, 'selected', 0)
            })
            this.selectAll = 0
            this.edit = false
        },
        // 取消收藏请求
        unfavorite(item) {
            let params = {
                url: api.unfavorite,
                method: 'POST',
                data: {
                    id: item.pid,
                    category: 'collect'
                }
            }
            console.log(params)
            this.sendReq(params, res => {
                if (res.status === 200) {
                    this.$message.success('取消成功')
                    this.edit = false
                    this.getAllProduct()
                } else {
                    this.$message.warning('取消失败')
                }
            })
        },
        // 取消选中收藏
        cancelFun() {
            let flag2 = false
            let ids = []
            this.attentiondList.forEach(item => {
                if (item.selected === 1) {
                    flag2 = true
                    ids.push(item.pid)
                }
            })
            ids = ids.join(',')
            if (flag2 === false) {
                return this.$message.warning('请先选择需要取消的收藏')
            }
            this.$confirm('此操作将取消选中的收藏, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    url: api.unfavorites + ids,
                    method: 'POST',
                    data: {
                        category: 'collect'
                    }
                }
                this.sendReq(params, res => {
                    if (res.status === 200) {
                        this.$message.success('取消成功')
                        this.edit = false
                        this.getAllProduct()
                    } else {
                        this.$message.warning('取消失败')
                    }
                })
            }).catch(() => {
            })
        }
    }
}
</script>

<style lang="scss" scoped>
// .parent-class /deep/ .child-class {
//     color: blue;
// }

// .listBox 和下面的元素需要微调宽度


/deep/ #tab-commodity {
    color: #FF7800;
}

// 滑块样式
.el-tabs /deep/ .el-tabs__active-bar {
    background-color: #FF7800 !important;
}


.el-tabs__nav /deep/ .el-tabs__active-bar {
    background-color: #FF7800 !important;
}

.attentionds {
    border: 1px solid #E5E5E5;

    // label文字颜色
    #tab-commodity {
        color: #FF7800;
    }



    .el-tabs {
        width: 100%;
        padding: 10px;
    }

    .el-tabs__item {

        color: #FF7800 !important;
    }

    .attentiondsTit {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        position: relative;

        >>>.el-tabs__active-bar {
            background-color: #FF7800 !important;
        }

        >>>.el-tabs__nav-wrap::after {
            height: 1px;
        }

        >>>.el-tabs--top {
            width: 100%;
        }

        .attentionBox {
            position: absolute;
            top: 15px;
            right: 25px;
            z-index: 99;

            .searchRight {
                display: flex;

                input {
                    margin-left: 16px;
                    border: 1px solid #E5E5E5;
                    padding-left: 10px;
                    font-size: 14px;
                    width: 175px;
                }

                span {
                    display: block;
                    height: 30px;
                    line-height: 30px;
                }

                .batch {
                    color: #FFFFFF;
                    font-size: 12px;
                    width: 78px;
                    text-align: center;
                    height: 28px;
                    line-height: 28px;
                    background: #FF7800;
                    cursor: pointer;
                }

                .searchBtn {
                    width: 64px;
                    height: 28px;
                    line-height: 28px;
                    background: #FF7800;
                    color: #FFFFFF;
                    font-size: 14px;
                    text-align: center;
                    cursor: pointer;
                }
            }
        }

        span {
            display: block;
            height: 30px;
            line-height: 30px;
        }

        .saveList {
            display: flex;
            align-items: center;

            span {
                margin-left: 36px;
                cursor: pointer;
                color: #333333;
                font-size: 14px;
            }

            span.save {
                width: 78px;
                height: 28px;
                background: #FF7800;
                color: #FFFFFF;
                text-align: center;
                line-height: 28px;
            }
        }

        >>>.el-tabs__nav-scroll {
            padding: 0 25px;
            height: 60px;
            line-height: 60px;

            >>>.el-tabs__active-bar {
                background-color: #FF7800 !important;
            }
        }
    }

    .list {
        padding: 10px 20px 20px 20px;

        .attentiondsList {
            .topTime {
                color: #333333;
                font-size: 18px;
                margin-bottom: 30px;
            }

            .listBox {
                width: 100%;

                display: grid;
                /* 使用 Grid 布局 */
                grid-template-columns: repeat(5, 1fr);
                /* 一行五个 */
                gap: 18px;
                /* 设定列间距和行间距 */

                .attentiondsItem {
                    // width: 186px;
                    // float: left;
                    // margin: 0 18px 20px 0;
                    position: relative;
                    // width: calc(20% - 18px); // 根据需要计算宽度，减去间距
                    margin-bottom: 30px; // 底部间距
                    // display: flex;
                    // flex-direction: column;
                    // align-items: center;
                    // justify-content: center;

                    .imgBox {
                        width: 100%;
                        height: 206px;
                        max-width: 206px;
                        margin: 0 auto;
                        border: 1px solid #E5E5E5;
                        border-bottom: 0;
                        // padding:;
                        padding-left: 10px;
                        padding-right: 10px;
                        padding-top: 3px;
                        padding-bottom: 3px;
                        box-sizing: border-box;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .info {
                        margin: 0 auto;
                        border: 1px solid #E5E5E5;
                        box-sizing: border-box;
                        text-align: center;
                        padding: 0 15px 15px;
                        max-width: 206px;

                        h3 {
                            font-size: 14px;
                            color: #333333;
                            height: 30px;
                            line-height: 30px;
                            margin-top: 10px;
                        }

                        span {
                            color: #FF7800;
                            font-size: 14px;
                        }
                    }

                    .btnBox {
                        margin: 0 auto;
                        border: 1px solid #E5E5E5;
                        display: flex;
                        border-top: none;
                        max-width: 204px;

                        span {
                            width: 50%;
                            display: block;
                            text-align: center;
                            font-size: 14px;
                            color: #333333;
                            height: 30px;
                            line-height: 30px;
                            cursor: pointer;
                        }

                        span:first-child {
                            border-right: 1px solid #E5E5E5;
                            box-sizing: border-box;
                        }
                    }

                    .offShelf {
                        position: relative;
                        z-index: 99;

                        .tipText {
                            top: 0;
                            position: absolute;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: rgba(28, 28, 28, 0.5);
                            color: #fff;
                        }
                    }
                }

                .attentiondsItem:nth-child(5n) {
                    margin-right: 0;
                }

                .edit:before {
                    content: "";
                    background: url("../../../assets/images/noEdit.png");
                    width: 58px;
                    height: 58px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    display: block;
                    background-size: contain;
                    z-index: 999;
                }

                .selected:before {
                    background: url("../../../assets/images/edit.png");
                    background-size: contain;
                }
            }
        }

        >>>.el-pagination {
            margin: 30px 0 20px 0;
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

    .mc {
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
    }
}
</style>