#!/bin/bash
# 将 CHANGELOG.md 文件加入git暂缓区域
git add CHANGELOG.md
# 截获 package.json 中version版本号
version=`npm run env | grep npm_package_version= | awk '{print substr($0,21)}' | awk 'NR==1{print}'`
# 提交 CHANGELOG.md 到git仓库
git commit -m "docs(CHANGELOG): update for $version"
# 将 package.json 提交到git仓库，并release版本号.
git add package.json
# 提交版本记录
git commit -m "chore(release): $version"
# git tag 标签
git tag -a "v$version" -m "chore(release): $version"
