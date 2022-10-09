# 1  使用husky 触发GitHooks钩子
[链接](https://juejin.cn/post/6974301879731748900)

"prepare": "husky install",
安装husky=》生成.husky文件=》pre-commit中执行npm test=》读取package.json=>"test": "node scripts/test.js"
- 也可以指定自己的文件 npx husky add .husky/commit-msg 'node [dir]/filename.js' # 指定目录文件

[husky](https://juejin.cn/post/7038143752036155428#heading-4)
npx --no-install commitlint --edit "$1"


# 2 vue-cli 中使用gitHooks
[vue-cli 使用githooks](https://juejin.cn/post/6844904063969001480)

安装vue-cli时生成yorkie=》生成.git/hooks文件 =》执行一些 git 命令的时候，比如：git push, git commit等，git 就会执行相应的 hook。
=》pre-commit hook=》node `./node_modules/yorkie/src/runner.js` pre-commit=》读package.json
=>执行key=value对象的脚本

[步骤](https://blog.csdn.net/weixin_32304201/article/details/124608215)
```
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "commitlint -E GIT_PARAMS"
  },
  "lint-staged": {
    "*.{js,jsx,vue}": [
      "pretty-quick --staged",
      "git add"
    ]
  },
```



ps：`MAC查看隐藏文件 shift+command+. `