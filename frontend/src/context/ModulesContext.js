import { createContext, useReducer, useEffect } from 'react'

export const testsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TESTS':
            return {
                tests: action.payload
            }
        case 'UPDATE_TEST':
            return {
                tests: action.payload
            }
        case 'CREATE_TEST':
            return {
                tests: [action.payload, ...state.tests]
            }
        case 'DELETE_TEST':
            return {
                tests: state.tests.filter((test) => test._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ModulesContext = createContext();

export const ModulesContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(testsReducer, {tests: null})

    return (
        <ModulesContext.Provider value={{...state, dispatch }}>
            {children}
        </ModulesContext.Provider>
    )
}
export default ModulesContextProvider;