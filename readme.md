# 北冥有鱼 下位机node服务端

* 海洋航行器比赛使用的上下位机（比赛改良过的，比赛之前不够稳定）
* 技术栈：[Koa.js](https://koa.bootcss.com/) [pymavlink](https://www.ardusub.com/developers/pymavlink.html)(后端) [Vue.js](https://vuejs.org/)(前端)
* 在线展示：(在线仅展示前端) [https://yphub.github.io/BMGC](https://yphub.github.io/BMGC)

<hr>

> &nbsp;
> 1. 基于vue-cli webpack模版进行前端开发
> 2. 利用localStorage进行本地设置储存
> 3. 支持手柄、键盘、移动端操作
> 4. 控制pixhawk飞控基本功能
> 5. 支持自定义手柄按键、键盘按键(开发中)
> &nbsp;

> <hr>

* 开发&配置过程
* 上位机要求：主流浏览器(Chrome、Edge、Safari、FireFox、移动端(横屏))
* 下位机要求：Linux ([Node.js](https://nodejs.org) v8+ 、 [Python](https://www.python.org/) 2/3)
* 开发/构建环境要求： 支持Node.js、Python的所有平台、浏览器，依赖npm

```shell
# 复制项目到文件夹
git clone https://github.com/yphub/BMGCnode.git

# 进入目录
cd BMGCnode

# 安装依赖
npm install

# 至此，后端已经搭建完毕，可运行以下命令开启
npm start

# 接下来配置前端，初始化前端子模块并拉取
git submodule init
git submodule update

# 进入目录
cd BMGC

# 安装依赖
npm install

# 构建dist文件夹(供后端koa-static静态文件支持)
npm run build
```