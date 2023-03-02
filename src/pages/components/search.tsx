import type { FC } from 'react';

import MySearch from '@/components/business/search';
import MyFormItem from '@/components/core/form-item';
import { useLocale } from '@/locales';

const SearchPage: FC = () => {
  const { formatMessage } = useLocale();

  const onSearch = (values: any) => {
    console.log(values);
  };

  const nameLabel = formatMessage({ id: 'component.search.name' });
  const sexLabel = formatMessage({ id: 'component.search.sex' });
  const maleLabel = formatMessage({ id: 'component.search.male' });
  const femaleLabel = formatMessage({ id: 'component.search.female' });

  return (
    <MySearch onSearch={onSearch}>
      <MyFormItem label={nameLabel} type="input" name="name" />
      <MyFormItem label={nameLabel + '1'} type="input" name="name1" />
      <MyFormItem label={nameLabel + '2'} type="input" name="name2" />
      <MyFormItem label={nameLabel + '3'} type="input" name="name3" />
      <MyFormItem label={nameLabel + '4'} type="input" name="name4" />
      <MyFormItem label={nameLabel + '5'} type="input" name="name5" />
      <MyFormItem
        name="sex"
        label={sexLabel}
        type="radio"
        initialValue={1}
        options={[
          { label: maleLabel, value: 1 },
          { label: femaleLabel, value: 2 },
        ]}
      />
    </MySearch>
  );
};

export default SearchPage;
