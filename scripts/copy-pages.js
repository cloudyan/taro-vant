// 该脚本用来全量迁移对应的Taro组件到taro-device中
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

const rootPath = path.resolve(__dirname, '..');
const files = glob.sync(`${rootPath}/src/*`);
const h5PagesList = [];

function fileExists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

function copyComponent() {
  fs.ensureDirSync(`${rootPath}/taro-device/src`);
  const componentTargerDir = `${rootPath}/taro-device/src/~demos/`;
  // console.log('componentTargerDir', componentTargerDir)

  files.forEach((fileItem) => {
    const strList = fileItem.split('/');
    const componentName = strList[strList.length - 1];
    if (componentName !== 'index.ts') {
      // console.log('componentName', componentName, fileItem);
      try {
        /** 组件目录移动 */
        // '/~demos/foo-demo-demo1?locale=zh-CN'
        // `/~demos/${componentName}-demo-demo1`

        fs.ensureDirSync(componentTargerDir);

        // copyFile demo1.tsx ==> foo-demo-demo1
        // 源文件路径
        const sourceFile = path.join(fileItem, 'demos', 'demo1.tsx');
        if (!fileExists(sourceFile)) {
          console.error('跳过文件不存在', sourceFile);
        } else {
          // 目标文件路径
          const targetFileName = `${componentName}-demo-demo1`;
          const targetFile = path.join(
            componentTargerDir,
            `${targetFileName}.tsx`,
          );
          // 复制并重命名文件
          console.log('copy:', sourceFile, targetFile);
          fs.copyFileSync(sourceFile, targetFile);

          // fs.copySync(`${fileItem}/demos`, componentTargerDir);
          fs.ensureFileSync(`${componentTargerDir}/index.config.ts`);

          // h5PagesList.push(`pages/${componentName}/demo/index`);
          h5PagesList.push(`~demos/${targetFileName}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
  });

  /** app.config.ts 文件修改 */
  fs.ensureFileSync(`${rootPath}/taro-device/src/app.config.ts`);

  const targetStr = `const pageList = [
  ${h5PagesList.map((item) => `'${item}'`).join(',\n  ')}
];

export default {
  pages: pageList,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
  }
};
  `;
  fs.outputFile(`${rootPath}/taro-device/src/app.config.ts`, targetStr);
}

copyComponent();
