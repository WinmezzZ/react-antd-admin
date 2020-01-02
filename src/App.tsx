import React from 'react'
import styled from 'styled-components'
import './App.less'
import { LayoutPage } from './pages/layout'

type Props = {
  title?: string
  content?: string
}

const Ap = styled.div`
  justify-content: center;
  display: block;
`
const P = styled(LayoutPage)`
  color: inherit;
`

const App: React.FC<Props> = props => {
  return (
    <Ap className="App" style={{ height: '100%' }}>
      <React.Suspense fallback={<div>1</div>}>
        <P />
      </React.Suspense>
    </Ap>
  )
}

export default App
