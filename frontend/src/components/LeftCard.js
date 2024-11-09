import Signup from './Signup'
import Login from './Login'
import { Link } from 'react-router-dom'

import { useState } from 'react'

const LeftCard = () => {
    const [page, setPage] = useState('login')

    return (
        <div className="card-left">
            <main style={{ width: "70%" }}>
                {page === 'login' &&
                    <div>
                        <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                            <ul>
                                <li><Link to="/" className="section">Home</Link></li>
                                <li className="is-active"><a className="section has-text-black">Login</a></li>
                            </ul>
                        </nav>
                        <div className="login-page">
                            <Login />
                            <p>Don't have an Account? <a style={{ cursor: 'pointer' }} onClick={() => setPage('signup')}>Sign up</a></p>
                        </div>
                    </div>
                }
                {page === 'signup' &&
                    <div>
                        <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                            <ul>
                                <li><Link to="/" className="section">Home</Link></li>
                                <li><a onClick={() => setPage('login')} className="section">Login</a></li>
                                <li className="is-active"><a className="section has-text-black">Register</a></li>
                            </ul>
                        </nav>
                        <div className="sign-page">
                            <Signup />
                            <p>Have an Account? <a style={{ cursor: 'pointer' }} onClick={() => setPage('login')}>Login</a></p>
                        </div>
                    </div>
                }
            </main>
        </div>

    );
}
export default LeftCard;