---
id: command-queue
title: 命令队列
sidebar_label: 命令队列
---

## ma 命令队列

为了让跟踪代码段尽可能小，`ma()` 命令队列以超载方式接受多种不同格式的参数。

|函数签名| |
|---|---|
|`ma(command, [...fields], [fieldObj])` | 使用下列函数签名来调用 `ma()` 命令队列会将命令加入队列，以便在库加载后调度执行。|
|`ma(readyCallback)`|如果在调用 ma() 命令队列函数时向其传递一个函数，会将该函数的执行安排在队列中的下一位置。由于只有在 analytics.js 库完全载入之后才能执行命令，向命令队列传递函数最常见的情况是指定回调函数，以便在 analytics.js 库完全载入和可用时调用。|

## 将命令添加至队列

使用下列函数签名来调用 ma() 命令队列会将命令加入队列，以便在库载入后调度执行。

用法

```javascript
ma(command, [...fields], [fieldsObject])
```

参数

| 名称 | 类型 | 是否必须 | 说明 |
| ---- | ---- | ---- | ---- |
| command| string |是|一个标识符 `[trackerName.]methodName`|
|...fields|any|否|一个或多个可选便捷参数，用于快速指定常用字段。|
|fieldsObject|object|否|用于指定 fields 参数中未指定的其余值的对象。|

## 使用回调方法

如果在调用 `ma()` 命令队列函数时向其传递一个函数，会将该函数的执行安排在队列中的下一位置。

用法

```javascript
ma(readyCallback)
```

## 使用命令方法

下面列出了可以传递给 `ma()` 命令队列的所有方法

### send

上报信息

用法

```javascript
ma('[trackerName.]send', [hitType], [...fields], [fieldsObject]);
```

参数

|hitType|...fields|
|--|--|
|pageview||
|event|eventCategory、eventAction|
|biz||

示例

```javascript
// 发送页面信息
ma('send', 'pageview');

// 发送埋点信息
ma('send', 'event', {
  field1: 1,
  field2: 2
});


// 或者
ma('send', {
  hitType: 'pageview',
})

ma('send', {
  hitType: 'event',
  field1: 1,
  field2: 2
})

```

### set

在 tracker 对象上设置一个或一组字段/值对。

用法

```javascript
// 设置一个字段
ma('[trackerName.]set', fieldName, fieldValue);
// 设置一组值
ma('[trackerName.]set', fieldsObject);
```

参数

示例

```javascript
ma('set', 'model', '1111');

ma('set', {model: '1111'});
```

注意只有被 `analytics` hook 的字段才会被作为请求参数发送，可以发送的字段有

请求参数部分

- platform
- appName
- language
- languageApp
- timestamp
- location
- cityId
- version
- build
- channel
- distinctId
- versionOS
- sysName
- model
- screen
- net
- versionSDK
- userId
- phone
- pathApp
- protocol
- domain
- pathWeb
- hash
- biz
- container 载体
- mwid 美味id

请求配置部分

- transportUrl 请求链接
- transport 请求方式
- useBeacon 是否使用 beacon 默认 false
- env 接口环境 默认 test
- hitPayload 请求数据
- sendHitTask 请求方法
- hitCallback 请求回调
