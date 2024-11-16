import { useState } from 'react'
import { useUsersContext } from './useUsersContext'

export const useAddUser = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useUsersContext();

    const adduser = async (name, email, userfield, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, userfield, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false)
        }
    }
    return { adduser, isLoading, error };
}