import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './alert'
import { getStandardList, deleteStandard } from '@/api'
import { Table } from 'antd'

class Set extends Component {
  state = {
    visible: false,
    rowData: {},
    standardList: [],
    total: null,
    searchData: {
      pageNum: 1,
      limit: 17,
      condition: ''
    },
    selectedRowKeys: []
  }
  initData = async() => {
    const res = await getStandardList({
      ...this.state.searchData
    });
    res.data && this.setState({
      standardList: res.data.list,
      total: res.data.total
    })
  }
  searchHandle = async(condition) => {
    await this.setState({
      searchData: {...this.state.searchData, condition}
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
      ok: deleteStandard, 
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
    const { visible, standardList, rowData, total, searchData } = this.state;
    return (
      <div>
        <MainHanle onAdd={() => this.showAlert()} onDelete={this.deleteHandle} onSearch={this.searchHandle}/>
        <Table 
          dataSource={standardList} 
          rowKey="fId" 
          size="small" 
          pagination={false} 
          scroll={{ x: 600 }}
          rowSelection={this.rowSelection}>
          <Table.Column title="出水标准" dataIndex="fStandardname"></Table.Column>
          <Table.Column title="Cod" dataIndex="fCod"></Table.Column>
          <Table.Column title="Bod" dataIndex="fBod"></Table.Column>
          <Table.Column title="氨氮" dataIndex="fAd"></Table.Column>
          <Table.Column title="PH" dataIndex="fPh"></Table.Column>
          <Table.Column title="总磷" dataIndex="fPhosphorus"></Table.Column>
          <Table.Column title="总氮" dataIndex="fNitrogen"></Table.Column>
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