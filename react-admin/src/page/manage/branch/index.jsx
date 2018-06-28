import React, { Component } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './alert'
import { getBranchList, deleteBranch } from '@/api'
import { Table, Layout } from 'antd'

class Branch extends Component {
  state = {
    visible: false,
    rowData: {},
    branchList: [],
    total: null,
    searchData: {
      pageNum: 1,
      limit: 10
    },
    selectedRowKeys: []
  }
  initData = async() => {
    const res = await getBranchList({
      ...this.state.searchData
    });
    this.setState({
      branchList: res.data.list,
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
      ok: deleteBranch, 
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
    const { visible, branchList, rowData, total, searchData } = this.state;
    return (
      <Layout>
        <Breadcrumb first="管理平台" second="机构管理"/>
        <Layout>
          { visible && <div></div> }
          <Layout.Content>
            <MainHanle onAdd={() => this.showAlert()} onDelete={this.deleteHandle} onSearch={this.searchHandle}/>
            <Table 
              dataSource={branchList} 
              rowKey="id" 
              size="small" 
              pagination={false} 
              scroll={{ x: 800 }}
              rowSelection={this.rowSelection}>
              <Table.Column title="机构名称" dataIndex="label"></Table.Column>
              <Table.Column title="编号" dataIndex="id"></Table.Column>
              <Table.Column title="级别" dataIndex="fLevel"></Table.Column>
              <Table.Column title="上级机构名称" dataIndex="branchname"></Table.Column>
              <Table.Column title="机构性质" dataIndex="showpropty"></Table.Column>
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
        { visible && <Alert visible={visible} data={rowData} trigger={this.AlertTrigger}/> }
      </Layout>
    )
  }
}

export default Branch