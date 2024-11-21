import { useState } from 'react'
import { useUsersContext } from './useUsersContext'
import { URL } from '../App'
import { useAuthContext } from './useAuthContext'

export const useAddUser = () => {
    const { user } = useAuthContext();

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useUsersContext();

    const adduser = async (name, email, userfield, password, createdby) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${URL}/api/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ name, email, userfield, password, createdby })
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Failed to create user');
            } else {
                dispatch({ type: 'CREATE_USER', payload: json });
            }
        } catch (error) {
            setError(error.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return { adduser, isLoading, error };

}