import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { URL } from '../App';

const EditUser = ({ selectedUser, closeModal, confirmPassResetModal }) => {
    const { user } = useAuthContext();

    const [name, setName] = useState(selectedUser?.name || '');
    const [email, setEmail] = useState(selectedUser?.email || '');
    const [userfield, setUserField] = useState(selectedUser?.userfield || 'student');
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let tempEmptyFields = [];

        if (name === '') tempEmptyFields.push('name');
        if (email === '') tempEmptyFields.push('email');
        if (tempEmptyFields.length > 0) {
            setEmptyFields(tempEmptyFields);
            return;
        }

        setEmptyFields([]);
        setError(null);
        setIsLoading(true);

        // Perform PATCH request
        const response = await fetch(`${URL}/api/user/updateuser/${selectedUser._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ name, email, userfield }),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error || "Failed to update user.");
        } else {
            closeModal(); // Close modal after successful update
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="select is-link is-rounded">
                <select value={userfield} onChange={(e) => setUserField(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
            </div>
            <div className="field">
                <label className="label">Username</label>
                <div className="control">
                    <input
                        type="text"
                        className={emptyFields.includes('name') ? 'input is-danger' : 'input'}
                        placeholder="Username"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                {emptyFields.includes('name') && <div className='error'>Please enter a name.</div>}
            </div>
            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input
                        type="email"
                        className={emptyFields.includes('email') ? 'input is-danger' : 'input'}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
            </div>
            {emptyFields.includes('email') && <div className='error'>Please enter an email.</div>}
            {error === 'Email is not valid' && <div className="error">Please enter a valid email.</div>}
            {error === 'Email Already Exists' && <div className="error">This email has already been taken.</div>}
            <Link className='has-text-link' onClick={() => confirmPassResetModal(selectedUser)}>Forgot password?</Link>
            <div className="login-buttons">
                <button disabled={isLoading} type="submit" className="button is-primary">
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                    type="button"
                    className="button is-light"
                    onClick={closeModal}
                    disabled={isLoading}
                >
                    Cancel
                </button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default EditUser;
