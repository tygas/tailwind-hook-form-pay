import React from 'react'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router'

import { Layout } from '@c/Layout'

import { LocaleProvider } from './context/LocaleContext'
import Pay from './features/Pay/index'
import { store } from './store'

const App: React.FC = () => {
  return (
    <ReduxStoreProvider store={store}>
      <LocaleProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Pay />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LocaleProvider>
    </ReduxStoreProvider>
  )
}

export default App
