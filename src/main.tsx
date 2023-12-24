import React from 'react'
import ReactDOM from 'react-dom/client'
import state from '@/state/index.ts';
import { Provider } from 'react-redux'
import Home from './views/Home';
import "@/styles/main.scss";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={ state }>
      <Home />
    </Provider>
  </React.StrictMode>);
