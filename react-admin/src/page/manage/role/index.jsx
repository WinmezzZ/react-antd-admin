import React, { Component } from 'react'
import './index.scss'
import Breadcrumb from '@/components/breadcrumb'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './alert'
import { getRoleList, deleteRole } from '@/api'
import { Table, Layout } from 'antd'

class Role extends Component {
  state = {
    visible: false,
    rowData: {},
    roleList: [],
    total: null,
    searchData: {
      pageNum: 1,
      limit: 17,
      condition: ''
    },
    selectedRowKeys: []
  }
  initData = async() => {
    const res = await getRoleList({...this.state.searchData});
    this.setState({
      roleList: res.data.list,
      total: res.data.total
    })
  }
  searchHandle = async(condition) => {
    await this.setState({
      searchData: {...this.state.searchData, pageNum: 1 ,condition}
    })
    this.initData()
  }
  pageChangeHandle = async(pageNum) => {
    await this.setState({
      searchData: {...this.state.searchData, pageNum}
    })
    this.initData()
  }
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        selectedRowKeys
      })
    },
  }
  showAlert = (rowData = { isAdd: true }) => {
    this.setState({ 
      visible: true,
      rowData
    })
  }
  AlertTrigger = (ok) => {
    this.setState({
      visible: false
    })
    if(ok) this.initData();
  }
  deleteHandle = () => {
    const keys = this.state.selectedRowKeys
    Delete({
      keys, 
      ok: deleteRole, 
      init: this.initData,
      end: () => {
        this.setState({
          selectedRowKeys: []
        })
      }
    })
  }
  componentDidMount() {
    this.initData();
  }
  render() {
    const { visible, roleList, rowData, total, searchData } = this.state;
    return (
      <Layout>
        <Breadcrumb first="管理平台" second="角色管理"/>
        <Layout>
          <Layout.Content>
            <MainHanle onAdd={() => this.showAlert()} onDelete={this.deleteHandle} onSearch={this.searchHandle}/>
            <Table 
              dataSource={roleList} 
              rowKey="fRoleid" 
              size="small" 
              pagination={false} 
              scroll={{ x: 555 }}
              rowSelection={this.rowSelection}>
              <Table.Column title="角色名称" dataIndex="fName"></Table.Column>
              <Table.Column title="角色代码" dataIndex="fRoleid"></Table.Column>
              <Table.Column title="角色类型" dataIndex="fTypename"></Table.Column>
              <Table.Column title="操作" width="90px" fixed="right" render={(text, record) => (
                <span className="span" onClick={() => this.showAlert(record)}>
                  查看详情
                </span>
              )}></Table.Column>
            </Table>
            <Pagination 
              total={total} 
              searchData={searchData} 
              onChange={this.pageChangeHandle}/>  
          </Layout.Content>
        </Layout>
        { visible && <Alert data={rowData} trigger={this.AlertTrigger}/> }
      </Layout>
    )
  }
}

export default Role