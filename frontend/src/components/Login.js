import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, error, isLoading } = useLogin()

    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let tempEmptyFields = [];

        if (email === '') {
            tempEmptyFields.push('email');
        }
        if (password === '') {
            tempEmptyFields.push('password');
        }
        if (tempEmptyFields.length > 0) {
            setEmptyFields(tempEmptyFields);
            return;
        }
        setEmptyFields([]);
        await login(email, password)
    }
    return (
        <form name="loginForm" id="loginForm" onSubmit={handleSubmit}>
            <h1 className="title is-large">Chemistry learning made easier for students and teachers
                <p className="subtitle">Hello! Please Login to your account.</p>
            </h1>
            <div id="loginEmailBox" className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input type="email"
                        className={emptyFields.includes('email') ? 'input is-danger' : 'input'}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
            </div>
            {emptyFields.includes('email') && <div className='error'>Please enter an email.</div>}
            <div id="passBox" className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input type="password"
                        className={emptyFields.includes('password') ? 'input is-danger' : 'input'}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
            </div>
            {emptyFields.includes('password') && <div className='error'>Please enter a password.</div>}
            <div className="is-pulled-left">
                <a href="#">Forgot Password?</a>
            </div>
            <div className="login-buttons">
                <button type="submit" id="loginBtn" className="button is-primary" disabled={isLoading}>Login</button>
            </div>
        </form>
    );
}

export default Login;