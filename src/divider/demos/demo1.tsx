import { Divider } from 'taro-vant';

export default () => {
  return (
    <>
      <Divider />
      <Divider>文本</Divider>

      <Divider>
        <Divider.Text orientation="left">文字</Divider.Text>
      </Divider>
      <Divider>
        <Divider.Text orientation="right">文字</Divider.Text>
      </Divider>

      <Divider dashed>文本</Divider>

      <Divider
        style={{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }}
      >
        文本
      </Divider>
    </>
  );
};
