import './styles/main.css'
import './styles/scrollbar.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { PrivateRoutes } from './components/PrivateRoutes'
import { Dashboard } from './pages/Dashboard'
import { ClienteProvider } from './context/ClienteContext'
import { AllProductsPage } from './pages/AllProductsPage'
import { ProductPage } from './pages/ProductPage'

function App() {
  return (
    <ClienteProvider>
      <Router>
        <Routes>
          <Route path="*" element={<AllProductsPage />} />
          <Route path="/" element={<AllProductsPage />} />
          <Route path="/produto/:productId" element={<ProductPage />} />
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
