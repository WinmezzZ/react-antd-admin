import React, { FC } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ProTable, { IntlProvider, createIntl } from '@ant-design/pro-table'
import { useLocale } from '~/locales'
import { apiGetRoleList } from '~/api/permission/role.api'
import { Role } from '~/interface/permission/role.interface'
import { useSelector } from 'react-redux'
import { AppState } from '~/stores'
import useProTableLocale from '~/hooks/useProTableLocale'

const ComplexPage: FC = () => {
  const { formatMessage } = useLocale()
  const { locale } = useSelector((state: AppState) => state.globalReducer)
  const lang = useProTableLocale(locale)

  return (
    <IntlProvider value={createIntl(locale, lang)}>
      <ProTable<Role>
        rowKey="id"
        columns={[
          {
            title: formatMessage({ id: 'app.permission.role.name' }),
            dataIndex: 'name',
            width: 100,
            render: (_, { name }) => name[locale]
          },
          {
            title: formatMessage({ id: 'app.permission.role.code' }),
            dataIndex: 'code',
            width: 100
          },
          {
            title: formatMessage({ id: 'app.permission.role.status' }),
            dataIndex: 'status',
            width: 100,
            valueEnum: {
              all: { text: formatMessage({ id: 'app.permission.role.status.all' }), status: 'Default' },
              enabled: { text: formatMessage({ id: 'app.permission.role.status.enabled' }), status: 'Success' },
              disabled: { text: formatMessage({ id: 'app.permission.role.status.disabled' }), status: 'Error' }
            }
          },
          {
            title: formatMessage({ id: 'gloabal.tips.operation' }),
            key: 'option',
            valueType: 'option',
            align: 'center',
            width: 140,
            render: () => [
              <Button type="link" key="1">
                {formatMessage({ id: 'gloabal.tips.authorize' })}
              </Button>,
              <Button type="link" key="2">
                {formatMessage({ id: 'gloabal.tips.delete' })}
              </Button>
            ]
          }
        ]}
        request={async () => {
          const { result: data, status: success } = await apiGetRoleList()
          return {
            data,
            success
          }
        }}
        pagination={{
          showSizeChanger: true
        }}
        scroll={{
          x: 440
        }}
        dateFormatter="string"
        params={{ state: 'all' }}
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            {formatMessage({ id: 'gloabal.tips.create' })}
          </Button>
        ]}
      />
    </IntlProvider>
  )
}

export default ComplexPage
