// Imports
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
// Components
import Navbar from "./components/Navbar"
import TestModules from "./components/TestModules"
// Pages
import FormPage from './pages/FormPage'
import Home from './pages/Home'
import Teacher from './pages/TeacherPage'
// Auth
import { useAuthContext } from './hooks/useAuthContext'

function NavbarVisibilityWrapper({ children }) {
  const location = useLocation();

  return (
    <>
      {(location.pathname !== '/form' && location.pathname !== '/teacher/tests') && <Navbar />}
      {children}
    </>
  );
}

function App() {

  const { user } = useAuthContext()
  let isTeacher = true

  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <NavbarVisibilityWrapper>
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/modules'
                element={user ? <TestModules /> : <Navigate to="/form" />}
              />
              <Route
                path='/form'
                element={!user ? <FormPage /> : <Navigate to="/modules" />}
              />
              <Route
                path='/teacher/tests'
                element={(user && isTeacher) ? <Teacher /> : <Navigate to="/form" />}
              />
            </Routes>
          </NavbarVisibilityWrapper>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
