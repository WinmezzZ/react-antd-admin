import React, { FC, useState } from 'react'
import RoleCreateDialog from './roleCreateDialog'
import RoleTable from './roleTable'
import RoleSearch from './roleSearch'
import RoleModifyDialog from './roleModifyDialog'

const RolePage: FC = () => {
  const [createvisible, setCreateVisible] = useState(false)
  const [modifyvisible, setModifyVisible] = useState(false)
  return (
    <div>
      <RoleSearch />
      <RoleCreateDialog
        visible={createvisible}
        onCancel={() => setCreateVisible(false)}
        onCreate={() => setCreateVisible(false)}
      />
      <RoleModifyDialog
        visible={modifyvisible}
        onCancel={() => setModifyVisible(false)}
        onModify={() => setModifyVisible(false)}
      />
      <RoleTable onCreate={() => setCreateVisible(true)} onModify={() => setModifyVisible(true)} />
    </div>
  )
}

export default RolePage
