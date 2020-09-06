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

https://github.com/CrSjimo/find-the-law

```

# License

WTFPL

## Linear-solve by Lovasoa

<https://github.com/lovasoa/linear-solve> Under MIT License.