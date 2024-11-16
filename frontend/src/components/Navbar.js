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
        window.location.href = "/form"
        setModal('modal')
    }
    return (
        <nav className="navbar fade-animate">
            <div className="logo">
                {/* <img src="https://placehold.co/1920x1080" alt="Logo"> */}
            </div>
            <div className="menu-container">
                <Link to="/">
                    <span className="menu-link">Home</span>
                </Link>
                {!user && (<a href="#" className="menu-link">Features</a>)}

                {user && (<Link to="/modules"><span className="menu-link">Modules</span></Link>)}
                <a href="#aboutus" className="menu-link">About us</a>
            </div>
            <div className="navbtn-container">
                <a href="#downloadnow" className="button is-black">Download</a>
                {!user && (<a href="/form" className="button is-black is-outlined">Login/Signup</a>)}
                {user && (<button className="button" onClick={modalOpen}>Logout</button>)}

            </div>
            <div className="loggedUser">
                {/* <img src="https://placehold.co/400x400" className="ui tiny avatar image"> */}
                {/* <div className="buttons">
            <button className="button is-black" tabIndex="0">Settings</button>
            <div className="button is-black is-outlined" tabIndex="0">
                <span>Log out</span>
            </div>
        </div> */}
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