import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

const AdminLogin = () => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const { adminLogin, error, isLoading } = useLogin()

    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let tempEmptyFields = [];

        if (name === '') {
            tempEmptyFields.push('name');
        }
        if (password === '') {
            tempEmptyFields.push('password');
        }
        if (tempEmptyFields.length > 0) {
            setEmptyFields(tempEmptyFields);
            return;
        }
        setEmptyFields([]);
        await adminLogin(name, password)
    }
    return (
        <form className="admin-form" onSubmit={handleSubmit}>
            <h1 className="title is-large">Welcome, Admin.
            </h1>
            <div id="loginEmailBox" className="field">
                <div className="control">
                    <input type="password"
                        className={emptyFields.includes('name') ? 'input is-danger' : 'input'}
                        onChange={(e) => setName(e.target.value)} value={name} />
                </div>
            </div>

            <div id="passBox" className="field">
                <div className="control">
                    <input type="password"
                        className={emptyFields.includes('password') ? 'input is-danger' : 'input'}
                        onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
            </div>
            <div className="login-buttons">
                <button type="submit" id="loginBtn" className="button is-primary" disabled={isLoading}>Login</button>
            </div>
            {(emptyFields.includes('name') || emptyFields.includes('password')) && <div className='error'>Invalid name / Password</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    );
}

export default AdminLogin;