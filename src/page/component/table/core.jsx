import React from 'react';
import { Table, Icon, Switch, Radio, Form, Divider } from 'ant';

const FormItem = Form.Item;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 150,
  render: text => <a>{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  width: 70,
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  width: 360,
  render: (text, record) => (
    <span>
      <a>Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a>Delete</a>
      <Divider type="vertical" />
      <a className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

const expandedRowRender = record => <p>{record.description}</p>;
const title = () => '这是标题';
const showHeader = true;
const footer = () => '这是尾部';
const scroll = { y: 240 };
const pagination = { position: 'bottom' };

export default class App extends React.Component {
  state = {
    bordered: false,
    loading: false,
    pagination,
    size: 'default',
    expandedRowRender,
    title: undefined,
    showHeader,
    footer,
    rowSelection: {},
    scroll: undefined,
  }

  handleToggle = (prop) => {
    return (enable) => {
      this.setState({ [prop]: enable });
    };
  }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  handleExpandChange = (enable) => {
    this.setState({ expandedRowRender: enable ? expandedRowRender : undefined });
  }

  handleTitleChange = (enable) => {
    this.setState({ title: enable ? title : undefined });
  }

  handleHeaderChange = (enable) => {
    this.setState({ showHeader: enable ? showHeader : false });
  }

  handleFooterChange = (enable) => {
    this.setState({ footer: enable ? footer : undefined });
  }

  handleRowSelectionChange = (enable) => {
    this.setState({ rowSelection: enable ? {} : undefined });
  }

  handleScollChange = (enable) => {
    this.setState({ scroll: enable ? scroll : undefined });
  }

  handlePaginationChange = (e) => {
    const { value } = e.target;
    this.setState({
      pagination: value === 'none' ? false : { position: value },
    });
  }

  render() {
    const state = this.state;
    return (
      <div>
        <div className="components-table-demo-control-bar">
          <Form layout="inline">
            <FormItem label="边框">
              <Switch checked={state.bordered} onChange={this.handleToggle('bordered')} />
            </FormItem>
            <FormItem label="加载中">
              <Switch checked={state.loading} onChange={this.handleToggle('loading')} />
            </FormItem>
            <FormItem label="标题">
              <Switch checked={!!state.title} onChange={this.handleTitleChange} />
            </FormItem>
            <FormItem label="表头">
              <Switch checked={!!state.showHeader} onChange={this.handleHeaderChange} />
            </FormItem>
            <FormItem label="尾部">
              <Switch checked={!!state.footer} onChange={this.handleFooterChange} />
            </FormItem>
            <FormItem label="可展开">
              <Switch checked={!!state.expandedRowRender} onChange={this.handleExpandChange} />
            </FormItem>
            <FormItem label="可选择">
              <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange} />
            </FormItem>
            <FormItem label="固定头部">
              <Switch checked={!!state.scroll} onChange={this.handleScollChange} />
            </FormItem>
            <FormItem label="大小">
              <Radio.Group size="default" value={state.size} onChange={this.handleSizeChange}>
                <Radio.Button value="default">大</Radio.Button>
                <Radio.Button value="middle">中</Radio.Button>
                <Radio.Button value="small">小</Radio.Button>
              </Radio.Group>
            </FormItem>
            <FormItem label="分页">
              <Radio.Group
                value={state.pagination ? state.pagination.position : 'none'}
                onChange={this.handlePaginationChange}
              >
                <Radio.Button value="top">上</Radio.Button>
                <Radio.Button value="bottom">下</Radio.Button>
                <Radio.Button value="both">两边</Radio.Button>
                <Radio.Button value="none">无</Radio.Button>
              </Radio.Group>
            </FormItem>
          </Form>
        </div>
        <Table {...this.state} columns={columns} dataSource={data} scroll={{x: 900}}/>
      </div>
    );
  }
}