<template>
    <div class="footer">
        <div class="banxin">
            <div class="top">
                <div class="leftBox">
                    <p class="title">客服电话</p>
                    <p class="number">400 111 2222</p>
                    <p class="time">08:00-22:00</p>
                </div>
                <div class="centerBox">
                    <p class="title">服务支持</p>
                    <p>7天无理由退货</p>
                    <p>15免费换货</p>
                    <p>预约维修服务</p>
                </div>
                <div class="rightBox">
                    <div class="aboutUs">
                        <p class="title">关于我们</p>
                        <p class="cur-poi">了解我们</p>
                        <p class="cur-poi">合作咨询</p>
                        <p class="cur-poi">加入我们</p>
                    </div>
                    <div class="qrCode">
                    </div>
                </div>
            </div>
            <p class="bottom"></p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    }
}
</script>
<style lang="less" scoped>
.footer {
    width: 100%;
    height: 180px;

   
    background-color: #F1F2F7;
    opacity: 0.82;
    overflow: hidden;

    .banxin {
        width: 1252px;
        height: 100%;
        margin: 0 auto;

        .top {
            margin-top: 20px;
            display: flex;
            margin-bottom: 38px;
            text-align: center;

            .leftBox {
                flex: 1;
                display: flex;
                flex-direction: column;

                .title {
                    font-size: 16px;
                    margin-bottom: 33px;
                }

                .number {
                    font-size: 40px;
                    margin-bottom: 12px;
                    font-weight: 500;
                }

                .time {
                    font-size: 18px;
                    margin-bottom: 33px;
                }

                .consult {
                    cursor: pointer;
                    margin: 0 auto;
                    width: 220px;
                    height: 36px;
                    line-height: 36px;
                    border: 1px solid #FFFFFF;
                    box-sizing: border-box;
                    opacity: 0.6;
                }
            }

            .centerBox {
                flex: 1;
                // 修改scss变量为less固定样式
                //border-left: 2px solid rgba($color: #FFFFFF, $alpha: 0.15);
                //border-right: 2px solid rgba($color: #FFFFFF, $alpha: 0.15);
                border-left: 2px solid rgba(255, 255, 255, 0.15);
                border-right: 2px solid rgba(255, 255, 255, 0.15);

                p {
                    font-size: 16px;
                    line-height: 25px;
                }

                .title {
                    margin-bottom: 33px;
                }
            }

            .rightBox {
                flex: 1;
                display: flex;

                .aboutUs {
                    flex: 1;

                    p {
                        margin-bottom: 20px;
                    }

                    .title {
                        margin-bottom: 33px;
                    }
                }

                .qrCode {
                    flex: 1;

                    .title {
                        margin-bottom: 33px;
                    }

                    img {
                        width: 106px;
                        height: 106px;
                    }
                }
            }
        }

        .bottom {
            text-align: center;
            font-size: 12px;
            line-height: 24px;
            color: #444444;
        }
    }
}
</style>
