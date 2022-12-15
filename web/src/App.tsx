import './styles/main.css'
import './styles/scrollbar.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { PrivateRoutes } from './components/PrivateRoutes'
import { Dashboard } from './pages/Dashboard'
import { ClienteProvider } from './context/ClienteContext'

function App() {
  return (
    <ClienteProvider>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<SignIn />} />
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
