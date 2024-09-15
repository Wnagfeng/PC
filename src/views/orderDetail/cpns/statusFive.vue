<template>
    <div class="process">
        <div class="box">
            <img src="../../../static/image/submit@2x.png" alt="">
            <p>提交订单</p>
            <p class="mar-top-10">{{createTime}}</p>
        </div>
        <div class="spot">
            <img src="../../../static/image/line@2x.png" alt="">
        </div>
        <div class="box">
            <img src="../../../static/image/order@2x.png" alt="">
            <p>订单处理</p>
        </div>
        <div class="spot">
            <img src="../../../static/image/line@2x.png" alt="">
        </div>
        <div class="box">
            <img src="../../../static/image/examine@2x.png" alt="">
            <p>审核通过</p>
        </div>
        <div class="spot">
            <img src="../../../static/image/line@2x.png" alt="">
        </div>
        <div class="box">
            <img src="../../../static/image/complete@2x.png" alt="">
            <p>已关闭</p>
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
