import Login from './Login'
import { Link } from 'react-router-dom'

const LeftCard = () => {

    return (
        <div className="card-left">
            <main style={{ width: "50%" }}>
                <div>
                    <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                        <ul>
                            <li><Link to="/" className="section">Home</Link></li>
                            <li className="is-active"><Link className="section has-text-black">Login</Link></li>
                        </ul>
                    </nav>
                    <div className="login-page">
                        <Login />
                    </div>
                </div>
            </main>
        </div>

    );
}
export default LeftCard;