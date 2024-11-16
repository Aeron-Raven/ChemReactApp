import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal";
import { useLogout } from "../../hooks/useLogout";

const AdminNavbar = () => {
    const { logout } = useLogout();
    const [active, setActive] = useState('');
    const [click, setClick] = useState(false);

    const handleLogout = () => {
        logout();
    }

    return (
        <aside className="menu admin-navbar">
            <div className="media-content">
                <p className="title is-4">Admin</p>
                <p className="subtitle is-6">ChemTool Vision</p>
                <div className="content">
                    <time>{new Date().toDateString()}</time>
                </div>
            </div>
            <p className="menu-label">Administration</p>
            <ul className="menu-list">
                <li>
                    <Link
                        className={active === 'dashboard' ? 'is-active' : ''}
                        onClick={() => setActive('dashboard')} to="/admin/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link className={active === 'modules' ? 'is-active' : ''}
                        onClick={() => setActive('modules')} to="/admin/modules">
                        Modules
                    </Link>
                </li>
                <li>
                    <Link
                        className={active === 'users' ? 'is-active' : ''}
                        onClick={() => setActive('users')} to="/admin/users">
                        Users
                    </Link>
                </li>
                <li><Link onClick={() => setClick(true)}>Logout</Link></li>
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

export default AdminNavbar;