#!/bin/bash
# 根据提交记录获取当前应该升级的版本号
bump=`conventional-recommended-bump -p angular`
echo $bump
# 升级 package.json 中version的版本号
npm --no-git-tag-version version $bump &>/dev/null
# 生成 CHANGELOG.md 文件
conventional-changelog -i CHANGELOG.md -p angular -c changelog.json -s
