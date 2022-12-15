import './styles/main.css'
import './styles/scrollbar.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { PrivateRoutes } from './components/PrivateRoutes'
import { Dashboard } from './pages/Dashboard'
import { ClienteProvider } from './context/ClienteContext'
import { ProductsPage } from './pages/ProductsPage'

function App() {
  return (
    <ClienteProvider>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<ProductsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoutes />} >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </ClienteProvider>
  )
}
export default App
