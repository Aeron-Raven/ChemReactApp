import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { URL } from '../App'

export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(`${URL}/api/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }
            if (response.ok) {

                localStorage.setItem('user', JSON.stringify(json))

                dispatch({ type: 'LOGIN', payload: json })

                setIsLoading(false)
            }
        }
        catch (error) {
            setIsLoading(false)
            setError(error.message)
        }

    }
    const adminLogin = async (name, password) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(`${URL}/requests/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password })
            })
            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }
            if (response.ok) {

                localStorage.setItem('user', JSON.stringify(json))

                dispatch({ type: 'LOGIN', payload: json })
                
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            setError(error.message)
        }

    }
    return { login, isLoading, error, adminLogin };
}