import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { CoursesPage } from './pages/CoursesPage'
import { InstancesPage } from './pages/InstancesPage'

const App: React.FC = () => (
  <BrowserRouter>
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Courses</Link> |{' '}
      <Link to="/instances">Instances</Link>
    </nav>

    <Routes>
      <Route path="/" element={<CoursesPage />} />
      <Route path="/instances" element={<InstancesPage />} />
    </Routes>
  </BrowserRouter>
)

export default App
