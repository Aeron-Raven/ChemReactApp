import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

const AdminLogin = () => {

    const [name, setEmail] = useState('')
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
        <form className='is-flex is-justify-content-center' onSubmit={handleSubmit}>
            <div className='container'>
                <div className="field">
                    <div className="control">
                        <input type="password"
                            className={emptyFields.includes('name') ? 'input is-danger' : 'input'}
                            placeholder="Name"
                            onChange={(e) => setEmail(e.target.value)} value={name} />
                    </div>
                </div>
                {emptyFields.includes('name') && <div className='error'>Please enter the name</div>}
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input type="password"
                            className={emptyFields.includes('password') ? 'input is-danger' : 'input'}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                </div>
                {emptyFields.includes('password') && <div className='error'>Please enter the password.</div>}
                <button type="submit" id="loginBtn" className="button is-primary" disabled={isLoading}>Login</button>
                {error && <div className='error'>{error}</div>}
            </div>
        </form>
    );
}

export default AdminLogin;