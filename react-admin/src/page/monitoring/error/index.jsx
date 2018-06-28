import React from 'react'
import { getWorkOrderList } from '@/api'
import { getStore } from '@/utils'
import '@/style/pages/error.scss'
import { Table, Pagination, Input, Button, Radio } from 'antd';
const { Column } = Table;
const Search = Input.Search;

class Error extends React.Component {
	constructor() {
		super();
		this.state = {
			sourceData: [],
			orderList: [],
			total: null,
			page: 1,
			row: 10,
			btnGroupVal: null,
      orderStatu: null,
      todoText: ''
		}
	}
	async initData() {
		const res  = await getWorkOrderList({
			fUserid: getStore('userid')
		});
		res.data.forEach(item => {
      item.key = item.fEventid
    })
    this.setState({
			sourceData: res.data,
    	orderList: res.data.slice(0, this.state.row-1),
      total: res.data.length
    })
	}
	componentDidMount() {
    this.initData();
	}
	keywordSearch = (event) => {
		let keyword = event.target.value;
		let arr = this.state.sourceData.filter(item => {
			let needs = [
				item.fEventid,
				item.fRepairtime,
				item.fAddress,
				item.fEdesc,
				item.fSerperson,
				item.showstate
			]
			let result = needs.filter(each => {
				each += ''
				return each.includes(keyword)
			});
			return result.length !== 0
		});
		this.setState({
			orderList: arr
		})
	}
	pageChangeHandle = (page) => {
		const { sourceData, row } = this.state
		this.setState({
			page,
			orderList: sourceData.slice((page-1)*row, page*row)
		})
	}
	sizeChangeHandle = (current, size) => {
		const { sourceData, page } = this.state
		this.setState({
			row: size
		}, () => {
			this.setState({
				orderList: sourceData.slice((page-1)*size, page*size)
			})
		})
	}
	btnGroupValChange = (e) => {
		this.setState({
			btnGroupVal: e.target.value
		})
	}
	orderStatuChange =(e) => {
		this.setState({
			orderStatu: e.target.value
		})
  }
  changeHandle = e => {
    this.setState({
			todoText: e.target.value
		})
  }
  addTodo = () => {
    console.log(this.state.todoText)
    this.props.addTodo(this.state.todoText)
  }
	render() {
		return (
			<div className="main">
				<ul className="search-area">
					<li className="flex_ca">
						<div style={{display: 'inline'}}>
							<Button type="primary">派单</Button>
							<Button type="primary" style={{marginLeft: '15px'}}>查看</Button>
						</div>
						<div className="search-btn">
							<Search onInput={this.keywordSearch} className="w-250"/>
							<Radio.Group 
								value={this.state.btnGroupVal} 
								onChange={this.btnGroupValChange}
								style={{marginLeft: '5px'}}>
								<Radio.Button value={1}>区域筛选</Radio.Button>
								<Radio.Button value={2}>刷新</Radio.Button>
							</Radio.Group>
						</div>
					</li>
					<li>
						工单状态：<Radio.Group 
							value={this.state.orderStatu} 
							onChange={this.orderStatuChange}
							style={{marginLeft: '5px'}}>
							<Radio.Button value={''}>全部</Radio.Button>
							<Radio.Button value={2}>已派发</Radio.Button>
							<Radio.Button value={3}>已响应</Radio.Button>
							<Radio.Button value={4}>处理中</Radio.Button>
							<Radio.Button value={6}>现场完成</Radio.Button>
						</Radio.Group>
					</li>
				</ul>
				<Table 
					bordered
					pagination={false}
					size="small"
					dataSource={this.state.orderList}
          rowKey="fEventid">
					<Column
		        title="工单编号"
		        dataIndex="fEventid"
		        key="fEventid"/>
		      <Column
		        title="报修时间"
		        dataIndex="fRepairtime"
		        key="fRepairtime"/>
		        <Column
		        title="报修地址"
		        dataIndex="fAddress"
		        key="fAddress"/>
		        <Column
		        title="工单描述"
		        dataIndex="fEdesc"
		        key="fEdesc"/>
		        <Column
		        title="运维工程师"
		        dataIndex="fSerperson"
		        key="fSerperson"/>
		        <Column
		        title="工单状态"
		        dataIndex="showstate"
		        key="showstate"/>
				</Table>
				<Pagination 
					size="small" 
					total={this.state.total} 
					current={this.state.page}
					pageSize={this.state.row}
					pageSizeOptions={['10','12','14','16','18','20']}
					showSizeChanger 
					showQuickJumper 
					showTotal={(total, range) => `共 ${total} 条`}
					onChange={this.pageChangeHandle}
					onShowSizeChange={this.sizeChangeHandle}
          />
          <input value={this.state.todoText} onChange={this.changeHandle}/> 
          <button onClick={this.addTodo}>添加</button>
          <ul>
            {
              this.props.todos.map(item => 
                <li key={item.id}>
                  {item.text} 
                  <span onClick={this.props.deleteTodo}>X</span>
                </li>
              )
            }
          </ul>
			</div>
		)
	}
}

export default Error