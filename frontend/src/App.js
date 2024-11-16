
// Imports
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from 'react-router-dom';
// Components
import Navbar from "./components/Navbar";
import TestModules from "./components/TestModules";
// Pages
import FormPage from './pages/FormPage';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import AdminPage from './pages/Admin/AdminPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminModules from './pages/Admin/AdminModules';
import AdminUsers from './pages/Admin/AdminUsers';

// Auth
import { useAuthContext } from './hooks/useAuthContext';
import AdminLogin from './pages/Admin/AdminLogin';

function NavbarVisibilityWrapper() {
  const location = useLocation();

  return (
    <>
      {((location.pathname !== '/form') && !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/alogin')) && <Navbar />}
      <Outlet />
    </>
  );
}

function App() {
  const { user } = useAuthContext();
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
        { path: '/modules', element: user ? <TestModules /> : <Navigate to="/form" /> },
        { path: '/form', element: !user ? <FormPage /> : <Navigate to="/modules" /> },
        { path: '/alogin', element: !isAdmin ? <AdminLogin /> : <Navigate to="/admin" /> },
        {
          path: '/admin',
          element: isAdmin ? <AdminPage /> : <Navigate to="/alogin/" />,
          children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: 'modules', element: <AdminModules /> },
            { path: 'users', element: <AdminUsers /> }
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
