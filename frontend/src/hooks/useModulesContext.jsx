import { useContext } from 'react'
import { ModulesContext } from '../context/ModulesContext'

export const useModulesContext = () => {
    const context = useContext(ModulesContext)

    if (!context) {
        throw Error('useModulesContext must be inside an ModulesContextProvider')
    }

    return context
}