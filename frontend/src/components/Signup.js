import { useEffect, useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkpassword, setCheckPass] = useState('')
    const [userfield, setUserField] = useState('student')

    const { signup, error, isLoading } = useSignup()

    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let tempEmptyFields = [];

        if (name === '') {
            tempEmptyFields.push('name');
        }
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

        await signup(name, email, userfield, password);
    };

    return (
        <form name="signUpForm" onSubmit={handleSubmit}>
            <h1 className="title is-large">Join us and learn together {name} !!
                <div className="subtitle">Create an account now</div>
            </h1>
            <div class="select is-link is-rounded">
                <select value={userfield} onChange={(e) => setUserField(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
            </div>
            <div className="field">
                <label className="label">Username</label>
                <div className="control">
                    <input type="text"
                        className={emptyFields.includes('name') ? 'input is-danger' : 'input'}
                        placeholder="Username"
                        onChange={(e) => setName(e.target.value)} value={name} />
                </div>
            {emptyFields.includes('name') && <div className='error'>Please enter a name.</div>}
            </div>
            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input type="email"
                        className={emptyFields.includes('email') ? 'input is-danger' : 'input'}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
            </div>
            {emptyFields.includes('email') && <div className='error'>Please enter an email.</div>}
            {(error === 'Email is not valid') && <div className="error">Please enter a valid email.</div>}
            {(error === 'Email Already Exists') && <div className="error">This email has already been taken.</div>}

            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input type="password"
                        className={emptyFields.includes('password') ? 'input is-danger' : 'input'}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
            </div>
            {emptyFields.includes('password') && <div className='error'>Please enter a password.</div>}
            <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                    <input type="password"
                        className={password !== checkpassword ? 'input is-danger' : 'input'}
                        placeholder="Confirm Password"
                        onChange={(e) => setCheckPass(e.target.value)} value={checkpassword} />
                </div>
            </div>
            {password !== checkpassword && <div className="error">Password isn't the same</div>}
            <div className="login-buttons">
                <button disabled={isLoading} type="submit" className="button is-primary">Create Account</button>
            </div>
        </form>
    );
}

export default Signup;