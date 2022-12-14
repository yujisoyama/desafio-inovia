import './styles/main.css'
import './styles/scrollbar.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}
export default App
