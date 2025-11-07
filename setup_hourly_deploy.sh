#!/bin/bash

# 设置每小时自动部署脚本的安装脚本

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="$SCRIPT_DIR/hourly_deploy.log"
CRON_LOG="$SCRIPT_DIR/cron_setup.log"

echo "[$(date)] 🚀 开始设置每小时自动部署..." | tee -a "$LOG_FILE"

# 确保脚本可执行
chmod +x "$SCRIPT_DIR/auto_deploy_notes.js"

# 创建每小时执行的脚本
cat > "$SCRIPT_DIR/hourly_deploy.sh" << 'EOF'
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
EOF

chmod +x "$SCRIPT_DIR/hourly_deploy.sh"

# 设置cron任务
CRON_JOB="0 * * * * $SCRIPT_DIR/hourly_deploy.sh"

# 检查是否已存在相同的cron任务
if crontab -l 2>/dev/null | grep -q "hourly_deploy.sh"; then
    echo "[$(date)] ℹ️  检测到已存在的定时任务，先删除..." | tee -a "$LOG_FILE"
    crontab -l 2>/dev/null | grep -v "hourly_deploy.sh" | crontab -
fi

# 添加新的cron任务
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "[$(date)] ✅ 每小时自动部署设置完成!" | tee -a "$LOG_FILE"
echo "[$(date)] 📋 定时任务: 每小时的第0分钟执行" | tee -a "$LOG_FILE"
echo "[$(date)] 📁 日志文件: $LOG_FILE" | tee -a "$LOG_FILE"

# 显示当前cron任务
echo "[$(date)] 📅 当前定时任务列表:" | tee -a "$LOG_FILE"
crontab -l 2>/dev/null | tee -a "$LOG_FILE"

echo "[$(date)] 🎉 设置完成! 您的笔记将在每小时自动同步到Hexo网站" | tee -a "$LOG_FILE"