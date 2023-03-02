import type { FC } from 'react';

import { DatePicker } from 'antd';

const BasePicker: FC = props => {
  return <MyDatePicker {...props} />;
};

const MyDatePicker = Object.assign(DatePicker, BasePicker);

export default MyDatePicker;
