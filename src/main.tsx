import React from 'react'
import ReactDOM from 'react-dom/client'
import state from '@/state/index.ts';
import { Provider } from 'react-redux'
import { Example } from '@/components/Example'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={ state }>
      <div>
        <h1>HOLA MUNDO</h1>
        <Example />
      </div>
    </Provider>
  </React.StrictMode>,
)
