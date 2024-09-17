<template>
    <div class="addressMain">
        <div class="topButton cur-poi" @click="addHandler">
            新增收货地址
        </div>
        <div class="cards" v-loading="load" v-if="addressList.length > 0">
            <div class="card" v-for="(item) in addressList" :key="item.id">
                <div class="addressinfo">
                    <div class="defaultBtn">
                        设为默认地址
                        <el-switch v-model="item.isDefault" @change="edit(item)" :active-value="1" :inactive-value="0">
                        </el-switch>
                    </div>
                    <p>收货人：{{ item.realName }}</p>
                    <p>所在地区：{{ item.province + item.city + item.district }}</p>
                    <p>详细地址：{{ item.detail }}</p>
                    <p>手机号：{{ item.phone }}</p>
                </div>
                <div class="cardBtn">
                    <div class="" @click="deleteHandler(item)"><i class="iconfont icon-shanchu"></i>&nbsp;删除</div>
                    <div class="" @click="editHandler(item)"><i class="iconfont icon-xiugai"></i>&nbsp;修改
                    </div>
                </div>
                <i v-if="item.isDefault" class="iconfont icon-xuanzhongjiaobiao"></i>
            </div>
        </div>
        <div v-else class="flex-items-plus flex-column">
            <img src="../../../static/image/nothing@2x.png" alt="">
            <p class="fs30 font-color-999">没有收货地址~</p>
        </div>
        <el-dialog :visible.sync="deleteDialog" width="570px" title="确定删除该项" center>
            <div class="dialogDelete">
                <p>收货人姓名：{{ form.realName }}</p>
                <p>收货地址：{{ form.province + form.city + form.district + " " + form.detail }}</p>
                <p>手机号码：{{ form.phone }}</p>
            </div>
            <template #footer>
                <div class="deleteBtn">
                    <el-button type="primary" @click="deleteAddr">确 定</el-button>
                    <el-button @click="cancelAdd()">取 消</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog :visible.sync="showDialog" width="570px" :title="dialogType == 0 ? '修改收货地址' : '新增收货地址'" center>
            <address-edit @hideAddDialog="edit" @cancelAdd="cancelAdd()"></address-edit>
        </el-dialog>
    </div>
</template>

<script>
import api from '../../../api'
import AddressEdit from '../../../components/AddressEdit.vue';
import { mapMutations } from 'vuex';
import { listSearchMixin } from '../../../config/mixin'
export default {
    components: { AddressEdit },
    name: 'signingAddress',
    mixins: [listSearchMixin],//混入公共请求
    data() {
        return {
            deleteDialog: false,
            showDialog: false,
            addressList: [
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
            ],
            dialogType: 0,
            form: {
                "id": '',
                "realName": "",
                "phone": "",
                "province": "",
                "city": "",
                "district": "",
                "detail": "",
                "isDefault": 0
            },
            load: false
        };
    },

    mounted() {
        // 获取首页数据
        this.getList();

    },

    methods: {
        ...mapMutations({ setaddr: "SET_NEWADDRESS" }),
        cancelAdd() {
            this.deleteDialog = false
            this.showDialog = false
            console.log("点击了取消添加")
        },
        addHandler() {
            this.dialogType = 1
            this.form = {
                "id": '',
                "realName": "",
                "phone": "",
                "province": "",
                "city": "",
                "district": "",
                "detail": "",
                "isDefault": 0
            }
            this.setaddr(this.form)
            this.showDialog = true
            console.log("点击了添加")

        },
        deleteHandler(item) {
            this.form = item
            this.deleteDialog = true
            console.log("点击了删除")
        },
        editHandler(item) {
            this.dialogType = 0
            this.form = item
            this.setaddr(item)
            this.showDialog = true
            console.log("点击了编辑")
        },
        getList() {
            // this.load = true
            let self = this
            let params = {
                url: this.$api.addressList,
                method: "GET"
            }
            self.sendReq(params, res => {
                if (res.status == 200) {
                    this.addressList = res.data
                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    })
                }
                this.load = false
                this.deleteDialog = false
                this.deleteDialog = false


            })
        },
        deleteAddr() {
            let self = this
            let data = {
                id: this.form.id
            }
            let param = {
                url: this.$api.delAddress,
                method: "POST",
                data: data
            }
            self.sendReq(param, res => {
                if (res.status == 200) {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    })
                }
                else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    })
                }
                this.getList()
            })
        },
        edit(item) {
            let self = this
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
                url: this.$api.editAddress,
                data,
                method: "POST"
            }
            self.sendReq(param, res => {
                if (res.status == 200) {
                    this.$message({
                        message: this.dialogType == 0 ? "修改成功" : "添加成功",
                        type: 'success'
                    })
                    this.getList()
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                }
                this.deleteDialog = false
                this.showDialog = false
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.addressMain {
    border: 1px solid #e5e5e5;
    padding: 30px;

    .topButton {
        padding: 13px 20px;
        color: #FF7800;
        border: 1px solid #FF7800;
        display: inline-block;
        border-radius: 5px;
    }

    .cards {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;

        .card {
            box-sizing: border-box;
            width: 48%;
            border: 2px solid #e5e5e5;
            border-radius: 5px;

            .addressinfo {
                padding: 20px;

                .defaultBtn {
                    text-align: right;
                }

                >p {
                    padding: 15px;

                    &:last-child {
                        padding-bottom: 0;
                    }
                }
            }

            .cardBtn {
                box-sizing: border-box;
                display: flex;


                >div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    width: 50%;
                    height: 50px;
                    border-top: 1px solid #e5e5e5;

                    &:nth-child(2) {
                        border-left: 1px solid #e5e5e5;
                        color: #FF7800;
                    }
                }
            }

            position: relative;

            .icon-xuanzhongjiaobiao {
                position: absolute;
                right: 0;
                bottom: -5px;
                color: #FF7800;
                font-size: 50px;

            }
        }
    }

    .dialogDelete {
        padding-left: 80px;

        >p {
            margin: 10px 0px;
        }
    }

    .deleteBtn {
        button {
            width: 20%;
            height: 50px;
        }
    }

    >>>.el-dialog__body {
        background-color: #f3f3f3;
    }
}
</style>
