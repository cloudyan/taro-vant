const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

const rootPath = path.resolve(__dirname, '..');
const files = glob.sync(`${rootPath}/src/*`);
const h5PagesList = [];

function copyComponent(filename) {
  const currentList = filename.split('/');
  const currentCompName = currentList[0];
  files.forEach((fileItem) => {
    const strList = fileItem.split('/');
    const componentName = strList[strList.length - 1];
    if (componentName !== 'index.ts') {
      try {
        if (componentName === currentCompName) {
          fs.ensureDirSync(`${rootPath}/taro-device/src`);
          /** 组件目录移动 */
          const componentTargerDir = `${rootPath}/taro-device/src/pages/${componentName}`;
          fs.ensureDirSync(componentTargerDir);
          fs.copySync(fileItem, componentTargerDir);
          fs.ensureFileSync(`${componentTargerDir}/demo/index.config.ts`);
        }
        h5PagesList.push(`pages/${componentName}/demo/index`);
      } catch (err) {
        console.error(err);
      }
    }
  });

  /** app.config.ts文件修改 */
  fs.ensureFileSync(`${rootPath}/taro-device/src/app.config.ts`);
  const configData = fs.readFileSync(
    `${rootPath}/taro-device/src/app.config.ts`,
    'utf8',
  );
  const configDataStrList = configData.split('\n');
  configDataStrList[0] = `const pageList = [${h5PagesList.map(
    (item) => `'${item}'`,
  )}]`;
  fs.outputFile(
    `${rootPath}/taro-device/src/app.config.ts`,
    configDataStrList.join('\n'),
  );
}

chokidar
  .watch('src', {
    persistent: true,
    // eslint-disable-next-line no-useless-escape
    ignored: /(^|[\/\\])\../, // 忽略点文件
  })
  .on('change', (path) => {
    const watchPath = path.replace(/\\/g, '/');
    const strList = watchPath.split('/');
    strList.splice(0, 1);
    let filename = strList.join('/');

    if (filename !== 'index.ts') {
      copyComponent(filename);
    }
  });
