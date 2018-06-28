import React, { Component } from 'react'
import { connect } from 'react-redux'
import Breadcrumb from '@/components/breadcrumb'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './alert'
import { getSetList, deleteSet } from '@/api'
import { Table, Layout } from 'antd'

class Set extends Component {
  state = {
    visible: false,
    rowData: {},
    setList: [],
    total: null,
    searchData: {
      pageNum: 1,
      limit: 17
    },
    selectedRowKeys: []
  }
  initData = async() => {
    const res = await getSetList({
      ...this.state.searchData
    });
    res.data && this.setState({
      setList: res.data.list,
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
      ok: deleteSet, 
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
    const { visible, setList, rowData, total, searchData } = this.state;
    return (
      <Layout>
        <Breadcrumb first="管理平台" second="配置管理"/>
        <Layout>
          <Layout.Content>
            <MainHanle onAdd={() => this.showAlert()} onDelete={this.deleteHandle} onSearch={this.searchHandle}/>
            <Table 
              dataSource={setList} 
              rowKey="id" 
              size="small" 
              pagination={false} 
              scroll={{ x: 600 }}
              rowSelection={this.rowSelection}>
              <Table.Column title="分类代码" dataIndex="fCatid"></Table.Column>
              <Table.Column title="代码" dataIndex="fId"></Table.Column>
              <Table.Column title="代码名称" dataIndex="fName"></Table.Column>
              <Table.Column title="备注" dataIndex="fNote"></Table.Column>
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

const mapStateToProps = state => state

export default connect(mapStateToProps)(Set)