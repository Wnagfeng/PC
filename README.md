# 日志::lock:
# 最终项目最好以本地为主，如果真的要是以这里为主最好down下来，功能全部测试一遍

# 我做的替换全打了标注

```js
   // 替换变量
   // 替换混入
   // 全部替换为less
   // 部分替换为less语法
   //改变源代码
```





# productDetail.vue中也就是加入购物车逻辑中，skuList感觉是他写错了，应该是对象他写成了数组!

这个还是要以具体真实的数据为主先用对象代替了一下

```js
// 监听选择规格参数变化
specSelected(value) {
    console.log(value)
    let sku = ''
    value.forEach((item, sindex) => {
        console.log(item)
        sku += item.attr + ','
    })
    sku = sku.substring(0, sku.length - 1)
    console.log("当前选中的key", sku)
    let s = this.skuList
    // console.log(s)
    // skuList可能是对象，暂时用对象模拟数据，后面改成数组，如果是数组s[sku]取的数据是啥??，除非用key：value去模拟数据！
    this.skuInfo = s[sku]
    console.log("s", s[sku])
}
```

# 商品详情页面的样式需要进行微调，在笔记本上看是刚好的，在副屏上看就分布不是太均匀了，可以考虑调整一下布局，让其更加美观
