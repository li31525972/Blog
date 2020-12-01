# npm

## 地址转换
```
1. 检查仓库是否被设成了淘宝镜像库
npm config get registry

https://registry.npm.taobao.org/
2. 如是，则设回原仓库
npm config set registry=http://registry.npmjs.org
3. 登录账号（如未登录）
npm login 或者添加用户 npm adduser

4. 再次发布
npm publish

5. 如发布成功，则再次将仓库地址设为淘宝镜像地址
npm config set registry=https://registry.npm.taobao.org/
```

## 常用命令
```
npm init //初始化当前应用包, 生成 package.json
npm install //根据package.json下载所有依赖包
npm install packageName --save //下载某个运行时依赖包
npm install packageName --save-dev //下载某个开发编译期依赖包
npm install packageName -g //全局下载某个依赖包
npm install package@version //下载指定版本的某个依赖包
npm info packageName //查看某个包有远程仓库中的相关信息
npm rm packageName --save //移除已下载的运行依赖包
npm rm packageName –save-dev //移除已下载的开发依赖包
npm list //查看安装的所有的包
npm help //查看命令的详细帮助
npm install -g cnpm --registry=https://registry.npm.taobao.org //安装淘宝镜像
npm config set registry="https://registry.npm.taobao.org" //将淘宝镜像设置为 npm 的默认仓库
npm run xxx //执行 package.json 的 scripts 中配置的命令
npm root -g //查看全局下载目录

```







<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>
