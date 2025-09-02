import { createContext, useReducer, useEffect } from 'react'

export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                users: action.payload
            }
        case 'UPDATE_USER':
            return {
                users: [action.payload, ...state.users]
            }
        case 'CREATE_USER':
            const newUser = {
                ...action.payload,
                createdAt: action.payload.createdAt || new Date(),
                userfield: action.payload.userfield
            };
            return {
                users: [newUser, ...state.users]
            };
        case 'DELETE_USER':
            return {
                users: state.users.filter((user) => user._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {


    const [state, dispatch] = useReducer(usersReducer, { users: null })

    return (
        <UsersContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UsersContext.Provider>
    )
}
export default UsersContextProvider;