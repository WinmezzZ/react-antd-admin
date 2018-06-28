import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './alert'
import { getThresholdList, deleteThreshold } from '@/api'
import { Table } from 'antd'
import { exportTable } from '@/utils'

class Set extends Component {
  state = {
    visible: false,
    rowData: {},
    thresholdList: [],
    total: null,
    searchData: {
      pageNum: 1,
      limit: 17
    },
    selectedRowKeys: []
  }
  initData = async() => {
    const res = await getThresholdList({
      ...this.state.searchData
    });
    res.data && this.setState({
      thresholdList: res.data.list,
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
      ok: deleteThreshold, 
      init: this.initData,
      end: () => {
        this.setState({
          selectedRowKeys: []
        })
      }
    })
  }
  exportHanlde = () => {
    exportTable(this.state.thresholdList, '阈值管理')
  }
  componentDidMount() {
    this.initData();
  }
  render() {
    const { visible, thresholdList, rowData, total, searchData } = this.state;
    return (
      <div>
        <MainHanle 
          onAdd={() => this.showAlert()} 
          onDelete={this.deleteHandle} 
          onExport={this.exportHanlde}
          onSearch={this.searchHandle}/>
        <Table 
          dataSource={thresholdList} 
          rowKey="fThresholdid" 
          size="small" 
          pagination={false} 
          scroll={{ x: 600 }}
          rowSelection={this.rowSelection}>
          <Table.Column title="编号" dataIndex="fThresholdbh"></Table.Column>
          <Table.Column title="名称" dataIndex="fThresholdname"></Table.Column>
          <Table.Column title="固定值" dataIndex="fFixedvalue"></Table.Column>
          <Table.Column title="最小值" dataIndex="fMinivalue"></Table.Column>
          <Table.Column title="最大值" dataIndex="fMaxvalue"></Table.Column>
          <Table.Column title="错误类型" dataIndex="showfault"></Table.Column>
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
        { visible && <Alert visible={visible} data={rowData} trigger={this.AlertTrigger}/> }
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Set)