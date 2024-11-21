import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPass = () => {
    const { token } = useParams(); // Extract the token from the URL
    const [password, setPassword] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let tempEmptyFields = [];

        if (password === '') {
            tempEmptyFields.push('password');
        }
        if (tempEmptyFields.length > 0) {
            setEmptyFields(tempEmptyFields);
            return;
        }
        try {
            console.log(token)
            const response = await fetch(`/requests/reset-password/${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to reset password');
            }
            setEmptyFields([]);
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    return (
        <div className="forgot-pass-page">
            <form className="admin-form" onSubmit={handleSubmit}>
                <h1 className="title is-large">Please input your new Password.</h1>
                <div id="passBox" className="field">
                    <div className="control">
                        <input
                            type="password"
                            className={emptyFields.includes('password') ? 'input is-danger' : 'input'}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                </div>
                <div className="login-buttons">
                    <button type="submit" id="loginBtn" className="button is-primary">
                        Submit
                    </button>
                </div>
                {emptyFields.includes('password') && <div className='error'>Please input a password</div>}
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
};

export default ResetPass;
