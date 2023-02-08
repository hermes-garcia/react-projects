import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {TodoApp} from './TodoApp';

import { store } from './store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <TodoApp />
      </Provider>
  </React.StrictMode>
)
