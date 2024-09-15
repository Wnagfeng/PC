<template>
    <div class="process">
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
            <img src="../../../static/image/payment_grey@2x.png" alt="">
            <p>付款成功</p>
        </div>
        <div class="spot">
            <p></p>
            <img src="../../../static/image/huidiandian@2x.png" alt="">
        </div>
        <div class="box">
            <img src="../../../static/image/transport_grey@2x.png" alt="">
            <p>等待收货</p>
        </div>
        <div class="spot">
            <p></p>
            <img src="../../../static/image/huidiandian@2x.png" alt="">
        </div>
        <div class="box">
            <img src="../../../static/image/complete_grey@2x.png" alt="">
            <p>完成</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['createTime'],
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
        p{
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translate(-50%, 0);
        }
    }
}
</style>
