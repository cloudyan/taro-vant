import type { UserConfigExport } from '@tarojs/cli';
import path from 'path';

console.log('__dirname', __dirname);

export default {
  logger: {
    quiet: false,
    stats: true,
  },
  alias: {
    'ui-mobile': path.resolve(__dirname, '../../../packages/ui-mobile/src'),
    '@': path.resolve(__dirname, '..', 'src'),
  },
  mini: {
    compile: {
      include: ['ui-mobile'],
    },
  },
  h5: {},
} satisfies UserConfigExport<'webpack5'>;
