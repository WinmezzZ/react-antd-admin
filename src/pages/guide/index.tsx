import React, { FC } from 'react'
import 'driver.js/dist/driver.min.css'
import { Button } from 'antd'
import './index.less'
import { useLocale } from '~/locales'
import useGuide from './useGuide'

const GuidePage: FC = () => {
  const { formatMessage } = useLocale()
  const { driverStart } = useGuide()

  return (
    <div className="guide-page">
      <p className="guide-intro">
        {formatMessage({ id: 'app.guide.guideIntro' })}
        <a
          className="driverjs-link"
          href="https://github.com/kamranahmedse/driver.js"
          rel="noopener noreferrer"
          target="_blank"
        >
          driver.js
        </a>
        .
      </p>
      <Button type="primary" onClick={driverStart}>
        {formatMessage({ id: 'app.guide.showGuide' })}
      </Button>
    </div>
  )
}

export default GuidePage
