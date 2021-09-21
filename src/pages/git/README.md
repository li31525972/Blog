# git
## 安装
### mac os
- 安装[`homebrew`](https://brew.sh/)

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- 安装`git`

```
brew install git
```
## 初始化
### 无项目
```
git init
```
### 有项目
```
git init project
```
## 配置文件
### 设置
- `--local` 对某个仓库有效
- `--global` 对当前用户所有仓库有效
- `--system` 对系统所有的登录用户有效
```
git config --global user.name '李亚辉'
git config --global user.email '31525972@qq.com'
```
### 查看
```
git config --list --global
git config --list --local
git config --list --system
```

## 远程仓库
### 查看远程仓库地址
```
git remote -v
```

## 暂存区

### 提交变更到暂存区

```
提交单文件
git add index.html

将git已经添加到版本控制的文件全部提交到暂存区
git add -u

将当前目录及子目录添加到版本库中
git add .

选择性添加(交互界面操作输入7退出)
git add -i
```

### 撤销修改

- 用暂存区全部的文件或指定的文件替换工作区的文件(会清除工作区中未提交到暂存区的修改)

```
指定的文件
git checkout -- index.html

全部文件
git checkout .
```

### 从暂存区移除
- 平常使用两个都可以
```
从暂存区删除文件，工作区不受影响(删除暂存)
git rm --cached file

从暂存区删除文件，工作区不受影响(取消暂存，相当于 git add file 的反操作)
git reset file

将所有文件从暂存区撤出
git reset
```
### 以当前工作分支替换暂存区
- 拉取最近一次提交到版本库的文件到暂存区，不影响工作区
```
全部文件
git reset HEAD

指定文件
git reset HEAD -- index.html

指定多个文件
git reset HEAD -- index.html test.html
```

### 以暂存区替换当前工作区
- 会清除工作区中未添加到暂存区的改动
```
以暂存区指定文件替换工作区的文件
git checkout -- file

以暂存区全部的文件替换当前工作区的文件
git checkout .
```

## 提交
### 提交
```
git commit -m "提交说明"
```
### 修改提交信息
```
最近一次
git commit --amend

历史变更
git rebase -i (想要修改message的父版本号)
```
### 撤销最新的提交
```
工作区和暂存区不改变，引用向前回退一次，撤销最新的提交以便重新提交 HEAD^ = HEAD~1
git reset --soft HEAD^
```

## 文件
### 取消追踪
```
git update-index --assume-unchanged index.html
```
### 恢复追踪
```
git update-index --no-assume-unchanged index.html
```

### 文件重命名
```
将 index.html 重命名为 index.js
git mv index.html index.js
```
### 删除文件
```
将需要删除的文件添加到暂存区
git rm index.html
```




## 暂停、恢复

### 暂停

- 保存当前工作进度

```
git stash

查看保存的进度
git stash list
```
### 恢复

```
从最近保存的进度进行恢复(不保存记录)
git stash pop

从最近保存的进度进行恢复(保留记录)
git stash apply
```


## 日志
### 查看日志
- `--oneline` 简洁形式查看
- `-n` 查看最近几次提交(-4或者-n4, 查看最近4次)
- `--all` 查看所有分支的历史记录
- `--graph` 关系型查看(图表形式)
```
显示当前分支提交日志(可查看提交ID、作者、时间、备注)
git log

仅查看提交版本号和提交备注(git log --oneline)只显示版本号前几位
git log --pretty=oneline

以图表形式查看日志
git log --graph

显示每次提交的文件变更统计(显示每次变更都提交了哪些文件)
git log --stat

查看最近一次提交详情(文件内部变更内容)
git show

查看特定提交的详细信息
git show 123dd5331b0efdf4cdac6c542e8f192028b117b8(提交ID可通过提交日志查看)

查看指定目录、文件的日志
git log index.html
```
### 文件追溯
- `-L`行数
```
逐行显示文件，在每一行的行首显示此行最早谁在哪个版本引入，由谁引入
git blame fileName
```

## 对比差异
- `-- index.html` 加参数对比具体文件
### 工作区对比暂存区
```
git diff
```
### 工作区对比当前工作分支
```
git diff HEAD
```
### 暂存区对比当前分支
```
git diff --cached
```
### 历史版本之间的变更对比
```
git diff fde1b588c28 71e743dc0fb3
```

## 重置与回溯
### 替换当前暂存区
```
git diff fde1b588c28 71e743dc0fb3
```

## 重置与回溯
### 以当前工作分支替换暂存区和工作区
- 会清除暂存区和工作区未提交的改动
```
单文件替换
git checkout HEAD file

全部替换
git checkout HEAD .
```
### 回溯到某个历史版本
- 会丢弃历史记录
```
彻底撤销最近的提交，引用回退到前一次，工作区和暂存区回退到上一次提交的状态，自上一次以来的提交全部丢失
git reset --hard HEAD^ 或者 git reset --hard 版本号
```


## 分支

### 创建分支

```
创建分支
git branch test

以当前分支为基础创建新分支并切换到新分支
git checkout -b test
将当前分支push到远程分支
git push origin test

以远程remotes/origin/dev分支为基础创建新分支dev(会和远程分支建立映射关系)
git checkout -b dev remotes/origin/dev

以对应的版本号为基础创建分支并切换过去
git checkout -b test 9a5f185
```

### 查看分支

```
查看本地分支
git branch

查看远程追踪分支
git branch -r

查看所有分支
git branch -a
```

### 更新远程分支
```
git remote update origin --prune
```

### 关联远程分支
```
git branch --set-upstream-to=远程分支 本地分支
```

### 切换分支

```
切换到test分支
git checkout test
```

### 合并分支

```
将test分支合并到当前分支
git merge test
```



### 删除分支

```
-d 删除前检查合并状态，当上游分支没有合并该分支将不会删除
-D 强制删除

删除本地分支
git branch -d 分支名

删除远程分支
git push origin -d 分支名
```


## 标签

### 创建tag
```
git tag -a version1.0.0 -m "提交信息"
```
### 切换到tag
```
git checkout version1.0.0
```
### 查看tag信息
```
git show version1.0.0
```
### 删除tag
```
git tag -d version1.0.0
```
### 提交tag
```
将tag提交到服务器
git push origin version1.0.0

将本地所有tag提交到服务器
git push origin --tags
```



































<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>
