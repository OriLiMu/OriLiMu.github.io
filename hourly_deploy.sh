#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="$SCRIPT_DIR/hourly_deploy.log"

echo "[$(date)] 🕐 开始每小时自动部署..." >> "$LOG_FILE"

# 切换到脚本目录
cd "$SCRIPT_DIR"

# 执行部署
/usr/bin/node auto_deploy_notes.js >> "$LOG_FILE" 2>&1

echo "[$(date)] ✅ 每小时部署任务完成" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"
