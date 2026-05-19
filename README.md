# 纪念日时间计算器

一个纯前端的纪念日时间计算器网站，无需后端数据库，所有数据保存在浏览器本地。

## ✨ 功能特性

- 📅 **倒计时** - 创建重要事件的倒计时提醒
- 📊 **天数计算器** - 计算两个日期之间相差的天数
- 🎂 **生日倒计时** - 记录生日，每年自动提醒
- 💕 **恋爱纪念日** - 记录爱情的美好时光
- 🎉 **节日倒计时** - 热门节日提前知道
- 🌓 **深色/浅色模式** - 支持主题切换
- 📱 **响应式设计** - 完美适配手机和电脑
- 🔒 **隐私保护** - 所有数据保存在本地

## 🚀 快速开始

### 部署到 GitHub Pages

1. 点击右上角的 "Use this template" 或 Fork 这个仓库
2. 进入仓库的 Settings
3. 在 "Pages" 部分，选择 "main" 分支，点击 "Save"
4. 几分钟后，你的网站就可以访问了！

### 本地运行

直接用浏览器打开 `index.html` 文件即可。

## 📂 文件结构

```
.
├── index.html          # 首页
├── countdown.html      # 倒计时页面
├── days-calculator.html # 天数计算器页面
├── birthday.html       # 生日倒计时页面
├── love.html           # 恋爱纪念日页面
├── holidays.html       # 节日倒计时页面
├── styles.css          # 样式文件
├── script.js           # 脚本文件
├── sitemap.xml         # SEO 站点地图
└── README.md           # 说明文档
```

## 🔧 自定义配置

### 修改网站标题和描述

编辑各个 HTML 文件中的 `<title>` 和 `<meta>` 标签。

### 修改域名

将 `sitemap.xml` 和各个 HTML 文件中的 `https://yourusername.github.io/` 替换为你的实际域名。

### 添加更多节日

在 `script.js` 中的 `POPULAR_HOLIDAYS` 数组中添加。

### 修改主题颜色

在 `styles.css` 的 `:root` 部分修改 CSS 变量。

## 🎨 技术栈

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage

## 📄 许可证

MIT License

## 🌟 特色

- 代码整洁，结构清晰
- 完整的 SEO 优化
- 支持深色/浅色模式
- 响应式设计
- 无依赖，轻量级