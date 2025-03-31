import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppState } from './components/AuthProvider'
import routePaths from './config/RoutePaths'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RouterPublicRoutes from './RouterPublicRoutes'

const Router: React.FC = () => {
  const { state } = useAppState()
  const isLoggedin = !!state?.user?.id

  return (
    <AnimatePresence initial={false}>
      <BrowserRouter>
        <Routes>
          {RouterPublicRoutes.map(({ component: Component, path }) => (
            <Route path={path} key={path} element={<Component />} />
          ))}
          <Route path={routePaths.entry} element={isLoggedin ? <HomePage /> : <LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  )
}

export default React.memo(Router)
