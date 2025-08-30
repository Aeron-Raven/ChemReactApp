// AdminPage.js
import { Outlet } from 'react-router-dom';
import TeacherNavbar from '../../components/Teacher/TeacherNavbar';
import { ModulesContextProvider } from '../../context/ModulesContext';
import { UsersContextProvider } from '../../context/UsersContext';


function TeacherPage() {
  return (
    <div className='teacher-page'>
      <TeacherNavbar />
      <div className="space has-background-warning"></div>
      <div className="teacher-header">
        <ModulesContextProvider>
          <UsersContextProvider>
            <Outlet />
          </UsersContextProvider>
        </ModulesContextProvider>
      </div>
    </div>
  );
}

export default TeacherPage;