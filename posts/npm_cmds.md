### 1. 基础命令

```bash
# 初始化项目,创建 package.json
npm init

# 快速初始化(使用默认配置)
npm init -y

# 安装依赖
npm install   # 简写: npm i
npm install package-name  # 安装指定包
npm install package-name@1.0.0  # 安装特定版本

# 卸载依赖
npm uninstall package-name  # 简写: npm un

# 更新依赖
npm update  # 更新所有包
npm update package-name  # 更新指定包
```

### 2. 依赖类型

```bash
# 安装生产环境依赖
npm install package-name --save  # 简写: -S
# 安装开发环境依赖
npm install package-name --save-dev  # 简写: -D
# 全局安装
npm install package-name -g
```

### 3. 运行脚本

```bash
# 运行 package.json 中定义的脚本
npm run script-name

# 特殊脚本可以省略 run
npm start
npm test
npm restart
npm stop
```

### 4. 版本和更新

```bash
# 查看包的版本
npm version
npm list  # 查看依赖树
npm list package-name  # 查看特定包

# 检查过时的包
npm outdated

# 查看包的信息
npm info package-name
```

### 5. 缓存管理

```bash
# 清除缓存
npm cache clean --force

# 验证缓存
npm cache verify
```

### 6. 安全相关

```bash
# 检查安全漏洞
npm audit

# 修复安全漏洞
npm audit fix
npm audit fix --force  # 强制修复

# 检查过时的包
npm outdated
```

### 7. 配置相关

```bash
# 查看所有配置
npm config list

# 设置配置
npm config set key value

# 删除配置
npm config delete key

# 编辑配置文件
npm config edit
```

### 8. 发布相关

```bash
# 登录 npm 账号
npm login

# 发布包
npm publish

# 撤销发布
npm unpublish package-name
```

### 9. 实用技巧

```bash
# 查看全局安装的包
npm list -g --depth=0

# 查看 npm 命令帮助
npm help

# 查看特定命令的帮助
npm help install

# 检查 npm 是否需要更新
npm -v
npm install -g npm@latest  # 更新 npm
```

### 10. package.json 中的版本号说明

```json
{
  "dependencies": {
    "package1": "1.0.0",    // 精确版本
    "package2": "^1.0.0",   // 兼容版本 (1.x.x)
    "package3": "~1.0.0",   // 补丁版本 (1.0.x)
    "package4": "*",        // 最新版本
    "package5": ">=1.0.0"   // 大于等于此版本
  }
}
```
