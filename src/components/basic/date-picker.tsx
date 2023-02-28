import { DatePicker } from 'antd';
import type { FC } from 'react';

const BasePicker: FC = props => {
  return <MyDatePicker {...props} />;
};

const MyDatePicker = Object.assign(DatePicker, BasePicker);

export default MyDatePicker;
