import { FC } from 'react';
import MySearch from '@/components/business/search';
import MyFormItem from '@/components/core/form-item';

const SearchPage: FC = () => {
  const onSearch = (values: any) => {
    console.log(values);
  };

  return (
    <MySearch onSearch={onSearch}>
      <MyFormItem label="姓名" type="input" name="name" />
      <MyFormItem label="姓名1" type="input" name="name1" />
      <MyFormItem label="姓名2" type="input" name="name2" />
      <MyFormItem label="姓名3" type="input" name="name3" />
      <MyFormItem label="姓名4" type="input" name="name4" />
      <MyFormItem label="姓名5" type="input" name="name5" />
      <MyFormItem
        name="sex"
        label="性别"
        type="radio"
        initialValue={1}
        options={[
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ]}
      />
    </MySearch>
  );
};

export default SearchPage;
