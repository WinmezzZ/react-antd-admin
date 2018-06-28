import React, { Component } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './alert'
import StationSelect from '@/components/stationSelect/'
import { getStationList, deleteStation } from '@/api'
import { Table, Layout } from 'antd'

class Branch extends Component {
  state = {
    visible: false,
    rowData: {},
    stationList: [],
    total: null,
    searchData: {
      pageNum: 1,
      limit: 17,
      fAreaid: ''
    },
    selectedRowKeys: []
  }
  initData = async() => {
    const res = await getStationList({
      ...this.state.searchData
    });
    res.data && this.setState({
      stationList: res.data.list,
      total: res.data.total
    })
  }
  treeSelect = async(val) => {
    console.log(val)
    await this.setState({
      searchData: {
        ...this.state.searchData, 
        fAreaid: val.toString()
      }
    })
    this.initData()
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
      ok: deleteStation, 
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
    const { visible, stationList, rowData, total, searchData } = this.state;
    return (
      <Layout>
        <Breadcrumb first="管理平台" second="站点管理"/>
        <Layout>
          <StationSelect onSelect={this.treeSelect}/>
          <Layout.Content>
            <MainHanle onAdd={() => this.showAlert()} onDelete={this.deleteHandle} onSearch={this.searchHandle}/>
            <Table 
              dataSource={stationList} 
              rowKey="fPid" 
              size="small" 
              pagination={false} 
              scroll={{ x: 800 }}
              rowSelection={this.rowSelection}>
              <Table.Column title="站点名称" dataIndex="fName"></Table.Column>
              <Table.Column title="所属机构" dataIndex="branchname"></Table.Column>
              <Table.Column title="上级机构名称" dataIndex="areaname"></Table.Column>
              <Table.Column title="负责人" dataIndex="contname"></Table.Column>
              <Table.Column title="负责人电话" dataIndex="fConttel"></Table.Column>
              <Table.Column title="服务户数" dataIndex="fSerFamily"></Table.Column>
              <Table.Column title="服务人数" dataIndex="fSerPeople"></Table.Column>
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