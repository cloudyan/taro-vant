# 设计

使用 dumi 开发 taro UI 组件库，并配置预览

- https://d.umijs.org/config/demo#demourl
- https://juejin.cn/post/7071909224598470687
- https://github.com/jdf2e/nutui-react

## format

```js
"lint-staged": {
  "*.{md,json}": [
    "prettier --write --no-error-on-unmatched-pattern"
  ],
  "*.{css,less}": [
    "stylelint --fix",
    "prettier --write"
  ],
  "*.{js,jsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --parser=typescript --write"
  ]
},
```
