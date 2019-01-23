---
id: how-to-develop
title: 如何开发此项目
sidebar_label: 如何开发此项目
---

## 目录结构

```bash
.
├── README.md
├── __tests__     # 单元测试
├── dist          # 构建产物
├── docs          # 文档
├── mocks         # 辅助
├── package.json  
├── scripts       # 必要脚本
├── src           # ma 源码
│   ├── command.js  # 命令模块用于解析命令
│   ├── data.js     # 底层数据层
│   ├── entry       # 入口
│   ├── filters     # 过滤器
│   ├── hook.js     # hook 模块
│   ├── hooks.js    # 自定义 hook 字段
│   ├── init.js     # 初始化模块（主要用于内联模式）
│   ├── ma.js       # ma 方法
│   ├── model.js    # 模块层
│   ├── mq.js       # method queue
│   ├── ping.js     # 请求模块
│   ├── queue.js    # 队列模块
│   ├── tracker.js  # 追踪类（核心模块）
│   └── util        # 工具
└── website       # 文档站点
```

## entry

该目录下放置了 2 个入口文件，分别用于生成不同的模块。
当执行 `npm run dist` 后，根目录会生成一个 `dist` 目录包含三个文件

- `analytics.common.js`
- `analytics.js`
- `analytics.min.js`

`analytics.common.js` 用于 `npm` 包
`analytics.js` 与 `analytics.min.js` 用于内联（在网页中创建 `script` 标签的方式来引用）

## filter

`filter` 目录下放置了一些 task，用于处理一些异步或同步任务。

## hooks

`hooks` 模块用于设置特定字段的值。
这些字段包含请求参数与请求配置等，其中有部分字段是只读的。比如：`COOKIE_NAME` 这个字段是只读的，用户没有办法修改它。

## 单元测试

框架选用的是 [`jest`](https://jestjs.io/)，具体可以参考官方文档。

单元测试命令为 `npm run test`，如需查看覆盖率可运行 `npm run coverage`。
