import React, { FC, useState, useEffect } from 'react'
import { Row, Col, Card } from 'antd'
import { ColProps } from 'antd/lib/col'
import { ReactComponent as CaretUpIcon } from './assets/caret-up.svg'
import { ReactComponent as CaretDownIcon } from './assets/caret-down.svg'

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6
}

const Overview: FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <Row gutter={20}>
      <Col {...wrapperCol}>
        <Card loading={loading} className="overview" bordered={false}>
          <div className="overview-header">
            <div className="overview-header-meta">Total Sales</div>
            <div className="overview-header-count">¥ 126,560</div>
          </div>
          <div className="overview-body">
            <div className="trend">
              <div className="trend-item">
                <span className="trend-item-label">WoW Change</span>
                <span className="trend-item-text">12%</span>
                <CaretUpIcon />
                <img />
              </div>
              <div className="trend-item">
                <span className="trend-item-label">DoD Change</span>
                <span className="trend-item-text">12%</span>
                <CaretDownIcon />
              </div>
            </div>
          </div>
          <div className="overview-footer">
            <div className="field">
              <span className="filed-label">Daily Sales</span>
              <span className="filed-number">￥12,423</span>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default Overview
