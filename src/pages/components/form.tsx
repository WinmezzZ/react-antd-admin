import MyInput from 'components/basic/input';
import MySelect from 'components/basic/select';
import MyFormItem from 'components/core/form-item';
import React, { FC } from 'react';

const Form: FC = () => {
  return (
    <div>
      <MyInput />
      <MySelect />
      <MyFormItem type="date-picker" />
    </div>
  );
};

export default Form;
