# Find the Law

Find the law of an array.

# In Other Languages

- [简体中文(Simplified Chinese)](readme-zh-hans.md)

# Usage

Install from npm:

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

A function. The default export of the module.

|Parameter|Type|Description|
|-|-|-|
|`s`|`string[]`|The array to find the law. Use `?` to replace the blank.|

Returns: An object.

|Property|Type|Description|
|-|-|-|
|`text`|`string`|The report text in Simplified Chinese. An example is given below.|
|`functionLatex`|`string`|The latex code of the constructed function.|
|`functionText`|`string`|The constructed function in plain text.|

An example of `text` when parameter `s` is `['1','2','3','4','5','6','?']`: 

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

# License

WTFPL

## Linear-solve by Lovasoa

<https://github.com/lovasoa/linear-solve> Under MIT License.