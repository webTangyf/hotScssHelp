# hotScssHelp使用说明
## 基本介绍
本项目用于 不想使用sass， 不想使用webpack等模块化打包工具，并且想要scss自动编译，热更新的环境下使用。

## 目录结构

	├── README.md                      使用说明
	├── config.js                      配置项
	├── package.json
	├── public                         默认监听入口
	│   └── test
	│       ├── index.css
	│       ├── index.html
	│       ├── index.scss
	│       └── src
	│           ├── css
	│           ├── js
	│           ├── libs
	│           └── scss
	│               └── base.scss
	├── www                            核心代码
	│   ├── bin.js
	│   └── scssHelp.js              
	└── yarn.lock

## 命令行

	yarn run dev 或者 npm run dev

## 配置项

+ entry文件入口<br>默认值：public<br> 参数类型: 字符串

+ open启动时打开的html页面<br>默认值：'./test/index.html'<br> 参数类型: 字符串

+ listen监听的范围<br>默认值：'./public/test'<br> 参数类型: 字符串<br> 当此文件发生改变时会触发当前页面的刷新

+ publicListen公共监听的范围<br>默认值：'./public/test/src'<br> 参数类型: 字符串<br> 当此文件发生改变时会触发全局页面的刷新

+ port热更新服务端口<br>默认值：3000<br> 参数类型: 数值

+ sassOutputStyle nodeScss打包配置<br> 默认值： 'expanded' <br> 参数类型: 字符串 <br> <a href="https://www.npmjs.com/package/node-sass">具体点击这里进行查看</a>

## 使用方法
在配置项中设置listen位置下添加 html 文件 以及 scss文件，并在html中引入scss文件同名的css文件， 执行命令行即可打开页面，进行开发

