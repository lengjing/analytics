---
id: how-to-use
title: 如何使用
sidebar_label: 如何使用
---

## 将 analytics.js 添加到网站中

### 常规方式 (暂不支持)

将以下代码添加到网页中。

```javascript
<!-- Mwee Analytics -->
<script>
(function(i,s,o,g,r,a,m){i['MweeAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.mwee.cn/analytics.js','ma');

ma('send', 'pageview');
</script>
<!-- End Mwee Analytics -->
```

这是使用 `ma.js` 最简单的方法，上述代码主要做了以下几件事:

1. 创建了一个 `<script>` 元素，并开始从 `https://www.mwee.cn/analytics.js` 异步下载 analytics.js 。
2. 初始化了一个全局函数 `ma`（称为 `ma()` 命令队列），你可以通过该函数来执行所有 `ma` 的方法。
3. 在 `ma()` 命令队列中添加另一条命令，发送自埋点数据。

### 异步加载方式 (暂不支持)

或者可以用现代浏览器所支持的预加载功能的方式来引用。

```javascript
<script>
window.ma=window.ma||function(){(ma.q=ma.q||[]).push(arguments)};ma.l=+new Date;

ma('send', 'pageview');
</script>
<script async src='https://www.mwee.cn/analytics.js'></script>
```

注意：只有当你确定大多数的网站访问者都使用现代浏览器的时候才使用。

### npm 包引用方式

可以直接使用 npm 包的方式来引入。

```bash
npm install mw-analytics --registry=http://nexus.mwbyd.cn/nexus/content/groups/npm-group/
```