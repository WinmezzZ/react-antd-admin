import React, { Component } from 'react'
import Breadcrumb from '@/components/breadcrumb/'
import { getStore } from '@/utils'
import { addQuestion, getQuestionList } from '@/api'
import { Row ,Col, Input, Button, Pagination, message } from 'antd'


export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      questionList: [],
      searchData: {
        limit: 5,
				pageNum: 1
      }
    }
  }
  componentDidMount() {
    this.initData();
  }
  async initData() {
    const res = await getQuestionList({
      ...this.state.searchData
    });
    this.setState({
      questionList: res.data.list,
      total: res.data.total
    })
  }
  changeValue = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  addQuestion = async() => {
    await addQuestion({
      question: this.state.value,
      F_PID :getStore('userid')
    });
    message.success('提交成功！');
    this.setState({
      value: ''
    });
    this.initData();
    
    
  }
  changePage = (pageNum) => {
    const { searchData } = this.state;
    searchData.pageNum = pageNum;
    this.setState({
      searchData
    }, () => {
      this.initData();
    })
  }
  toDetail(faqId) {
    this.props.history.replace(`/app/service/faqs/detail/${faqId}`)
  }
  render() {
    const { questionList, total, value } = this.state;
    const { limit, pageNum } = this.state.searchData;
    return (
      <div className="main">
        <Breadcrumb first="服务中心" second="在线答疑">
        </Breadcrumb>
        <Row type="flex" justify="center">
          <Col xxl={10} xl={12}lg={16} md={18} sm={24} xs={24}>
            <div className="title">我要提问</div>
            <Input.TextArea value={value} onChange={this.changeValue} placeholder="请输入您要提问的问题" rows={6}/>
            <Row type="flex" justify="end" style={{margin: '10px 0'}}>
              <Button type="primary" onClick={this.addQuestion}>提交</Button>
            </Row>
            <div className="title">查询历史</div>
            <ul>
              {
                questionList.map(item => 
                  <li className="question-list-item" key={item.faqId}>
                    <p><i className="question-list-icon" style={{ backgroundImage: `url(${require('@/style/imgs/q.png')})`}}/>{item.question}</p>
                    <Row type="flex" justify="space-between">
                      <Col span="16">
                        <i className="question-list-icon" style={{ backgroundImage: `url(${require('@/style/imgs/a.png')})`}}/>
                        {item.answerContent || '暂无回答'}
                      </Col>
                      <span className="to-detail" onClick={this.toDetail.bind(this, item.faqId)}>查看详情>></span>
                    </Row>
                  </li>
                )
              }
            </ul>
            <Pagination size="small" showQuickJumper 
              current={pageNum} pageSize={limit} total={total} 
              showTotal={(total, range) => `共 ${total} 条`}
              onChange={this.changePage}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
