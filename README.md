## mukevideo概述

 mukevideo是一个使用react native实现一个兼容ios，android的视频播放器并带有完整的类似qq的导航框架



## Install

```javascript
//码云地址
git clone https://gitee.com/codeveryday/mukevideo
//或者github地址
git clone https://github.com/codeverydaya/mukevideo.git

cd mukevideo
yarn install

```



## 第三方库

| 库名字                       | 版本   | 描述                         |
| :--------------------------- | ------ | ---------------------------- |
| react-native                 | 0.59.8 | rn主库，提供rn基础功能       |
| react-native-video           | 5.0.0  | 视频播放组件                 |
| react-native-linear-gradient | 2.5.6  | 渐变色组件                   |
| react-native-orientation     | 3.1.3  | 控制屏幕的方向               |
| react-navigation             | 3.11.1 | 用于app导航                  |
| react-native-gesture-handler | 1.3.0  | 用于react navigation手势处理 |



## 功能介绍

- 调节倍速播放
- 视频的播放暂停
- 分辨率的适配
- 播放进度的调节
- 动画的效果制作
- 全屏的两种实现
- 构建出一个完整的类似qq的导航框架



## 效果图

<div style="float:left">
<img src="https://user-gold-cdn.xitu.io/2020/1/17/16fb4152f0a2fa92?w=750&h=1334&f=png&s=49273" alt="开屏页" height="350" width="200">
<img src="https://user-gold-cdn.xitu.io/2020/1/17/16fb41c5f4cf6f3d?w=750&h=1334&f=png&s=1406525" alt="热门页面" height="350" width="200">
<img src="https://user-gold-cdn.xitu.io/2020/1/17/16fb41c9f458b356?w=750&h=1334&f=png&s=586107" alt="抽屉页面" height="350" width="200">
<img src="https://user-gold-cdn.xitu.io/2020/1/17/16fb41cb1416bb1c?w=750&h=1334&f=png&s=108719" alt="我" height="350" width="200">
<img src="https://user-gold-cdn.xitu.io/2020/1/17/16fb41ce0324cce8?w=750&h=1334&f=png&s=212661" alt="视频播放--竖屏" height="350" width="200">
<img src="https://user-gold-cdn.xitu.io/2020/1/17/16fb41cf3258d935?w=1334&h=750&f=png&s=495504" alt="视频播放---横屏" height="200" width="350">
</div>





## 番外篇

本项目是我在慕课网讲的一门课程([React native开发播放器](https://www.imooc.com/learn/1207))，课程主要讲解一下内容，大家有需要可以去学习



#### 课程内容

1. react navigation常用导航器
2. react navigation导航器组合使用，实战类似qq导航器
3. react navigation原理的深入与源码解读
4. react-native-video的使用与配置
5. 视频播放器全屏适配
6. react native触摸事件处理与播放器的结合



#### 课程目录

| 章                                  | 节                           |
| ----------------------------------- | ---------------------------- |
| 第一章 导学与环境构建               | 1.1 导读                     |
|                                     | 1.2 慕课视频功能展示         |
|                                     | 1.3 环境搭建                 |
|                                     | 1.4 环境与项目结构           |
| 第二章 react navigation构建导航框架 | 2.1 react navigation概述     |
|                                     | 2.2 初识react navigation     |
|                                     | 2.3 详解栈导航器             |
|                                     | 2.4 深入react navigation原理 |
|                                     | 2.5 其他三种导航器略讲       |
|                                     | 2.6 类似qq导航框架的实现     |
|                                     | 2.7 抛砖引玉的源码阅读       |
| 第三章 产品设计—视频播放器          | 3.1 需求分析与结构构建       |
|                                     | 3.2 UI实现视频控制层         |
|                                     | 3.3 视频控制层的显隐         |
|                                     | 3.4 可以触控的进度条         |
|                                     | 3.5 全屏实现方案一           |
|                                     | 3.6 全屏实现方案二           |
| 第四章 课程总结                     | 4.1 课程总结                 |



## License

[BSD](./LICENSE.txt). Copyright (c) [codeveryday](https://github.com/codeverydaya).
