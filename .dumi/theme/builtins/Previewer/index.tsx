import { IPreviewerProps, useLocale, useRouteMeta, useSiteData } from 'dumi';
import Previewer from 'dumi/theme-default/builtins/Previewer';
import Device from 'dumi/theme/slots/Device';
import React, { useCallback, useEffect, useState, type FC } from 'react';
import './index.less';

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

    // const componentName = pathname.split('/').pop();
    // return `http://172.16.0.74:10086?${params.toString()}#/pages/${pathname}/demo/index`.replace(/\?$/, '');

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
