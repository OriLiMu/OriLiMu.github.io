#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const CONFIG = {
    sourceDir: '/home/lizhe/OriNote/notes/Ori/思维方法',
    hexoPostsDir: '/home/lizhe/CodeOri/OriLiMu.github.io/source/_posts',
    hexoRoot: '/home/lizhe/CodeOri/OriLiMu.github.io',
    logFile: '/home/lizhe/CodeOri/OriLiMu.github.io/deploy_log.txt'
};

class HexoDeployer {
    constructor() {
        this.processedFiles = new Set();
        this.linkMapping = new Map();
        this.init();
    }

    init() {
        this.log('🚀 开始Hexo部署流程...');
        this.ensureDirectories();
    }

    log(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}\n`;
        console.log(logMessage.trim());
        fs.appendFileSync(CONFIG.logFile, logMessage);
    }

    ensureDirectories() {
        if (!fs.existsSync(CONFIG.hexoPostsDir)) {
            fs.mkdirSync(CONFIG.hexoPostsDir, { recursive: true });
            this.log('✅ 创建Hexo posts目录');
        }
    }

    // 获取思维方法文件夹中的所有markdown文件
    getSourceFiles() {
        try {
            const files = fs.readdirSync(CONFIG.sourceDir)
                .filter(file => file.endsWith('.md'))
                .map(file => path.join(CONFIG.sourceDir, file));
            this.log(`📁 找到 ${files.length} 个markdown文件`);
            return files;
        } catch (error) {
            this.log(`❌ 读取源文件失败: ${error.message}`);
            return [];
        }
    }

    // 提取文件中的所有链接，建立映射关系
    buildLinkMapping() {
        const sourceFiles = this.getSourceFiles();

        sourceFiles.forEach(filePath => {
            const content = fs.readFileSync(filePath, 'utf8');
            const fileName = path.basename(filePath, '.md');

            // 提取 [[xxx]] 格式的链接
            const linkRegex = /\[\[([^\]]+)\]\]/g;
            let match;

            while ((match = linkRegex.exec(content)) !== null) {
                const linkText = match[1];
                const cleanLink = linkText.split('#')[0]; // 移除锚点

                // 查找对应的文件
                const targetFile = this.findTargetFile(cleanLink, sourceFiles);
                if (targetFile) {
                    const hexoUrl = this.generateHexoUrl(targetFile);
                    this.linkMapping.set(cleanLink, hexoUrl);
                }
            }
        });

        this.log(`🔗 建立了 ${this.linkMapping.size} 个链接映射`);
    }

    // 查找目标文件
    findTargetFile(linkName, sourceFiles) {
        // 直接匹配
        let target = sourceFiles.find(file =>
            path.basename(file, '.md') === linkName
        );

        if (target) return target;

        // 模糊匹配
        target = sourceFiles.find(file =>
            path.basename(file, '.md').includes(linkName) ||
            linkName.includes(path.basename(file, '.md'))
        );

        return target;
    }

    // 生成Hexo URL
    generateHexoUrl(filePath) {
        const fileName = path.basename(filePath, '.md');
        const stats = fs.statSync(filePath);
        const date = stats.mtime;

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `/${year}/${month}/${day}/${fileName}/`;
    }

    // 转换文件内容
    convertContent(content) {
        // 替换 [[xxx]] 为标准markdown链接格式
        let converted = content.replace(/\[\[([^\]]+)\]\]/g, (match, linkContent) => {
            const [linkName, anchor] = linkContent.split('#');
            const cleanLink = linkName.split('#')[0];

            if (this.linkMapping.has(cleanLink)) {
                const hexoUrl = this.linkMapping.get(cleanLink);
                const finalUrl = anchor ? `${hexoUrl}#${anchor}` : hexoUrl;
                return `[${linkName}](${finalUrl})`;
            }

            // 如果没有找到映射，保持原样或添加警告，但不使用 post_link 标签
            return `⚠️[${linkName}](javascript:void(0))`;
        });

        // 检查是否已经有front matter
        if (converted.startsWith('---')) {
            // 已有front matter，需要处理
            const frontMatterEnd = converted.indexOf('---', 3);
            if (frontMatterEnd !== -1) {
                const existingFrontMatter = converted.substring(0, frontMatterEnd + 3);
                const bodyContent = converted.substring(frontMatterEnd + 3);
                const fileName = path.basename(this.currentProcessingFile, '.md');
                const now = new Date().toISOString().split('T')[0];

                // 创建新的标准front matter，保留原有的有用信息
                const newFrontMatter = `---
title: ${fileName}
date: ${now} 00:00:00
tags: 思维方法
categories: 思维方法
---

`;

                converted = newFrontMatter + bodyContent;
            }
        } else {
            // 没有front matter，添加标准front matter
            const fileName = path.basename(this.currentProcessingFile, '.md');
            const now = new Date().toISOString().split('T')[0];

            const frontMatter = `---
title: ${fileName}
date: ${now} 00:00:00
tags: 思维方法
categories: 思维方法
---

`;
            converted = frontMatter + converted;
        }

        return converted;
    }

    // 处理单个文件
    processFile(sourcePath) {
        try {
            this.currentProcessingFile = sourcePath;
            const fileName = path.basename(sourcePath);
            const targetPath = path.join(CONFIG.hexoPostsDir, fileName);

            // 读取源文件内容
            const originalContent = fs.readFileSync(sourcePath, 'utf8');

            // 转换内容
            const convertedContent = this.convertContent(originalContent);

            // 写入目标文件
            fs.writeFileSync(targetPath, convertedContent, 'utf8');

            this.processedFiles.add(fileName);
            this.log(`✅ 处理文件: ${fileName}`);

        } catch (error) {
            this.log(`❌ 处理文件失败 ${path.basename(sourcePath)}: ${error.message}`);
        }
    }

    // 重新生成Hexo网站
    regenerateHexo() {
        try {
            this.log('🔄 重新生成Hexo网站...');

            process.chdir(CONFIG.hexoRoot);

            // 清理缓存
            execSync('npx hexo clean', { stdio: 'inherit' });

            // 生成静态文件
            execSync('npx hexo generate', { stdio: 'inherit' });

            this.log('✅ Hexo网站重新生成完成');

        } catch (error) {
            this.log(`❌ Hexo重新生成失败: ${error.message}`);
        }
    }

    // 推送到GitHub
    pushToGitHub() {
        try {
            this.log('📤 检查并推送到GitHub...');

            process.chdir(CONFIG.hexoRoot);

            // 检查是否有未提交的更改
            const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });

            if (gitStatus.trim()) {
                this.log('📝 发现更改，开始提交和推送...');

                // 添加所有更改
                execSync('git add .', { stdio: 'inherit' });

                // 创建提交信息（包含时间戳）
                const commitMessage = `自动部署: $(date '+%Y-%m-%d %H:%M:%S')\n\n处理了 ${this.processedFiles.size} 个文件`;
                execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

                // 推送到远程仓库
                execSync('git push origin main', { stdio: 'inherit' });

                this.log('✅ 推送到GitHub完成');
            } else {
                this.log('ℹ️ 没有发现更改，跳过推送。');
            }

        } catch (error) {
            this.log(`❌ 推送到GitHub失败: ${error.message}`);
        }
    }

    // 主执行函数
    async run() {
        try {
            this.log('📋 开始执行自动部署任务...');

            // 1. 建立链接映射
            this.buildLinkMapping();

            // 2. 处理所有文件
            const sourceFiles = this.getSourceFiles();
            for (const file of sourceFiles) {
                this.processFile(file);
            }

            // 3. 重新生成Hexo网站
            this.regenerateHexo();

            // 4. 推送到GitHub
            this.pushToGitHub();

            this.log(`🎉 自动部署完成! 处理了 ${this.processedFiles.size} 个文件`);

        } catch (error) {
            this.log(`❌ 自动部署失败: ${error.message}`);
        }
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    const deployer = new HexoDeployer();
    deployer.run().catch(console.error);
}

module.exports = HexoDeployer;