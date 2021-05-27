import React, { FC } from 'react';
import { Select } from 'antd';

// import { SelectProps, SelectValue } from 'antd/lib/select';
// const MySelect = <T extends SelectValue = SelectValue>({ children, ...props }: SelectProps<T>) => {
//   return <Select<T> {...props}>{children}</Select>;
// };

const MySelect: FC = props => {
  return <Select {...props} />;
};

Object.assign(MySelect, Select);

export default MySelect as typeof Select;
