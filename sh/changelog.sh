#!/bin/bash
# 复制 package.json 镜像
cp package.json _package.json
# 设置提交规范: angular
preset=`conventional-commits-detector`
echo $preset
# 根据提交记录获取当前应该升级的版本号
bump=`conventional-recommended-bump -p angular`
echo ${1:-$bump}
# 升级 package.json 中version的版本号
npm --no-git-tag-version version ${1:-$bump} &>/dev/null
# 生成 CHANGELOG.md 文件
conventional-changelog -i CHANGELOG.md -s -p ${2:-$preset} -r 0
# 将 CHANGELOG.md 文件加入git暂缓区域
git add CHANGELOG.md
# 截获 package.json 中version版本号
version=`npm run env | grep npm_package_version= | awk '{print substr($0,21)}' | awk 'NR==1{print}'`
# 提交 CHANGELOG.md 到git仓库
git commit -m "docs(CHANGELOG): update for $version"
# 删除本地 _package.json 文件
rm -f _package.json
# 将 package.json 提交到git仓库，并release版本号.
git add package.json package-lock.json
git commit -m "chore(release): $version"
