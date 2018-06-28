import React, { Component } from 'react'
import { getAreaList, deleteArea } from '@/api'
import Breadcrumb from '@/components/breadcrumb'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './alert'
import StationSelect from '@/components/stationSelect/'
import { Table, Layout } from 'antd'

export default class componentName extends Component {
  state = {
    areaList: [],
    total: null,
    searchData: {
      limit: 17,
      pageNum: 1,
      fAreaid: ''
    },
    loading: true,
    selectedRowKeys: [],
    visible: false,
    rowData: {}
  }
  componentDidMount() {
    this.initData();
  }
  initData = async() => {
    const res = await getAreaList({
      ...this.state.searchData
    });
    this.setState({
      areaList: res.data.list,
      total: res.data.total
    })
  }
  searchHandle = async(condition) => {
    await this.setState({
      searchData: {...this.state.searchData, pageNum: 1 ,condition}
    })
    this.initData()
  }
  treeSelect = async(val) => {
    await this.setState({
      searchData: {
        ...this.state.searchData, 
        fAreaid: val.toString()
      }
    })
    this.initData()
  }
  pageChange = async(pageNum) => {
    await this.setState({
      searchData: {...this.state.searchData, pageNum}
    })
    this.initData()
  }
  deleteHandle = () => {
    const keys = this.state.selectedRowKeys
    Delete({
      keys, 
      ok: deleteArea, 
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
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        selectedRowKeys
      })
    },
  }
  render() {
    const { areaList, visible, rowData, total, searchData } = this.state
    return (
      <Layout>
        <Breadcrumb first="管理平台" second="行政区域管理"/>
        <Layout>
          <StationSelect onSelect={this.treeSelect}/>
          <Layout.Content>
            <MainHanle onAdd={() => this.showAlert()} onDelete={this.deleteHandle} onSearch={this.searchHandle}/>
            <Table
              dataSource={areaList} 
              rowKey="id" 
              size="small" 
              rowSelection={this.rowSelection}
              pagination={false} 
              scroll={{ x: 800 }}>
              <Table.Column title="区域名称" dataIndex="label"/>
              <Table.Column title="区域等级" dataIndex="fLevel" 
                render={(text,record) => 
                  `测试${text}级`
                }/>
              <Table.Column title="上级区域名称" dataIndex="showname"/>
              <Table.Column title="操作" width="90px" fixed="right" render={(text, record) => (
                <span className="span" onClick={() => this.showAlert(record)}>
                  查看详情
                </span>
              )}/>
            </Table>
            <Pagination total={total} searchData={searchData} onChange={this.pageChange}/>
          </Layout.Content>
        </Layout>
        { visible && <Alert visible={visible} data={rowData} trigger={this.AlertTrigger}/> }
      </Layout>
    )
  }
}
