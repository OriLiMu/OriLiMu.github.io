#!/bin/bash

# 自动推送脚本
# 每30分钟检查并推送仓库更改

cd /home/lizhe/CodeOri/OriLiMu.github.io

# 检查是否有未提交的更改
if [[ -n $(git status --porcelain) ]]; then
    echo "发现更改，开始提交和推送..."

    # 添加所有更改
    git add .

    # 创建提交信息（包含时间戳）
    commit_message="自动提交: $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$commit_message"

    # 推送到远程仓库
    git push origin main

    echo "推送完成: $commit_message"
else
    echo "没有发现更改，跳过推送。"
fi

echo "最后检查时间: $(date '+%Y-%m-%d %H:%M:%S')"