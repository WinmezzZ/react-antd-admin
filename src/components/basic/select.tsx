import type { FC } from 'react';

import { Select } from 'antd';

// import { SelectProps, SelectValue } from 'antd/es/select';
// const MySelect = <T extends SelectValue = SelectValue>({ children, ...props }: SelectProps<T>) => {
//   return <Select<T> {...props}>{children}</Select>;
// };

const BaseSelect: FC = props => {
  return <Select {...props} />;
};

const MySelect = Object.assign(Select, BaseSelect);

export default MySelect;
