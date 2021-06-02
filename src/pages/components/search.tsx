import React, { FC } from 'react';
import MySearch from 'components/business/search';
import MyFormItem from 'components/core/form-item';

const SearchPage: FC = () => {
  return (
    <MySearch>
      <MyFormItem label="姓名" type="input" />
      <MyFormItem label="姓名1" type="input" />
      <MyFormItem label="姓名2" type="input" />
      <MyFormItem label="姓名3" type="input" />
      <MyFormItem label="姓名4" type="input" />
      <MyFormItem label="姓名5" type="input" />
      <MyFormItem
        label="性别"
        type="radio"
        options={[
          { label: '男', value: 1 },
          { label: '女', value: 2 }
        ]}
      />
    </MySearch>
  );
};

export default SearchPage;
