#!/usr/bin/env node

// 测试部署脚本 - 用于调试和验证
const HexoDeployer = require('./auto_deploy_notes.js');

async function testDeploy() {
    console.log('🧪 开始测试部署...\n');

    const deployer = new HexoDeployer();

    try {
        await deployer.run();
        console.log('\n✅ 测试部署完成!');
        console.log('🌐 请检查您的Hexo网站: https://orilimu.github.io');
    } catch (error) {
        console.error('\n❌ 测试部署失败:', error);
        process.exit(1);
    }
}

// 运行测试
testDeploy();