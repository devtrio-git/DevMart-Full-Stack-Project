import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import SidebarProvider from './contexts/sidebar.context.jsx';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
