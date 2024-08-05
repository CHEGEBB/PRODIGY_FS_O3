import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <div className="container-main">
  <div className="overlay"></div>
    <App />
    </div>
  </React.StrictMode>,
)
