import React, { Component } from 'react'
import Breadcrumb from '@/components/breadcrumb/'
import { getQuestionDetail } from '@/api'
import { Row ,Col, Button } from 'antd'

const Text = ({data, show = false, border = true}) => (
  <div className="faq-text">
    <p>
      <span style={{color: '#3cc2e8', paddingRight: 4}}>{data.F_NAME}</span>
      <span>: {data.question}</span>
    </p>
    <p>
      <span className="time">{data.createDate}</span>
      <span>回复</span>
    </p>
  </div>
)

export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      searchForm: {
        rows: 5,
        page: 1
      },
      exInformation: {},
      faqList: [],
      total: null
    }
  }
  componentDidMount() {
    this.initData();
  }
  async initData() {
    const { faqId } = this.props.match.params;
    const res = await getQuestionDetail({
      faqId,
      ...this.state.searchForm
    });
    this.setState({
      exInformation: res.data.exInformation,
      faqList: res.data.list,
      total: res.data.total
    })
  }
  back = () => {
    this.props.history.replace('/app/service/faqs');
  }
  render() {
    const { exInformation } = this.state;
    console.log(exInformation)
    return (
      <div>
        <Breadcrumb first="服务中心" second="在线答疑">
          <Button type="primary" onClick={this.back}>返回</Button>
        </Breadcrumb>
        <Row type="flex" justify="center">
          <Col xxl={10} xl={12}lg={16} md={18} sm={24} xs={24}>
            <Text data={exInformation} border="border"/>
            <div className="title">全部回帖</div>
          </Col>
        </Row>
      </div>
    )
  }
}
