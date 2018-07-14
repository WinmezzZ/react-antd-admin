import React from 'react';
import { getPersonlist, delectPerson } from '@/api';
import { Table, Button, Pagination, Modal, message, Input } from 'ant';
import Alert from './alert';
import './index.less';

export default class App extends React.Component {
  state = {
    personList: [],
    total: 0,
    rowData: {},
    searchData: {
      limit: 10,
      pageNum: 1,
      name: ''
    },
    alertVisible: false
  }
  initData = async() => {
    const res = await getPersonlist(this.state.searchData);
    res.data && this.setState({
      personList: res.data.rows,
      total: res.data.total
    });
  }
  pageSizeChange = async(current, limit) => {
    await this.setState({
      searchData: {...this.state.searchData, limit}
    })
    this.initData()
  }
  pageNumChange = async(pageNum) => {
    await this.setState({
      searchData: {...this.state.searchData, pageNum}
    })
    this.initData()
  }
  searchHandle = async(name) => {
    await this.setState({
      searchData: {...this.state.searchData, name}
    })
    this.initData()
  }
  deleteHandle = (_id) => {
    Modal.confirm({
      title: '提示?',
      content: `您确定要删除此条数据吗？`,
      onOk: async() => {
        await delectPerson({
          _id
        });
        message.success('删除成功！');
        this.initData();
      }
    });
  }
  componentDidMount() {
    this.initData();
  }
  showAlert = (rowData = { isAdd: true }) => {
    this.setState({ 
      alertVisible: true,
      rowData
    })
  }
  closeAlert = (ok) => {
    this.setState({
      alertVisible: false
    })
    if(ok) this.initData();
  }
  render() {
    const { personList, total, searchData, rowData, alertVisible } = this.state;
    return (
      <div className="operation-page">
        <div className="search-bar">
          <Input.Search
            style={{width: 200}}
            placeholder="输入姓名以模糊搜索"
            onSearch={this.searchHandle}
            enterButton
          />
          <Button type="primary" onClick={() => this.showAlert()}>添加</Button>
        </div>
        <Table
          dataSource={personList} 
          bordered
          rowKey="_id" 
          size="small" 
          // rowSelection={rowSelection}
          pagination={false} 
          scroll={{ x: 1000 }}>
          <Table.Column title="姓名" dataIndex="name"/>
          <Table.Column title="性别" dataIndex="sex" render={(text,record) => 
            <span>{text === 0 ? '男' : '女'}</span>
          }/>
          <Table.Column title="出生日期" dataIndex="bornDate"/>
          <Table.Column title="学历" dataIndex="education"/>
          <Table.Column title="民族" dataIndex="nation"/>
          <Table.Column title="籍贯" dataIndex="nativePlace"/>
          <Table.Column title="现居地" dataIndex="nowPlace"/>
          <Table.Column title="手机号" dataIndex="phone"/>
          <Table.Column title="入职日期" dataIndex="workDate"/>
          <Table.Column title="部门" dataIndex="apartment"/>
          <Table.Column title="职位" dataIndex="role"/>
          <Table.Column title="在职状态" dataIndex="statu" render={(text,record) => 
            <span>{text === true ? '在职' : '离职'}</span>
          }/>
          <Table.Column title="操作" width="120px" render={(text, record) => (
            <span>
              <Button type="primary" size="small" onClick={() => this.showAlert(record)}>详情</Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="danger" size="small" onClick={() => this.deleteHandle(record._id)}>删除</Button>
            </span>
          )}/>
        </Table>
        <Pagination
          style={{margin: '15px auto', textAlign: 'center'}}
          size="small" 
          showQuickJumper 
          showSizeChanger
          total={total} 
          pageSize={searchData.limit}
          current={searchData.pageNum} 
          showTotal={(total) => `共 ${total} 条`}
          onShowSizeChange={this.pageSizeChange}
          onChange={this.pageNumChange}
        />
        { alertVisible && <Alert visible={alertVisible} data={rowData} onClose={this.closeAlert}/> }
      </div>
    )
  }
}
