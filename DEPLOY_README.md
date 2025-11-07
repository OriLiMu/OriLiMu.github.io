# 思维方法笔记自动部署到Hexo系统

## 📋 系统概述

这个系统会自动将 `~/OriNote/notes/Ori/思维方法/` 文件夹中的所有markdown文件转换并部署到Hexo博客中，将 `[[文件名]]` 格式的内部链接转换为标准的网页链接。

## 🚀 快速开始

### 1. 测试部署（推荐先测试）
```bash
cd ~/CodeOri/OriLiMu.github.io
./test_deploy.js
```

### 2. 设置每小时自动部署
```bash
cd ~/CodeOri/OriLiMu.github.io
./setup_hourly_deploy.sh
```

## 📁 文件说明

- `auto_deploy_notes.js` - 主要的部署脚本
- `test_deploy.js` - 测试部署脚本
- `setup_hourly_deploy.sh` - 设置定时任务脚本
- `hourly_deploy.sh` - 每小时执行的脚本（自动生成）

## 🔧 功能特性

### ✅ 已实现功能
1. **文件拷贝** - 不修改原文件，安全复制处理
2. **链接转换** - `[[文件名]]` → `[文件名](/YYYY/MM/DD/文件名/)`
3. **Hexo适配** - 自动添加front matter
4. **定时执行** - 每小时自动同步一次
5. **日志记录** - 完整的操作日志

### 🔗 链接转换规则

#### 基本转换
- `[[做事原则方法]]` → `[做事原则方法](/2025/11/07/做事原则方法/)`

#### 带锚点转换
- `[[文件名#锚点]]` → `[文件名](/2025/11/07/文件名/#锚点)`

#### 未找到文件的处理
- `[[不存在文件]]` → `⚠️[不存在文件](javascript:void(0))`

## 📊 目录结构

```
源文件： ~/OriNote/notes/Ori/思维方法/做事原则方法.md
目标文件： ~/CodeOri/OriLiMu.github.io/source/_posts/做事原则方法.md
网页URL： https://orilimu.github.io/2025/11/07/做事原则方法/
```

## 📝 日志文件

- `deploy_log.txt` - 主部署日志
- `hourly_deploy.log` - 每小时部署日志

## ⚙️ 配置说明

在 `auto_deploy_notes.js` 中可以修改以下配置：

```javascript
const CONFIG = {
    sourceDir: '/home/lizhe/OriNote/notes/Ori/思维方法',      // 源文件目录
    hexoPostsDir: '/home/lizhe/CodeOri/OriLiMu.github.io/source/_posts', // Hexo文章目录
    hexoRoot: '/home/lizhe/CodeOri/OriLiMu.github.io',         // Hexo根目录
    logFile: '/home/lizhe/CodeOri/OriLiMu.github.io/deploy_log.txt'    // 日志文件
};
```

## 🔍 故障排除

### 1. 检查Node.js环境
```bash
node --version
npm --version
```

### 2. 检查Hexo环境
```bash
cd ~/CodeOri/OriLiMu.github.io
npx hexo --version
```

### 3. 手动查看日志
```bash
tail -f hourly_deploy.log
```

### 4. 移除定时任务
```bash
crontab -l | grep -v "hourly_deploy.sh" | crontab -
```

## 🚨 注意事项

1. **不修改源文件** - 所有操作都在副本上进行
2. **自动添加front matter** - 每个文件都会添加Hexo所需的元数据
3. **链接完整性** - 系统会尝试找到所有链接的目标文件
4. **错误处理** - 单个文件失败不会影响整体部署

## 📈 部署流程

```
每小时触发 → 复制文件 → 转换链接 → 添加front matter → 部署到Hexo → 重新生成网站
```

## 🎯 预期效果

- 思维方法文件夹中的所有markdown文件都会同步到Hexo博客
- 所有内部链接都变成可点击的网页链接
- 网站每小时自动更新一次
- 保持原笔记文件完全不变

## 📞 支持

如果遇到问题，请查看日志文件或手动运行测试脚本进行调试。