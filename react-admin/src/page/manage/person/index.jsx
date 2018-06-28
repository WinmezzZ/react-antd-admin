import React, { Component } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './alert'
import Organization from '@/components/organizationSelect'
import './index.scss'
import { Layout, Table } from 'antd'
import { getUserList, deleteUser } from '@/api'

export default class App extends Component {
  state = {
    personList: [],
    total: 0,
    searchData: {
      limit: 17,
      pageNum: 1,
      fbrno: ''
    },
    selectedRowKeys: [],
    visible: false,
    rowData: {}
  }
  componentDidMount() {
    this.initData();
  }
  initData = async() => {
    const res = await getUserList({
      ...this.state.searchData
    });
    this.setState({
      personList: res.data.list,
      total: res.data.total
    })
  }
  searchHandle = async(condition) => {
    await this.setState({
      searchData: {...this.state.searchData, pageNum: 1 ,condition}
    })
    this.initData()
  }
  branchChange = async(val) => {
    console.log(val)
    this.setState({
      searchData: {
        ...this.state.searchData, 
        fbrno: val.toString()
      }
    })
    this.initData()
  }
  pageChangeHandle = async (pageNum) => {
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
  deleteHandle = () => {
    const keys = this.state.selectedRowKeys
    Delete({
      keys, 
      ok: deleteUser, 
      init: this.initData,
      end: () => {
        this.setState({
          selectedRowKeys: []
        })
      }
    })
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
  render() {
    const { personList, total, visible, rowData, searchData } = this.state;
    return (
      <Layout>
        <Breadcrumb first="管理平台" second="人员管理"/>
        <Layout>
          <Organization onSelect={this.branchChange}/>
          <Layout.Content>
            <MainHanle onAdd={() => this.showAlert()} onDelete={this.deleteHandle} onSearch={this.searchHandle}/>
            <Table
              dataSource={personList} 
              rowKey="fPid" 
              size="small" 
              rowSelection={this.rowSelection}
              pagination={false} 
              scroll={{ x: 800 }}>
              <Table.Column title="姓名" dataIndex="fName"/>
              <Table.Column title="所属机构" dataIndex="branchname"/>
              <Table.Column title="角色" dataIndex="rolename"/>
              <Table.Column title="联系手机" dataIndex="fTelephone1"/>
              <Table.Column title="责任区域" dataIndex="area_name" render={text => 
                <span dangerouslySetInnerHTML={{__html: text}}></span>
              }/>
              <Table.Column title="服务标志" dataIndex="showstate" 
                render={(text,record) => 
                  <span className={ `server-statu ${record.fState === '0' ? 'normal' : 'rest'}` }>{text}</span>
                }>
              </Table.Column>
              <Table.Column title="操作" width="90px" fixed="right" render={(text, record) => (
                <span className="span" onClick={() => this.showAlert(record)}>
                  查看详情
                </span>
              )}/>
            </Table>
            <Pagination
              total={total} searchData={searchData}
              onChange={this.pageChangeHandle}/>
          </Layout.Content>
        </Layout>
        { visible && <Alert visible={visible} data={rowData} trigger={this.AlertTrigger}/> }
      </Layout>
    )
  }
}
