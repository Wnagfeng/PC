<template>
    <div class="layout">
        <site-nav></site-nav>
        <cere-header></cere-header>
        <div class="main">
            <router-view></router-view>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from '@/components/base/footer'
import SiteNav from '@/components/base/siteNav'
import CereHeader from '@/components/canvasShow/cereshop/pc/header'
export default {
    name: 'layout',
    components: { Footer, SiteNav, CereHeader }
}
</script>
<style scoped lang='scss'>
.layout {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    // background-color: aqua;

    .main {
        // height: auto;
        flex: 1;
    }
}
</style>