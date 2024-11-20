import { useState } from "react";

const ResetPass = () => {
    const [password, setPassword] = useState('')

    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let tempEmptyFields = [];

        if (password === '') {
            tempEmptyFields.push('password');
        }
        if (tempEmptyFields.length > 0) {
            setEmptyFields(tempEmptyFields);
            return;
        }
        setEmptyFields([]);
    }
    return (
        <div className="forgot-pass-page">
            <form className="admin-form" onSubmit={handleSubmit}>
                <h1 className="title is-large">Please input your new Password.
                </h1>
                <div id="passBox" className="field">
                    <div className="control">
                        <input type="password"
                            className={emptyFields.includes('password') ? 'input is-danger' : 'input'}
                            onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                </div>
                <div className="login-buttons">
                    <button type="submit" id="loginBtn" className="button is-primary">Submit</button>
                </div>
                {(emptyFields.includes('password')) && <div className='error'>Please input a password</div>}
            </form>
        </div>
    );
}

export default ResetPass;