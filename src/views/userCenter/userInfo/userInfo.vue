<template>
    <div class="userInfo">
        <div class="userNameBox userBlock">
            <label>昵称：</label>
            <span>{{ userInfo.nickname }}</span>
        </div>
        <div class="bindPhoneBox userBlock">
            <label>手机号：</label>
            <div class="phoneInfo" v-if="isUpt">
                <el-input v-model="userInfo.phone" placeholder="请输入手机号"></el-input>
                <span @click="uptPhone(2)">保存</span>
            </div>
            <div class="phoneInfo" v-else>
                <span>{{ userInfo.phone }}</span>
                <span @click="uptPhone(1)">修改</span>
            </div>
        </div>
        <div class="bindPhoneBox userBlock">
            <label>账户余额：</label>
            <div class="phoneInfo">
                <span>￥{{ userInfo.nowMoney }}</span>
            </div>
        </div>
        <div class="userNameBox userBlock">
            <label>原密码：</label>
            <el-input v-model="password" show-password placeholder="请输入原密码"></el-input>
        </div>
        <div class="userNameBox userBlock">
            <label>新密码：</label>
            <el-input v-model="newPassword" show-password placeholder="请输入新密码"></el-input>
        </div>
        <div class="userNameBox userBlock">
            <label>重复新密码：</label>
            <el-input v-model="renewPassword" show-password placeholder="请输入重复新密码"></el-input>
        </div>
        <div class="userInfoSave" @click="saveUserInfo" v-throttle>修改密码</div>
    </div>
</template>

<script>
import api from '@/api'
import { listSearchMixin } from '@/config/mixin'
import { mapGetters, mapMutations } from 'vuex'
import Cookie from 'js-cookie'
export default {
    mixins: [listSearchMixin],
    name: 'userInfo',
    data() {
        return {
            isUpt: false,
            password: '',
            newPassword: '',
            renewPassword: ''
        }
    },
    mounted() {
        this.getUserInfo()
    },
    computed: {
        ...mapGetters([
            'userInfo' // 用户信息
        ])
    },
    methods: {
        ...mapMutations({
            setUserInfo: 'SET_USERINFO', // 修改用户信息
            setCartNumber: 'SET_CARTNUMBER',
            setShoppingCart: 'SET_SHOPPINGCART',
            setNewAddress: 'SET_NEWADDRESS',
            setAreaCode: 'SET_AREACODE'
        }),
        getUserInfo() {
            let self = this
            let params = {
                url: api.getUser,
                method: 'GET'
            }
            self.sendReq(params, (res) => {
                if (res.status === 200) {
                    self.setUserInfo(res.data)
                }
            })
        },
        uptPhone(type) {
            let self = this
            if (type === 1) {
                self.isUpt = true
            } else {
                let reg = /^1[13456789]\d{9}$/
                if (!reg.test(self.userInfo.phone)) {
                    self.$message.error('手机号格式错误')
                    return
                }
                this.$confirm('此操作将修改用户手机号, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        url: api.uptUserInfo,
                        method: 'POST',
                        data: {
                            phone: self.userInfo.phone
                        }
                    }
                    this.sendReq(params, res => {
                        if (res.status === 200) {
                            this.$message.success('修改成功!')
                            self.isUpt = false
                            this.getUserInfo()
                        } else {
                            this.$message.warning(res.msg)
                        }
                    })
                }).catch(() => {
                })
            }
        },
        saveUserInfo() {
            let self = this
            if (self.password === '' || self.newPassword === '' || self.renewPassword === '') {
                this.$message.warning('内容不能为空')
                return
            }
            if (self.newPassword !== self.renewPassword) {
                this.$message.warning('两次密码不一致')
                return
            }
            this.$confirm('此操作将修改用户密码, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    url: api.uptPassword,
                    method: 'POST',
                    data: {
                        password: self.password,
                        newPassword: self.newPassword
                    }
                }
                this.sendReq(params, res => {
                    if (res.status === 200) {
                        this.$message.success('修改成功，请重新登录')
                        Cookie.remove('token')
                        this.setUserInfo({})
                        this.setCartNumber('')
                        this.setShoppingCart({})
                        this.setNewAddress({})
                        this.setAreaCode([])
                        this.$router.push({ path: '/login', query: { type: 2 } })
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            }).catch(() => {
            })
        }
    }
}
</script>

<style lang="less" scoped>
.userInfo {
    padding: 30px;
    border: 1px solid #E5E5E5;

    .userNameBox {

        // 部分替换为less语法
        // >>>.el-input {
        //     width: 180px;
        // }
        .el-input {
            width: 180px;
        }



        span {
            color: #333333;
            text-decoration: none;
            cursor: default;
        }
    }

    .userBlock {
        margin-top: 30px;
        display: flex;
        align-items: center;

        label {
            font-weight: normal;
            font-size: 16px;
            color: #666666;
            width: 100px;
        }
    }

    .bindPhoneBox {
        .phoneInfo {
            font-size: 16px;

            // 部分替换为less语法
            // >>>.el-input {
            //     width: 130px;
            // }
            .el-input {
                width: 130px;
            }

            span {
                margin-right: 15px;
                text-decoration: underline;
                cursor: pointer;
            }

            span:nth-child(1) {
                color: #333333;
                text-decoration: none;
                cursor: default;
            }

            span:nth-child(2) {
                // 替换变量
                // color: $mainColor;
                color: #FF7800;
                margin-left: 10px;
            }

            span:nth-child(3) {
                color: #666666;
            }
        }
    }

    .userInfoSave {
        margin: 50px 0 0 100px;
        width: 115px;
        height: 30px;
        line-height: 30px;
        background: #FFFFFF;
        // 替换变量
        // border: 1px solid $mainColor;
        border: 1px solid #FF7800;

        border-radius: 4px;
        text-align: center;
        // 替换变量
        // color: $mainColor;
        color: #FF7800;
        cursor: pointer;
    }
}
</style>