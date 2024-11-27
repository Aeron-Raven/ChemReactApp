import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const TeacherNavbar = () => {
    const { logout } = useLogout();
    const [active, setActive] = useState('dashboard');
    const [click, setClick] = useState(false);
    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    }

    return (
        <aside className="menu teacher-navbar">
            <div className="media-content p-5">
                <p className="title is-4">{user.name}</p>
                <p className="subtitle is-6">ChemTool Vision</p>
                <div className="content">
                    <time>{new Date().toDateString()}</time>
                </div>
            </div>
            <p className="menu-label p-2">Welcome to Chemtool Vision</p>
            <ul className="menu-list">
                <li>
                    <Link
                        to="/">
                        Home
                    </Link>
                </li>
            </ul>
            <p className="menu-label p-2">General</p>
            <ul className="menu-list">
                <li>
                    <Link
                        className={active === 'dashboard' ? 'is-active' : ''}
                        onClick={() => setActive('dashboard')} to="/teacher/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        className={active === 'modules' ? 'is-active' : ''}
                        onClick={() => setActive('modules')} to="/teacher/modules">
                        Current Modules
                    </Link>
                </li>
                <li>
                    <Link
                        className={active === 'users' ? 'is-active' : ''}
                        onClick={() => setActive('users')} to="/teacher/users">
                        Students
                    </Link>
                </li>
            </ul>
            <p className="menu-label p-2">Utilities</p>
            <ul className="menu-list">
                <li><button onClick={() => setClick(true)}>Logout</button></li>
            </ul>
            <Modal
                click={click} setClick={setClick}
                header="Logout"
                body="Are you sure you want to logout?"
                footer={
                    <div className='modal-card-foot'>
                        <button className="button is-danger" onClick={() => handleLogout()}>Logout</button>
                        <button className="button" onClick={() => setClick(false)}>Cancel</button>
                    </div>} />
        </aside>
    );
}

export default TeacherNavbar;