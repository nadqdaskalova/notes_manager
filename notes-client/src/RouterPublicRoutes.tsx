import routePaths from './config/RoutePaths'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const RouterPublicRoutes = [
  { path: routePaths.login, component: LoginPage },
  { path: routePaths.register, component: RegisterPage }
]

export default RouterPublicRoutes
