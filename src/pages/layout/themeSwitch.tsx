import React, { FC, useState } from 'react'
import { Popover, message } from 'antd'
import { CheckOutlined, FontColorsOutlined } from '@ant-design/icons'
import { useLocale } from '~/locales'

const colors = [
  '#13C2C2',
  'rgb(24, 144, 255)',
  'rgb(245, 34, 45)',
  'rgb(250, 84, 28)',
  'rgb(250, 173, 20)',
  'rgb(82, 196, 26)',
  'rgb(47, 84, 235)',
  'rgb(114, 46, 209)'
]

const defaultVars = {
  '@primary-color': colors[0]
}

export const ThemeSwitch: FC = () => {
  const [theme, setTheme] = useState<string>(colors[0])
  const [vars, setVars] = useState(() => {
    const data = Object.assign({}, defaultVars, JSON.parse(localStorage.getItem('app-theme')!))
    setTheme(data['@primary-color'])
    window.less.modifyVars(data)
    return data
  })
  const { formatMessage } = useLocale()

  const onThemeChange = (color: string) => {
    message.loading(formatMessage({ id: 'global.theme.switchingTheme' }))
    const newVar: any = { ...vars }
    newVar['@primary-color'] = color
    window.less
      .modifyVars(newVar)
      .then(() => {
        setTheme(color)
        setVars(newVar)
        localStorage.setItem('app-theme', JSON.stringify(newVar))
        message.destroy()
        message.success(formatMessage({ id: 'global.theme.switchThemeDone' }))
      })
      .catch(() => {
        message.error(formatMessage({ id: 'global.theme.switchThemeFail' }))
        console.error('Failed to update theme')
      })
  }

  return (
    <Popover
      trigger="click"
      title={formatMessage({ id: 'global.theme.switchTheme' })}
      content={
        <div className="theme-color-content">
          {colors.map(color => (
            <div
              className="theme-color-block"
              key={color}
              style={{ backgroundColor: color }}
              onClick={() => onThemeChange(color)}
            >
              {theme === color && <CheckOutlined />}
            </div>
          ))}
        </div>
      }
    >
      <div className="themeSwitch">
        <span id="switchTheme">
          <FontColorsOutlined style={{ color: theme }} />
        </span>
      </div>
    </Popover>
  )
}

export default ThemeSwitch
