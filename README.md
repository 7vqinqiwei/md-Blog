<p align="center">
    <a href="https://www.ycmbcd.com" rel="nofollow">
        <img width="240" src="https://raw.githubusercontent.com/ycmbcd/images_repo/master/md-blog/logo.png">
    </a>
</p>

# md-Blog
[![licenses](https://img.shields.io/github/license/ycmbcd/md-Blog.svg?style=flat)](https://opensource.org/licenses/MIT)
[![apache](https://img.shields.io/badge/Apache-%5E2.4.33-orange.svg)](http://www.apache.org/dyn/closer.cgi)
[![nginx](https://img.shields.io/badge/Nginx-%5E1.14.2-red.svg)](http://nginx.org/)
[![php](https://img.shields.io/badge/php-%5E5.0-blue.svg)](http://www.php.net/downloads.php)
![size](https://img.shields.io/github/languages/code-size/ycmbcd/md-Blog.svg?style=flat)
[![release](https://img.shields.io/github/release/ycmbcd/md-Blog.svg?style=flat)](https://github.com/7vqinqiwei/md-Blog/releases)
[![download](https://img.shields.io/badge/Downloads-click-brightgreen.svg)](https://github.com/7vqinqiwei/md-Blog/releases)

> 欢迎使用 md-Blog，本博客系统可以将 MarkDown 文件生成一个全静态页面的站点blog，且不需要数据库的依赖。注：本博客系统不提供 MarkDown编辑器 功能。

## 演示（Demo）

[![demo](https://img.shields.io/badge/Demo-ycmbcd.com-brightgreen.svg)](https://www.ycmbcd.com) https://www.ycmbcd.com

# 说明文档 API

具体安装配置教程可参考此文档：
https://www.ycmbcd.com/wiki/

## 特色

1. 支持文章付款码、二维码打赏功能（例：`微信`、`支付宝`）；
1. 整合谷歌广告联盟 `Google Adsense` 投放;
1. 支持视频、音频插入播放功能（例：`mp4`、`mp3`）。
1. 整合社会化评论 `畅言` 评论模块；
1. 整合 `百度统计`；
1. 支持文章 `置顶`；
1. 多种 `代码高亮` 样式自定义（需要点击`全站静态生成`重新生成页面）；
1. 代码块 `一键复制`；
1. 支持 `数学公式`（$a_n+1=a_{n+1}+\sqrt{n}+\frac{1}{n}$）；
1. Blog 主色调修改（需要点击`全站静态生成`重新生成页面）；
1. 每页条数自定义（需要点击`全站静态生成`重新生成页面）；
1. `Fork me on GitHub` 及 `GitHub 彩带`功能；
1. 多种列表、页码 `动画效果`；
1. 段落 `开头对齐` 设置；
1. `备案号` 选填。

## 配置需求

[![apache](https://img.shields.io/badge/Apache-%5E2.4.33-orange.svg)](http://www.apache.org/dyn/closer.cgi)
[![nginx](https://img.shields.io/badge/Nginx-%5E1.14.2-red.svg)](http://nginx.org/)
[![php](https://img.shields.io/badge/php-%5E5.0-blue.svg)](http://www.php.net/downloads.php)

Apache / Nginx
PHP 5 以上

## 安装

0. 配置修改后，如无效，请清空浏览器缓存，点击 `全站静态生成`；
1. 上传文件夹到站点根目录；
2. 输入网址登录，初次使用会提示密码设置。

## 使用

有 `ssl认证` 的网站浏览器访问：`https://您的域名/set/`
无 `ssl认证` 的网站浏览器访问：`http://您的域名/set/`
进行博客参数配置及页面生成，参照图：
![IMAGE](https://raw.githubusercontent.com/ycmbcd/images_repo/master/md-blog/0.jpg)

将你本地的 `MarkDown` 目录上传至网站根目录 `/md` 目录下
注意：本博客只支持一级栏目划分，请参照下列结构：

```html
/md
/md/西游记
/md/西游记/第一章.md
/md/西游记/第二章.md
...
/md/红楼梦
/md/红楼梦/第一回.md
/md/红楼梦/第二回.md
...
```
放入后点击 `全站静态生成` 按钮，拿起茶杯的功夫，系统便自动生成好了您的博客。

## 目录

- /blog ... 存放博客网页文件
- /data ... 存放系统生成的站点数据
- /index ... 由系统生成的index列表
- /md ... 用户 MarkDown 文件放置文件夹
- /set ... 站点配置
- /set/api ... 系统功能
- /static ... 层叠样式表、JavaScript及第三方依赖
- /tpl ... 模板目录
- /favicon.ico ... 博客图标
- /index.html ... 系统生成的博客主页

## 系统更新

保留以下目录，更新其他目录即可。
- /data ... 参数配置及站点数据文件夹
- /md ... 您的 MarkDown 文件夹
- /tpl ... （可选）如模板自定义，请保留
- /static ... （可选）如模板自定义，请保留

## Tips

- 目录名不要出现空格，否则图片会挂；
- .md 文件中的空格用  `&nbsp;` 代替；
- 图片格式： `![图片名](图片地址)`，图片地址使用相对路径的图片，请保存在该 `.md` 文件夹内新建的文件夹中，如：`/md/demo/test.md`，图片可以保存在`/md/demo/images/pic.jpg`，请不要与文件同文件夹，否则会生成为一个博客，上传后的 `/md` 文件夹及其图片文件夹请保留，博客图片路径为原图片路径(为节约服务器容量及管理方便)；
```html
![IMAGE](images/pic.jpg)
```
- 对于Windows用户，无法生成以中文开头的文档和栏目的，请修改 /set/api/目录下：read_md.php、read_item.php。 两个文件，将注释切换为中文。默认是 Linux系统；
``` php
setlocale(LC_ALL, 'zh_CN.GBK'); // windows
setlocale(LC_ALL, 'zh_CN.UTF8'); // linux
```
- 如无法生成页面，请将目录赋予Apache来执行；
```bash
chown -R apache:apache * #在站点根目录执行
```
- 忘记密码或者修改密码，直接删除 `/data/blog.lock` 文件即可。

## 二次开发

1. 您可以在 `/tpl`,`/static` 目录中对博客模板样式进行开发；
2. 集成 JQuery，`/static/lib/jquery-3.3.1.min.js`；
3. 集成 Font-Awesome 图标库， `/static/lib/font-awesome-4.7.0/css/font-awesome.min.css`；
3. 响应式 UI 集成 snack， `/static/lib/snack.min.css` 参考：https://nzbin.github.io/snack/。

## 鸣谢

* SegmentFault Team &nbsp; https://segmentfault.com/
* MathJax &nbsp; https://www.mathjax.org/
* Clipboard.js &nbsp; https://github.com/zenorocha/clipboard.js/
* Font-awesome &nbsp; https://github.com/FortAwesome/Font-Awesome/
* Hover.css &nbsp; https://github.com/IanLunn/Hover/
* Highlight.js &nbsp; https://github.com/highlightjs/highlight.js/
* Snack &nbsp; https://github.com/nzbin/snack

## License
[![](https://img.shields.io/github/license/ycmbcd/md-Blog.svg?style=flat)](https://opensource.org/licenses/MIT)

## 联系我
ycmbcd@foxmail.com

## 感谢您的支持与厚爱

![IMAGE](https://raw.githubusercontent.com/ycmbcd/images_repo/master/md-blog/temp.jpg)
