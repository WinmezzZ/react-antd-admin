import React, { FC } from 'react'
import './index.less'
import Overview from './overview'
import SalePercent from './salePercent'
import TimeLine from './timeLine'

const DashBoardPage: FC = () => (
  <div>
    <Overview />
    <SalePercent />
    <TimeLine />
  </div>
)

export default DashBoardPage
