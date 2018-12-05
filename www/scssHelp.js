const path = require('path');
const glob = require("glob");
const fs = require('fs');
const chalk = require('chalk');
const nodeSass = require('node-sass');
const config = require('../config');
function scssHelp (publicfile) { // 全文件scss处理
	return new Promise((resolve, reject) => {
		try {
			glob
			  .sync(path.resolve(__dirname, publicfile))
			  .filter(sasspath => /(^.+\.scss$)/.test(sasspath))
			  .forEach(sasspath => {
			  	var filepath = sasspath.replace(/[\\/][^\\/]*\.scss/, '')
			  	var filename = sasspath.replace(/^.+?[\\/]([^[\\/]+?)(\.[^.\\/]*?)?$/gi, '$1')
			  	try {
				  	var result = nodeSass.renderSync({
				  	  file: sasspath,
				  	  outputStyle: config.sassOutputStyle
				  	});
			  		try {
				  		fs.writeFileSync(path.resolve(filepath, `./${filename}.css`),
				  			result.css.toString('utf8'),
				  			{flag: 'w'})
			  			console.log(chalk.green(`update ${sasspath} success`));
			  		} catch(err) {
			  			console.log(err, chalk.red(`created page file ${sasspath} no success`));
			  			reject(err)
			  		}
			  	} catch (err) {
			  		console.log(chalk.red(err.status));
			  		console.log(chalk.red(err.column));
			  		console.log(chalk.red(err.message));
			  		console.log(chalk.red(err.line));
			  		reject(err)
			  		return false;
			  	}
			  })
			  resolve()
		} catch (e) {
			console.log(e)
		}
	})
}
function sampleSassLoader (sasspath) { // 单文件scss处理
	return new Promise((resolve, reject) => {
		try {
			var filepath = sasspath.replace(/[\\/][^\\/]*\.scss/, '')
	  		var filename = sasspath.replace(/^.+?[\\/]([^[\\/]+?)(\.[^.\\/]*?)?$/gi, '$1')
			try {
			  	var result = nodeSass.renderSync({
			  	  file: sasspath,
			  	  outputStyle: config.sassOutputStyle
			  	});
		  		try {
			  		fs.writeFileSync(path.resolve(filepath, `./${filename}.css`),
			  			result.css.toString('utf8'),
			  			{flag: 'w'})
		  			console.log(chalk.green(`update ${sasspath} success`));
		  			resolve()
		  		} catch(err) {
		  			console.log(err, chalk.red(`created page file ${sasspath} no success`));
		  			reject(err)
		  		}
		  	} catch (err) {
		  		console.log(chalk.red(err.status)); // used to be "code" in v2x and below
		  		console.log(chalk.red(err.column));
		  		console.log(chalk.red(err.message));
		  		console.log(chalk.red(err.line));
		  		reject(err)
		  		return false;
		  	}
	  	} catch (e) {
	  		console.log(e)
	  	}
	})
}
module.exports = {
	scssHelp,
	sampleSassLoader
}