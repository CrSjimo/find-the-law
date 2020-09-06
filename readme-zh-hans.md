# Find the Law

数列找规律。

# 其他语言版本

- [English(英语)](readme.md)

# 使用方法

从npm安装：

```bash
npm install find-the-law
```

```javascript
const findLaw = require('find-the-law').default;
findLaw(['1','2','3','4','5','6','?']);
/**
 * {
 *     text: string,
 *     functionLatex: string,
 *     functionText: string,
 * }
 */
```

## `findLaw`

一个函数。模块的默认导出。

|参数|类型|描述|
|-|-|-|
|`s`|`string[]`|要寻找规律的数。用`?`来代替空缺。|

返回：一个对象。

|属性|类型|描述|
|-|-|-|
|`text`|`string`|使用简体中文的报告文本。 一个例子在下边给出。|
|`functionLatex`|`string`|所构造出的函数的latex代码。|
|`functionText`|`string`|所构造出的函数的纯文本形式。|

一个 `text` 的例子当参数`s`是`['1','2','3','4','5','6','?']`：

```markdown

我们不妨构造一个函数$f(x)$，使得：

$$
f(0)=1 \\
f(1)=2 \\
f(2)=3 \\
f(3)=4 \\
f(4)=5 \\
f(5)=6 \\
$$

易得：

$$
f(x)=\frac{12723}{80} x^6-\frac{38169}{16} x^5+\frac{216291}{16} x^4-\frac{572535}{16} x^3+\frac{1743051}{40} x^2-\frac{38167}{2} x+1
$$

其中：

$$
f(6)=114514 \\
$$

所以，应填入空缺处的数字依次为：$114514$.

```

# 许可证

WTFPL

## Linear-solve by Lovasoa

<https://github.com/lovasoa/linear-solve> Under MIT License.