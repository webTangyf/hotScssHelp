const PROJECTNAME = 'test'
module.exports = {
	entry: './public',
	open: `/${PROJECTNAME}/index.html`,
	// 监听单文件更新的文件夹
	listen: [
		`./public/${PROJECTNAME}/*`
	],
	// 公共区域文件夹
	publicListen: `./public/${PROJECTNAME}/src`,
	port: 3000,
	sassOutputStyle: 'expanded' // nested, expanded, compact, compressed node-sass 官方类型
}