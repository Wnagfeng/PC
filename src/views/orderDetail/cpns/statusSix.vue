<template>
    <div>
        <div class="process" v-if="type==1">
            <div class="box">
                <img src="../../../static/image/submit@2x.png" alt="">
                <p>提交订单</p>
                <p class="mar-top-10">{{createTime}}</p>
            </div>
            <div class="spot">
                <p class="fs12 font-color-FF7 mar-bot-10">等待付款</p>
                <img src="../../../static/image/xzdiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/pintuan@2x.png" alt="">
                <p>拼团成功</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/huidiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/chuku_grey@2x.png" alt="">
                <p>商品出库</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/huidiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/transport_grey@2x.png" alt="">
                <p>等待收货</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/huidiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/complete_grey@2x.png" alt="">
                <p>完成</p>
            </div>
        </div>
        <div class="process" v-if="type==2">
            <div class="box">
                <img src="../../../static/image/submit@2x.png" alt="">
                <p>提交订单</p>
                <p class="mar-top-10">{{createTime}}</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/line@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/pintuanchengg@2x.png" alt="">
                <p>拼团成功</p>
            </div>
            <div class="spot">
                <p class="fs12 font-color-FF7 mar-bot-10">等待发货</p>
                <img src="../../../static/image/xzdiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/chuku_grey@2x.png" alt="">
                <p>商品出库</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/huidiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/transport_grey@2x.png" alt="">
                <p>等待收货</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/huidiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/complete_grey@2x.png" alt="">
                <p>完成</p>
            </div>
        </div>
        <div class="process" v-if="type==3">
            <div class="box">
                <img src="../../../static/image/submit@2x.png" alt="">
                <p>提交订单</p>
                <p class="mar-top-10">{{createTime}}</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/line@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/pintuanchengg@2x.png" alt="">
                <p>拼团成功</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/line@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/delivery@2x.png" alt="">
                <p>商品出库</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/line@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/transport_orange@2x.png" alt="">
                <p>等待收货</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/huidiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/complete_grey@2x.png" alt="">
                <p>完成</p>
            </div>
        </div>
        <div class="process" v-if="type==4">
            <div class="box">
                <img src="../../../static/image/submit@2x.png" alt="">
                <p>提交订单</p>
                <p class="mar-top-10">{{createTime}}</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/line@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/pintuanchengg@2x.png" alt="">
                <p>拼团成功</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/line@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/delivery@2x.png" alt="">
                <p>商品出库</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/line@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/transport@2x.png" alt="">
                <p>等待收货</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/line@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/complete@2x.png" alt="">
                <p>完成</p>
                <p class="mar-top-10">{{receiveTime}}</p>
            </div>
        </div>
        <div class="process" v-if="type==5">
            <div class="box">
                <img src="../../../static/image/submit@2x.png" alt="">
                <p>提交订单</p>
                <p class="mar-top-10">{{createTime}}</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/line@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/pingtuanshibai@2x.png" alt="">
                <p class="font-color-red">拼团失败</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/huidiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/chuku_grey@2x.png" alt="">
                <p>商品出库</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/huidiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/transport_grey@2x.png" alt="">
                <p>等待收货</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/huidiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/complete_grey@2x.png" alt="">
                <p>完成</p>
            </div>
        </div>
        <div class="process" v-if="type==6">
            <div class="box">
                <img src="../../../static/image/submit@2x.png" alt="">
                <p>提交订单</p>
                <p class="mar-top-10">{{createTime}}</p>
            </div>
            <div class="spot">
                <p class="fs12 font-color-FF7 mar-bot-10">等待成团</p>
                <img src="../../../static/image/xzdiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/pintuan@2x.png" alt="">
                <p>拼团成功</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/huidiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/chuku_grey@2x.png" alt="">
                <p>商品出库</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/huidiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/transport_grey@2x.png" alt="">
                <p>等待收货</p>
            </div>
            <div class="spot">
                <img src="../../../static/image/huidiandian@2x.png" alt="">
            </div>
            <div class="box">
                <img src="../../../static/image/complete_grey@2x.png" alt="">
                <p>完成</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['createTime', 'type', 'receiveTime'],
    data () {
        return {}
    }
}
</script>
<style lang="scss" scoped>
.process{
    width: 100%;
    display: flex;
    text-align: center;
    margin-top: 100px;
    .box{
        flex: 1;
        img{
            width: 35px;
            height: 35px;
            margin-bottom: 20px;
        }
        p{
            font-size: 13px;
        }
    }
    .spot{
        width: 130px;
        position: relative;
        margin-top: 5px;
        img{
            width: 130px;
        }
        p{
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translate(-50%, 0);
        }
    }
}
</style>
