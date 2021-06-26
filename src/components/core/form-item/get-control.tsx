import { ReactNode } from 'react';
import MyInput from 'components/basic/input';
import MyInputNumber from 'components/basic/input-number';
import MySwitch from 'components/basic/switch';
import MyDatePicker from 'components/basic/date-picker';
import MyCheckBox from 'components/basic/checkbox';
import MyRadio from 'components/basic/radio';
import MySelect from 'components/basic/select';
import { AdvancedControls, BasicControls, CustomFormItemProps, AdvancedControlPropsOption } from './types';
import { FormInstance } from 'rc-field-form';

// Method member must be one of BasicControls, provide options arguments, and return ReactNode
// 方法成员必须名字为 basicControls 其中之一，提供 options 参数，返回 ReactNode
type GetBasicControlsProps = {
  [x in BasicControls]: () => ReactNode;
};

type GetAdvancedControlsProps = {
  [x in AdvancedControls]: (options: AdvancedControlPropsOption[]) => ReactNode;
};

// Why implements: Prevent incorrect member names, and prevent missing members
// 为什么要 implements：防止成员名写错，防止成员遗漏
export class GetControl implements GetBasicControlsProps, GetAdvancedControlsProps {
  props: CustomFormItemProps<any>;
  form: FormInstance;

  constructor(props: CustomFormItemProps<any>, form: FormInstance) {
    this.props = props;
    this.form = form;
  }

  get value() {
    if (this.props.name) {
      return this.form.getFieldValue(this.props.name);
    }
    return undefined;
  }

  get controlProps() {
    const { innerProps = {}, required } = this.props;
    let allowClear = true;

    if (innerProps && 'clearable' in innerProps) {
      allowClear = innerProps.clearable;
    } else {
      allowClear = !!required;
    }
    return {
      ...innerProps,
      allowClear
    };
  }

  input() {
    return <MyInput {...this.controlProps} />;
  }

  'input-number'() {
    return <MyInputNumber {...this.controlProps} />;
  }

  switch() {
    return <MySwitch {...this.controlProps} />;
  }

  'date-picker'() {
    return <MyDatePicker {...this.controlProps} />;
  }

  checkbox(options: AdvancedControlPropsOption[]) {
    if (options.length === 1) return <MyCheckBox {...this.controlProps} />;
    return <MyCheckBox.Group options={options} {...this.controlProps} />;
  }

  radio(options: AdvancedControlPropsOption[]) {
    if (options.length === 1) return <MyRadio {...this.controlProps} />;
    return <MyRadio.Group options={options} {...this.controlProps} />;
  }

  select(options: AdvancedControlPropsOption[]) {
    return <MySelect options={options} {...this.controlProps} />;
  }

  text(options: AdvancedControlPropsOption[]) {
    const value = this.value || this.props.initialValue;
    const data = options.find(item => item.value === value);

    if (data) {
      return data.label;
    }
  }
}
