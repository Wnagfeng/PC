<template>
    <div class="evaluate">
        <div class="block">
            <div class="head">
                <router-link to="/myOrder">
                    我的订单
                </router-link>
                <div class="arrow">

                </div>
                <div style="color:#ff7800">
                    评价
                </div>
            </div>
            <div class="list">
                <div class="item" v-for="(item, index) in product.cartInfo" :key="index">
                    <div class="left">
                        <!-- 替换url -->
                        <!-- <img :src="$api.BASEURL + item.productInfo.image" alt=""> -->
                        <img :src="item.productInfo.image" alt="">
                        <div class="price">
                            <!-- 展示价格 -->
                            <span>￥</span> {{ item.productInfo.attrInfo.price }}
                        </div>
                        <div class="sku">
                            {{ item.productInfo.attrInfo.sku }}
                        </div>
                    </div>
                    <div class="right">
                        <div class="title">
                            请填写商品评价
                        </div>
                        <el-form class="form" label-width="80px">
                            <el-form-item label="商品评分">
                                <el-rate v-model="item.productScore" :colors="colors"
                                    style="display:flex;justify-content: center;" @change="scorechange()"></el-rate>
                            </el-form-item>
                            <el-form-item label="服务评分">
                                <!-- 服务评分组件 -->
                                <el-rate v-model="item.serviceScore" :colors="colors"
                                    style="display:flex;justify-content: center;" @change="scorechange()"></el-rate>
                            </el-form-item>
                            <el-form-item label="评价晒单">
                                <el-input v-model="item.text" :rows="5" type="textarea" @input="scorechange()">

                                </el-input>
                                <br>
                                <el-upload list-type="picture-card" :action="action"
                                    :on-success="(res, file) => { return handleSuccess(res, file, index) }"
                                    :on-remove="(file, fileList) => { return handleRemove(file, fileList, index) }">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <div class="imgNum">
                                    共 <span style="color:#ff7800">{{ item.imgNum }}</span> 张，还可以上传<span
                                        style="color:#ff7800">{{ 5 - (item.imgNum) }}</span>张
                                </div>
                            </el-form-item>
                        </el-form>
                        <div class="tijiao" @click="submit(item)">
                            提交评价
                        </div>
                    </div>
                </div>

            </div>
            <el-dialog width="30%" :visible.sync="dialogShow" :show-close="false">
                <div>
                    <img src="../../static/image/wod@2x.png" alt="">
                    <div class="text">
                        您的评价已成功提交
                    </div>
                    <div class="footer-dialog">
                        <el-button @click="$router.push('/')">
                            返回首页
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
import api from '../../api/'
import { listSearchMixin } from '../../config/mixin';
export default {
    name: 'evaluate',
    mixins: [listSearchMixin],
    data() {
        return {
            product: {},// 存储商品信息
            action: api.upload,// 图片上传地址
            list: [],
            colors: [
                '#ff7800',
                '#ff7800',
                '#ff7800',
            ],
            dialogShow: false
        };
    },

    mounted() {

    },
    created() {
        //获取商品信息
        this.product = JSON.parse(this.$route.query.product)


        // init Ref Dom
        this.product.cartInfo.map(i => {
            console.log("i", i)
            // refDom
            this.$set(i, 'imgNum', 0)
            this.$set(i, 'text', '')
            i['serviceScore'] = 5
            i['productScore'] = 5
            this.$set(i, 'urls', [])
        })

        console.log(this.product)
    },
    methods: {
        handleSuccess(res, file, index) {
            this.product.cartInfo[index].urls.push(res.data[0])//加入上传成功的图片url
            this.product.cartInfo[index].imgNum = this.product.cartInfo[index].urls.length//update Number
        },
        handleRemove(file, fileList, index) {
            console.log(fileList)
            this.product.cartInfo[index].urls = []
            for (var i = 0; i < fileList.length; i++) {
                this.product.cartInfo[index].urls.push(fileList.response.data[0])
            }
            this.product.cartInfo[index].imgNum = this.product.cartInfo[index].urls.length
        },
        scorechange() {
            this.$forceUpdate() // 强刷
        },
        submit(item) {
            console.log("item,", item)
            if (item.text == null && item.text == undefined) {
                this.$message.warning('评论内容不能为空')
                return
            }
            // 拿到上传后的返回的url，根据信息发送评价请求
            let params = {
                url: api.orderComment,
                method: 'post',
                data: {
                    comment: item.text,
                    pics: item.urls.join(','),
                    serviceScore: item.serviceScore,
                    productScore: item.productScore,
                    unique: item.unique // uuid
                }
            }
            console.log(params)
            this.sendReq(params, res => {
                if (res.status == 200) {
                    this.dialogShow = true
                } else {
                    this.$message.warning(res.msg)
                }
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.el-upload {
    width: 100px;
    height: 100px;
}

.evaluate {
    width: 100%;
    background: #e5e5e5;

    .block {
        width: 1250px;
        margin: 0 auto;
        padding-bottom: 143px;

        .head {
            display: flex;
            height: 60px;
            line-height: 60px;
            align-items: center;

            .arrow {

                background: url('../../static/image/xiangyou@2x.png');
                width: 5px;
                height: 10px;
                margin: 0 20px;
            }
        }

        .list {
            background: #fff;
            border-bottom: 1px solid #e5e5e5;

            .item {
                display: flex;

                .left {
                    .price {
                        margin: 20px 0;
                    }

                    .sku {
                        font-size: 12px;
                        color: #c4bdbd;
                    }

                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border-right: 1px solid #e5e5e5;

                    img {
                        width: 228px;
                    }

                    .price {
                        font-size: 18px;
                    }
                }

                .right {
                    padding: 20px;

                    flex: 2;

                    .title {
                        border-bottom: 1px dashed #e5e5e5;
                        padding-bottom: 10px;
                    }

                    >>>.el-form {
                        margin-bottom: 80px;
                        margin-top: 20px;

                        .el-form-item {
                            display: flex;
                            text-align: left;
                            justify-content: flex-start;

                            .el-form-item__label {
                                flex: 1;
                            }

                            .el-form-item__content {
                                flex: 6;
                                text-align: left !important;
                            }

                            .el-upload-list--picture-card,
                            .el-upload--picture-card {
                                margin-top: 20px;
                                width: 80px !important;
                                height: 80px !important;
                                line-height: 80px;

                                .el-upload-list__item-actions,
                                .el-upload-list__item {
                                    margin-top: 20px;
                                    width: 80px !important;
                                    height: 80px !important;
                                    line-height: 80px;
                                }
                            }







                            .el-rate {
                                justify-content: start !important;
                            }

                        }

                        .imgNum {
                            color: #a89f9f;
                            margin-top: 40px;
                        }
                    }

                    .tijiao {

                        margin-top: 50px;
                        width: 200px;
                        background: #ff7800;
                        color: #fff;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        border-radius: 8px;
                        cursor: pointer;
                        margin: 0 auto;
                    }
                }
            }
        }

        >>>.el-dialog {
            .el-dialog__body {
                text-align: center;

                .text {
                    margin: 20px 0;
                }
            }
        }
    }

}
</style>