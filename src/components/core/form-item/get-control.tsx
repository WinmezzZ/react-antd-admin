import React, { ReactNode } from 'react';
import MyInput from 'components/basic/input';
import MyInputNumber from 'components/basic/input-number';
import MySwitch from 'components/basic/switch';
import MyDatePicker from 'components/basic/date-picker';
import MyCheckBox from 'components/basic/checkbox';
import MyRadio from 'components/basic/radio';
import MySelect from 'components/basic/select';
import { AdvancedControlProps, AdvancedControls, BasicControlProps, BasicControls } from './types';

// Method member must be one of BasicControls, provide BasicControlProps arguments, and return ReactNode
// 方法成员必须名字为 basicControls 其中之一，提供 BasicControlProps 参数，返回 ReactNode
type GetBasicControlsProps = {
  [x in BasicControls]: (props: BasicControlProps) => ReactNode;
};

type GetAdvancedControlsProps = {
  [x in AdvancedControls]: (props: AdvancedControlProps) => ReactNode;
};

// Why implements: Prevent incorrect member names, and prevent missing members
// 为什么要 implements：防止成员名写错，防止成员遗漏
export class GetControl implements GetBasicControlsProps, GetAdvancedControlsProps {
  input() {
    return <MyInput />;
  }
  'input-number'() {
    return <MyInputNumber />;
  }
  switch() {
    return <MySwitch />;
  }
  'date-picker'() {
    return <MyDatePicker />;
  }
  checkbox({ options }: AdvancedControlProps) {
    if (options.length === 1) return <MyCheckBox />;
    return <MyCheckBox.Group options={options} />;
  }
  radio(props: AdvancedControlProps) {
    if (props.options.length === 1) return <MyRadio />;
    return <MyRadio.Group options={props.options} />;
  }
  select(props: AdvancedControlProps) {
    return <MySelect options={props.options} />;
  }
}
