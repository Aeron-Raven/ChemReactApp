import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const LoadModules = () => {
    
    // Fetch Modules
    const [tests, setTests] = useState(null)
    const { user } = useAuthContext()
    useEffect(() => {
        const fetchTests = async () => {
            const response = await fetch('/api/testModules', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setTests(json)
            }
        }
        if (user) {
            fetchTests();
        }
    }, [user])
    return (
        <div>
            <section className="page-body">
                <div className="modules-tab">
                    <div className="title is-4">Welcome, <span id="headerUser">{user.name}</span></div>
                    <ul className="tabs is-boxed">
                        <li className="is-active">
                            <a className="is-info">Modules</a>
                        </li>
                    </ul>
                    <div className="box" data-tab="first">
                        <table className="table is-hoverable is-fullwidth">
                            {tests && tests.map((test, index) =>
                                <tbody key={index}>
                                    <tr className="module-pick" >
                                        <td>
                                            {test.title}
                                        </td>
                                        <td></td>
                                        <td className="has-text-right">Score:
                                            <span className="is-size-5"> {test.score} </span>/30
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                        <span id="aboutus"></span>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default LoadModules;