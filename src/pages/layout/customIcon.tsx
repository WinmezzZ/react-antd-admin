import React, { FC } from 'react'
import { ReactComponent as GuideSvg } from '~/assets/menu/guide.svg'
import { ReactComponent as PermissionSvg } from '~/assets/menu/permission.svg'
import { ReactComponent as DashboardSvg } from '~/assets/menu/dashboard.svg'

interface Props {
  type: string
}

export const CustomIcon: FC<Props> = props => {
  const { type } = props
  let com = <GuideSvg />
  if (type === 'guide') {
    com = <GuideSvg />
  } else if (type === 'permission') {
    com = <PermissionSvg />
  } else if (type === 'dashboard') {
    com = <DashboardSvg />
  } else {
    com = <GuideSvg />
  }
  return <span className="anticon">{com}</span>
}
