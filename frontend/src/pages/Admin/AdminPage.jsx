// AdminPage.js
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/Admin/AdminNavbar'
import { ModulesContextProvider } from '../../context/ModulesContext';
import { UsersContextProvider } from '../../context/UsersContext';


function AdminPage() {
  return (
    <div className='admin-page'>
      <AdminNavbar />
      <div className="space"></div>
      <div className="admin-header">
        <ModulesContextProvider>
          <UsersContextProvider>
            <Outlet />
          </UsersContextProvider>
        </ModulesContextProvider>
      </div>
    </div>
  );
}

export default AdminPage;