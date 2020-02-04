import React, { FC, useState, useEffect } from 'react'
import { Row, Col, Card, Tooltip, Progress } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { ColProps } from 'antd/lib/col'
import { ReactComponent as CaretUpIcon } from './assets/caret-up.svg'
import { ReactComponent as CaretDownIcon } from './assets/caret-down.svg'
import { ResponsiveContainer, AreaChart, Tooltip as RTooltip, Area, XAxis, BarChart, Bar } from 'recharts'
import moment from 'moment'

const data = new Array(14).fill(null).map((_, index) => ({
  name: moment()
    .add('day', index)
    .format('YYYY-MM-DD'),
  number: Math.floor(Math.random() * 8 + 1)
}))

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 6
}

interface ColCardProps {
  metaName: string
  metaCount: string
  body: React.ReactNode
  footer: React.ReactNode
  loading: boolean
}

const ColCard: FC<ColCardProps> = ({ metaName, metaCount, body, footer, loading }) => {
  return (
    <Col {...wrapperCol}>
      <Card loading={loading} className="overview" bordered={false}>
        <div className="overview-header">
          <div className="overview-header-meta">{metaName}</div>
          <div className="overview-header-count">{metaCount}</div>
          <Tooltip title="Introduce">
            <InfoCircleOutlined className="overview-header-action" />
          </Tooltip>
        </div>
        <div className="overview-body">{body}</div>
        <div className="overview-footer">{footer}</div>
      </Card>
    </Col>
  )
}

interface TrendProps {
  wow: string
  dod: string
  style?: React.CSSProperties
}

const Trend: FC<TrendProps> = ({ wow, dod, style = {} }) => (
  <div className="trend" style={style}>
    <div className="trend-item">
      <span className="trend-item-label">WoW Change</span>
      <span className="trend-item-text">{wow}</span>
      <CaretUpIcon />
      <img />
    </div>
    <div className="trend-item">
      <span className="trend-item-label">DoD Change</span>
      <span className="trend-item-text">{dod}</span>
      <CaretDownIcon />
    </div>
  </div>
)

interface FieldProps {
  name: string
  number: string
}

const Field: FC<FieldProps> = ({ name, number }) => (
  <div className="field">
    <span className="filed-label">{name}</span>
    <span className="filed-number">{number} </span>
  </div>
)

const Overview: FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <Row gutter={[20, 20]}>
      <ColCard
        loading={loading}
        metaName="Total Sales"
        metaCount="¥ 126,560"
        body={<Trend wow="12%" dod="12%" />}
        footer={<Field name="Daily Sales" number="￥12,423" />}
      />
      <ColCard
        loading={loading}
        metaName="Visits"
        metaCount="8846"
        body={
          <ResponsiveContainer>
            <AreaChart data={data}>
              <XAxis dataKey="name" hide />
              <RTooltip labelStyle={{ color: '#000' }} />
              <Area type="monotone" dataKey="number" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        }
        footer={<Field name="Daily Visits" number="1234" />}
      />
      <ColCard
        loading={loading}
        metaName="Payments"
        metaCount="6560"
        body={
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" hide />
              <RTooltip labelStyle={{ color: '#000' }} />
              <Bar barSize={10} dataKey="number" stroke="#3B80D9" fill="#3B80D9" />
            </BarChart>
          </ResponsiveContainer>
        }
        footer={<Field name="Conversion Rate" number="60%" />}
      />
      <ColCard
        loading={loading}
        metaName="Visits"
        metaCount="8846"
        body={<Progress percent={85} />}
        footer={<Trend style={{ position: 'inherit' }} wow="12%" dod="12%" />}
      />
    </Row>
  )
}

export default Overview
