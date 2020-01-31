import { Button, Result } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useLocale } from '~/locales'

const NotFoundPage: React.FC<{}> = () => {
  const history = useHistory()
  const { formatMessage } = useLocale()
  return (
    <Result
      status="404"
      title="404"
      subTitle={formatMessage({ id: 'gloabal.tips.notfound' })}
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          {formatMessage({ id: 'gloabal.tips.backHome' })}
        </Button>
      }
    ></Result>
  )
}

export default NotFoundPage
