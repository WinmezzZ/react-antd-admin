import React, { FC, useEffect, useState } from 'react'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { Button } from 'antd'
import './index.less'
import { useLocale } from '~/locales'

const GuidePage: FC = () => {
  const [driver, setDriver] = useState()
  const { locale, formatMessage } = useLocale()

  useEffect(() => {
    const _driver = new Driver({
      opacity: 0.5,
      className: 'driver-overlay',
      closeBtnText: formatMessage({ id: 'app.guide.driverjs.closeBtnText' }),
      prevBtnText: formatMessage({ id: 'app.guide.driverjs.prevBtnText' }),
      nextBtnText: formatMessage({ id: 'app.guide.driverjs.nextBtnText' }),
      doneBtnText: formatMessage({ id: 'app.guide.driverjs.doneBtnText' })
    })
    setDriver(_driver)
  }, [locale, formatMessage])

  const onDriverStart = () => {
    setTimeout(() => {
      driver.defineSteps([
        {
          element: '#sidebar-trigger',
          popover: {
            title: formatMessage({ id: 'app.guide.driverStep.sidebarTrigger.title' }),
            description: formatMessage({ id: 'app.guide.driverStep.sidebarTrigger.description' }),
            position: 'bottom',
            offset: 10
          }
        },
        {
          element: '#notice-center',
          popover: {
            title: formatMessage({ id: 'app.guide.driverStep.notices.title' }),
            description: formatMessage({ id: 'app.guide.driverStep.notices.description' }),
            position: 'bottom',
            offset: -160
          }
        },
        {
          element: '#language-change',
          popover: {
            title: formatMessage({ id: 'app.guide.driverStep.switchLanguages.title' }),
            description: formatMessage({ id: 'app.guide.driverStep.switchLanguages.description' }),
            position: 'bottom',
            offset: -170
          }
        },
        {
          element: '#pageTabs .ant-tabs-nav.ant-tabs-nav-animated',
          popover: {
            title: formatMessage({ id: 'app.guide.driverStep.pageTabs.title' }),
            description: formatMessage({ id: 'app.guide.driverStep.pageTabs.description' }),
            position: 'bottom',
            offset: 30
          }
        },
        {
          element: '#pageTabs-actions svg',
          popover: {
            title: formatMessage({ id: 'app.guide.driverStep.pageTabsActions.title' }),
            description: formatMessage({ id: 'app.guide.driverStep.pageTabsActions.description' }),
            position: 'left'
          }
        }
      ])
      driver.start()
    }, 50)
  }

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
      <Button type="primary" onClick={onDriverStart}>
        {formatMessage({ id: 'app.guide.showGuide' })}
      </Button>
    </div>
  )
}

export default GuidePage
