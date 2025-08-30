// AdminPage.js
import { Outlet } from 'react-router-dom';
import StudentNavbar from '../../components/Student/StudentNavbar'
import { ModulesContextProvider } from '../../context/ModulesContext';
import { UsersContextProvider } from '../../context/UsersContext';

function StudentPage() {
    return (
        <div className="student-page">
            <UsersContextProvider>
                <StudentNavbar />
                <div className="space has-background-info"></div>
                <div className="student-header">
                    <ModulesContextProvider>
                        <Outlet />
                    </ModulesContextProvider>
                </div>
            </UsersContextProvider>
        </div>
    );
}

export default StudentPage;