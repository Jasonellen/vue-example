// 用于在控制台输出各种颜色的信息
var chalk = require('chalk')
// 用于净化版本字符串‘v=3.2.1’ -> '3.2.1'
var semver = require('semver')
// package信息
var packageConfig = require('../package.json')
// 用于unix命令行操作
var shell = require('shelljs')
// 输出命令行结果，
// exec('node -v') ->我的node将输出 v7.2.1
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [
  {
    name: 'node',
		//格式化操作  例如semver.clean(v7.2.1) -> 7.2.1
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
]

if (shell.which('npm')) { //检测是否有安装npm
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
		//判断当前版本是否满足要求版本
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('你的安装包不匹配，请检查项目版本要求'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1) //结束进程
  }
}
