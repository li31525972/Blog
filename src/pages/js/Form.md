# 表单

## 表单基础知识
- `acceptCharset` 服务器能够处理的字符集
- `action` 请求地址
- `elements` 表单中所有控件的集合
- `enctype` 请求的编码类型
- `length` 表单中控件的数量
- `method` 请求类型
- `name` 表单名称
- `reset()` 将所有表单重置为默认值
- `submit()` 提交表单
- `target` 用于发送请求和接收响应的窗口名称

## 表单属性
- `disabled` 布尔值，表示当前字段是否禁用
- `form` 指向当前字段所属表单的指针，只读
- `name` 当前字段的名称
- `readOnly` 布尔值， 表示当前字段是否只读
- `tabIndex` 表示当前字段的切换(tab)序号
- `type` 当前字段的类型
- `value` 当前字段将被提交给服务器的值

## 表单字段事件
### onfocus()
- 当前字段获取焦点时触发

### onblur()
- 当前字段失去焦点时触发

### onchange()
- value值发生改变时触发




<style>
#app .theme-default-content {
    max-width: 1200px;
}
</style>
