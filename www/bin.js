const path = require('path');
const chalk = require('chalk');
const config = require('../config');
const { scssHelp, sampleSassLoader } = require('./scssHelp');


function run () {
	// 创建一个Browsersync实例 
	var bs = require("browser-sync").create();

	// 监听HTML更改事件并重新加载
	let watchPath = path.resolve(__dirname, '../' , config.entry, './**')
	let publicListen = config.publicListen.replace(/[.\/]/g, '')
	bs.watch(watchPath).on("change", file => {
		var filterPath = file.replace(/[.\/]/g, '')
		// 公共匹配
		if (filterPath.includes(publicListen)) {
			if (/(^.+\.scss$)/.test(file)) {
				Promise.all(config.listen
				  .map(d => {
				    return scssHelp(path.resolve(__dirname, '../' ,d)
				  )}))
				  .then(() => {
					  console.log(chalk.green('公共区域热更新完毕'))
				  })
				  .catch((e) => {
				  	console.log(e)
				    console.log(chalk.red('公共区域热更新错误'))
				  })
			} else {
				bs.reload()
			}
		} else {
			if (/(^.+\.scss$)/.test(file)) {
				sampleSassLoader(file)
					.then(() => {
						console.log(chalk.green('单文件sass编译成功'))
					})
					.catch(() => {
						console.log(chalk.red('单文件sass编译出错'));
					})
			} else {
				bs.reload()
			}
		}
	});
	// 现在初始化的Browsersync服务器
	bs.init({
		port: config.port,
		startPath: config.open,
	    server: path.resolve(__dirname, '../' , config.entry)
	});
}
Promise.all(config.listen
  .map(d => {
    return scssHelp(path.resolve(__dirname, '../' ,d)
  )}))
  .then(() => {
	  run()
  })
  .catch(err => {
  	console.log(err)	
    console.log(chalk.red('scss编译过程爆炸，请检查config.js的配置'))
})




