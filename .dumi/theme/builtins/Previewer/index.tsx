import { IPreviewerProps, useLocale, useRouteMeta, useSiteData } from 'dumi';
import Previewer from 'dumi/theme-default/builtins/Previewer';
// @ts-ignore
import Device from 'dumi/theme/slots/Device';
import React, { useCallback, useEffect, useState, type FC } from 'react';
import './index.less';

// Previewer
// https://github.com/umijs/dumi/blob/0c33c6f2b2c1b0ff40beedb4a842140d06af711c/suites/theme-mobile/src/builtins/Previewer/index.tsx#L30
// useLiveDemo
// https://github.com/umijs/dumi/blob/0c33c6f2b2c1b0ff40beedb4a842140d06af711c/src/client/theme-api/useLiveDemo.ts#L35
// https://github.com/umijs/dumi/blob/0c33c6f2b2c1b0ff40beedb4a842140d06af711c/src/client/theme-default/builtins/Previewer/index.tsx#L3
const MobilePreviewer: FC<IPreviewerProps> = (props) => {
  const {
    frontmatter: { mobile = true },
  } = useRouteMeta();

  const { themeConfig } = useSiteData();
  const locale = useLocale();
  const generateUrl = useCallback((p: typeof props) => {
    const [pathname, search] = p.demoUrl.split('?');
    const params = new URLSearchParams(search);

    if (p.compact) params.set('compact', '');
    if (p.background) params.set('background', p.background);
    if (locale.id) params.set('locale', locale.id);

    console.log('p', p);
    console.log('pathname', pathname, params);

    // demoUrl: "/~demos/foo-demo-demo1"
    // const componentName = pathname.split('/').pop();
    // '/~demos/foo-demo-demo1?locale=zh-CN'
    const iframeUrl = `http://127.0.0.1:10086#${pathname}?${params.toString()}`
      .replace(/\?$/, '')
      // 修复路径错误
      .replace('/src-', '/');
    return iframeUrl;
    // return `http://127.0.0.1:10086?#/pages/${pathname}/demos/demo1`.replace(/\?$/, '');

    return `${pathname}?${params.toString()}`.replace(/\?$/, '');
  }, []);
  const [demoUrl, setDemoUrl] = useState(() => generateUrl(props));

  useEffect(() => {
    setDemoUrl(generateUrl(props));
  }, [props.compact, props.background]);

  return (
    <Previewer
      {...props}
      demoUrl={demoUrl}
      iframe={mobile ? false : props?.iframe}
      className={mobile ? 'dumi-mobile-previewer' : undefined}
      forceShowCode={mobile}
      style={{
        '--device-width': themeConfig.deviceWidth
          ? `${themeConfig.deviceWidth}px`
          : undefined,
      }}
      _live_in_iframe={mobile}
    >
      {mobile && (
        <Device
          url={demoUrl}
          inlineHeight={
            typeof props.iframe === 'number' ? props.iframe : undefined
          }
        />
      )}
      {!mobile && props?.children}
    </Previewer>
  );
};

export default MobilePreviewer;
