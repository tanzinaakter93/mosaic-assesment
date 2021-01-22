import React from 'react'
import ReactDOM from 'react-dom'
import App from 'src/App.jsx'
import Home from 'pages/Home'

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Home />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
)
