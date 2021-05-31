import React from 'react';
import { Table } from 'antd';
import { MyTableColumnProps, dateFormatMap, datetimeFormatMap, timeFormatMap } from './type';
import moment from 'moment';
import { getPathValue } from 'rc-table/lib/utils/valueUtil';

const MyTableColumn = <RecordType extends object>(props: MyTableColumnProps<RecordType>) => {
  const { options, date, time, datetime, ...rest } = props;

  const renderContent = (value: any, record: RecordType, index: number) => {
    if (!value) return '-';

    if ('datetime' in props) {
      return moment(value, datetimeFormatMap[datetime || 'second']);
    } else if ('date' in props) {
      return moment(value, dateFormatMap[date || 'day']);
    } else if ('time' in props) {
      return moment(value, timeFormatMap[time || 'second']);
    }

    if (props.dataIndex && options) {
      const data = options.find(item => item.value === getPathValue(record, props.dataIndex!));

      if (data) return data.label || '-';
    }

    return value || value === 0 ? value : '-';
  };

  return <Table.Column {...rest} key={props.dataIndex?.toString()} render={renderContent} />;
};

export default MyTableColumn;
