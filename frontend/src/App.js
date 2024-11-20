
// Imports
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from 'react-router-dom';
// Components
import Navbar from "./components/Navbar";
// Pages
import LoginPage from './pages/LoginPage';
import StudentPage from "./pages/Student/StudentPage";
import StudentDashboard from './pages/Student/StudentDashboard';
import StudentModules from './pages/Student/StudentModules';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import ResetPass from './pages/ResetPass';

import AdminPage from './pages/Admin/AdminPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminModules from './pages/Admin/AdminModules';
import AdminUsers from './pages/Admin/AdminUsers';

// Auth
import { useAuthContext } from './hooks/useAuthContext';
import AdminLogin from './pages/Admin/AdminLogin';

function pathConditions(pathname) {
  return (
    pathname !== '/login' &&
    !pathname.startsWith('/student') &&
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/alogin')
  );
}

function NavbarVisibilityWrapper() {
  const location = useLocation();
  const showNavbar = pathConditions(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
    </>
  );
}

function App() {
  const { user } = useAuthContext();
  let isStudent;
  if (user && user.userfield === 'student') {
    isStudent = true;
  }
  let isAdmin;
  if (user && user.userfield === 'admin') {
    isAdmin = true;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavbarVisibilityWrapper />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/home', element: <Navigate to="/" /> },
        { path: '/login', element: !user ? <LoginPage /> : <Navigate to="/student" /> },
        { path: '/reset-pass/:id', element: <ResetPass />},
        {
          path: '/student', element: user ? <StudentPage /> : <Navigate to="/login" />,
          children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: 'dashboard', element: <StudentDashboard /> },
            { path: 'modules', element: <StudentModules /> },

          ]
        },
        { path: '/alogin', element: !isAdmin ? <AdminLogin /> : <Navigate to="/admin" /> },
        // Admin
        {
          path: '/admin',
          element: isAdmin ? <AdminPage /> : <Navigate to="/alogin/" />,
          children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: 'modules', element: <AdminModules /> },
            { path: 'users', element: <AdminUsers /> },
          ]
        }
      ]
    }
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;
