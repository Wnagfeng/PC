<template>
    <div class="editAddressBox">
        <div class="editArea itemStyle">
            <span><i>*</i>所在地区：</span>
            <div class="rightForm">
                <el-cascader size="large" :props="{ label: 'label', value: 'label' }" :options="options"
                    v-model="addressarr" @change="addressChange">
                </el-cascader>
            </div>
        </div>
        <div class="itemStyle">
            <span><i>*</i>详细地址：</span>
            <div class="rightForm">
                <el-input type="textarea" :rows="2" placeholder="请输入地址" resize="none" v-model="form.detail">
                </el-input>
            </div>
        </div>
        <div class="itemStyle">
            <span><i>*</i>收货人姓名：</span>
            <div class="rightForm">
                <el-input v-model="form.realName" placeholder="请输入内容"></el-input>
            </div>
        </div>
        <div class="itemStyle">
            <span><i>*</i>手机号码：</span>
            <div class="rightForm">
                <el-input v-model="form.phone" placeholder="请输入内容"></el-input>
            </div>
        </div>
        <div class="itemStyle">
            <span></span>
            <div class="rightForm">
                <el-checkbox :true-label="1" :false-label="0" v-model="form.isDefault">设置为默认收货地址</el-checkbox>
            </div>
        </div>
        <div class="dialogFooter">
            <el-button type="primary" @click="newAddressData">确 定</el-button>
            <el-button @click="cancelAdd">取 消</el-button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { listSearchMixin } from '../config/mixin'
export default {
    name: 'addAddress',
    mixins: [listSearchMixin],
    data() {
        return {
            options: [],
            selectedOptions: [],
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
            addressarr: []
        }
    },
    mounted() {
        this.getOption()
        this.form = this.newAddress
    },
    computed: {
        ...mapGetters([
            'newAddress', // 新增修改收货地址
        ])
    },
    watch: {
        addressarr(v) {
            this.form.province = v[0]
            this.form.city = v[1]
            this.form.district = v[2]
        },
        form(v) {
            this.addressarr = [v.province, v.city, v.district]
        },
        newAddress(v) {
            this.form = v
        }
    },
    methods: {
        ...mapMutations({
            seNewAddress: 'SET_NEWADDRESS' // 新增修改收货地址
        }),
        addressChange(arr) {

        },
        getOption() {
            let self = this
            self.sendReq({ url: this.$api.getaddressList, method: "GET" }, res => {
                this.options = res.data
            })
        },
        newAddressData() {
          
            let p = /^1[3-9]\d{9}$/
            if (this.form.district === '') {
                this.$message.error('请选择地区!')
            }
            else if (this.form.detail === '') {
                this.$message.error('请填写详细地址!')
            }
            else if (this.form.realName === '') {
                this.$message.error('请填收货人姓名!')
            }
            else if (this.form.phone === '') {
                this.$message.error('请填写手机号码!')
            } else if (!p.test(this.form.phone)) {
                this.$message.error('手机号码格式错误!')
            }
            else {
                this.$emit('hideAddDialog', this.newAddress)
                this.selectedOptions = []

            }
        },
        cancelAdd() {
            this.$emit('cancelAdd')
        }
    }
}
</script>

<style lang="scss" scoped>
.editAddressBox {
    padding: 0 20px;

    .itemStyle {
        display: flex;
        margin-bottom: 20px;

        span {
            width: 100px;
            margin-right: 20px;
            text-align: right;
            padding-top: 5px;
        }

        i {
            color: red;
            margin-right: 3px;
        }

        .rightForm {
            flex: 1;

            >>>.el-cascader {
                width: 100%;
            }

            >>>.el-checkbox__label {
                font-size: 12px;
                color: #666666;
            }
        }
    }

    .dialogFooter {
        display: flex;
        justify-content: center;
        width: 100%;

        button {

            width: 120px;
        }
    }
}
</style>