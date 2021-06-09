import React, { FC } from 'react';
import { TabPaneProps, Tabs, TabsProps } from 'antd';

const { TabPane } = Tabs;

export interface MyTabOption extends Omit<TabPaneProps, 'tab' | 'key'> {
  label: string;
  value: string | number;
}

export interface MyTabsProps extends TabsProps {
  options: MyTabOption[];
}

const BaseTabs: FC<MyTabsProps> = props => {
  const { options, children, ...rest } = props;
  console.log(options);
  return (
    <Tabs {...rest}>
      {options ? options.map(option => <TabPane {...option} tab={option.label} key={option.value} />) : children}
    </Tabs>
  );
};

const MyTabs = Object.assign(BaseTabs, Tabs);

export default MyTabs;
