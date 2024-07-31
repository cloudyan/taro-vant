import { Button } from '@tarojs/components';
import type { FC, ReactNode } from 'react';
import React from 'react';

interface BarProps {
  children?: ReactNode;
}

const Bar: FC = (props: BarProps) => {
  return (
    <>
      <Button className="btn-bar">{props.children}</Button>
    </>
  );
};

export default Bar;
