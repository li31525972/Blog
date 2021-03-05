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
## 暂存区

### 提交变更到暂存区

```
提交单文件
git add index.html

将当前目录及子目录添加到版本库中
git add .
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
### 撤销最新的提交
```
工作区和暂存区不改变，引用向前回退一次，撤销最新的提交以便重新提交 HEAD^ = HEAD~1
git reset --soft HEAD^

彻底撤销最近的提交，引用回退到前一次，工作区和暂存区回退到上一次提交的状态，自上一次以来的提交全部丢失
git reset --hard HEAD^
```

## 文件追踪
### 取消追踪
```
git update-index --assume-changed index.html
```
### 恢复追踪
```
git update-index --no-assume-changed index.html
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
从最近保存的进度进行恢复
git stash pop
```


## 日志
### 查看日志
```
显示提交日志(可查看提交ID、作者、时间、备注)
git log

仅查看提交版本号和提交备注
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

## 对比差异
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

## 重置与回溯
### 替换当前暂存区
```
拉取最近一次提交到版本库的文件到暂存区，不影响工作区
git reset HEAD
```
### 以当前工作分支替换暂存区和工作区
- 会清除暂存区和工作区未提交的改动
```
单文件替换
git checkout HEAD file

全部替换
git checkout HEAD .
```


## 分支

### 创建分支

```
创建分支
git branch test

以当前分支为基础创建新分支并切换到新分支
git checkout -b test
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
git branch -d test
```






































<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>
