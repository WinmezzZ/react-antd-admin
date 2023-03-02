import type { FC } from 'react';

import { Radio } from 'antd';

const BaseRadio: FC = props => {
  return <Radio {...props} />;
};

const MyRadio = Object.assign(Radio, BaseRadio);

export default MyRadio;
