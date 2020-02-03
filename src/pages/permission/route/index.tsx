import React, { FC } from 'react'
import { LocaleFormatter } from '~/locales'

const RoutePermissionPage: FC = () => {
  return (
    <div style={{ fontSize: 16, fontWeight: 'bold' }}>
      <LocaleFormatter id="gloabal.tips.loginResult" />
    </div>
  )
}

export default RoutePermissionPage
