import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const [modal, setModal] = useState('modal')

    const modalOpen = () => {
        setModal('modal is-active')
    }
    const modalClose = () => {
        setModal('modal')
    }
    const handleClick = () => {
        logout()
        window.location.href = "/login"
        setModal('modal')
    }
    return (
        <nav className="navbar fade-animate">
            <div className="logo">
                <img src="https://placehold.co/1920x1080" alt="Logo" />
            </div>
            <div className="menu-container">
                <Link to="/">
                    <span className="menu-link">Home</span>
                </Link>
                <Link href="#" className="menu-link">Features</Link>
                <Link href="#aboutus" className="menu-link">About us</Link>
            </div>
            <div className="navbtn-container">
                <Link href="#downloadnow" className="button is-black">Download</Link>
                {!user && (<Link to="/login" className="button is-black is-outlined">Login/Signup</Link>)}
                {user && (
                    <figure className="image is-64x64">
                        <img className="is-rounded" src="https://placehold.co/400x400" alt="user-avatar" />
                    </figure>
                )}
                {(user && user.userfield === 'admin') && (
                    <div className="nav-user-container">
                        <Link to="/admin" className="button is-black" tabIndex="0">Admin</Link>
                        <button className="button" onClick={modalOpen}>Logout</button>
                    </div>
                )}
                {(user && user.userfield !== 'admin') && (
                    <div className="nav-user-container">
                        <Link to="/student" className="button is-black" tabIndex="0">My Dashboard</Link>
                        <button className="button" onClick={modalOpen}>Logout</button>
                    </div>
                )}
            </div>

            <div className={modal}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Logout</p>
                        <button className="delete" onClick={modalClose}></button>
                    </header>
                    <section className="modal-card-body">
                        <p>Are you sure?</p>
                    </section>
                    <footer className="modal-card-foot is-right">
                        <div className="buttons">
                            <button className="button is-success" onClick={handleClick}>Yes</button>
                            <button className="button is-danger" onClick={modalClose}>Cancel</button>
                        </div>
                    </footer>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;