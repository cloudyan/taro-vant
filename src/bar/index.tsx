import { Button } from '@tarojs/components';
import React from 'react';

// interface BarProps {
//   children?: React.ReactNode;
// }

const Bar: React.FC = (props: any) => {
  return (
    <>
      <Button className="btn-bar">{props.children}</Button>
    </>
  );
};

export default Bar;
