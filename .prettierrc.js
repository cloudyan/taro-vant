// .prettierrc.js
// 文档 https://prettier.io/docs/en/options.html
module.exports = {
  // pluginSearchDirs: false,
  organizeImportsSkipDestructiveCodeActions: true, // 跳过破坏性代码操作
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson', // 使用 sort-package-json 排序
    // require.resolve('xxx'), // prettier@2.x
  ],
  singleQuote: true, // default false
  trailingComma: 'all', // default all

  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.{ejs,html}', // document.ejs
      options: {
        parser: 'html',
      },
    },
    {
      files: 'src/locale/*.ts',
      options: {
        printWidth: 800,
      },
    },
  ],
};
