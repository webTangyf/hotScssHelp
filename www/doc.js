var bs = require("browser-sync").create();
const path = require('path');
const config = require('../config');
// 现在初始化的Browsersync服务器
bs.init({
	port: config.docport,
	startPath: '../index.html',
  server: path.resolve(__dirname, '../')
});




