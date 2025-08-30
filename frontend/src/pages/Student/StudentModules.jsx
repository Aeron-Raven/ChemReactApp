import { useEffect, useState, useReducer } from 'react';
import { useModulesContext } from '../../hooks/useModulesContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { URL } from '../../App';

import Modal from '../../components/Modal';
import StudentScoreDetailsBody from '../../components/Student/modalinfo/StudentScoreDetailsBody';
import printJS from 'print-js';

const StudentModules = () => {
    const { tests, dispatch } = useModulesContext();
    const { user } = useAuthContext();

    // Fetch tests
    useEffect(() => {
        const fetchTests = async () => {
            const response = await fetch(`${URL}/api/testModules`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_TESTS', payload: json });
            }
        };
        if (user) {
            fetchTests();
        }
    }, [user, dispatch]);

    const initialModalState = {
        testModalVisible: false,
    };

    // Reducer function to manage modal state
    const modalReducer = (state, action) => {
        switch (action.type) {
            case 'OPEN_MODAL':
                return { ...state, [action.modal]: true };
            case 'CLOSE_MODAL':
                return { ...state, [action.modal]: false };
            case 'CLOSE_ALL_MODALS':
                return initialModalState;
            default:
                return state;
        }
    };

    const [modalState, modalDispatch] = useReducer(modalReducer, initialModalState);

    // Module Form States
    const [selectedTest, setSelectedTest] = useState(null);

    const handleOpenTestModal = (test) => {
        setSelectedTest(test);
        modalDispatch({ type: 'OPEN_MODAL', modal: 'testModalVisible' });
    };

    const handlePrintDetails = (elementId) => {
        printJS({
            printable: elementId,
            type: 'html',
            style: `
                .modal-card-body {
                    font-size: 14px;
                    line-height: 1.5;
                    margin: 0;
                    padding: 0;
                }
            `,
        });
    };

    return (
        <div className="student-modules">
            {tests && tests.map((test, index) => {
                const module = user.modules?.find(mod => mod.moduleID === test._id);

                return (
                    <div className="module-list" key={index}>
                        <table className="table is-fullwidth is-bordered is-hoverable">
                            <tbody>
                                <tr className="is-clickable" onClick={() => handleOpenTestModal(test)}>
                                    <td>
                                        <h1>{test.title}</h1>
                                    </td>
                                    <td className='has-text-right'>
                                        <h2>Score: <span className='title is-4'>{module?.score ?? '0'}</span>/{test.over}</h2>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}
            {selectedTest && modalState.testModalVisible && (
                <Modal
                    click={modalState.testModalVisible}
                    setClick={() => modalDispatch({ type: 'CLOSE_MODAL', modal: 'testModalVisible' })}
                    header={selectedTest.title}
                    body={<StudentScoreDetailsBody test={selectedTest} user={user}/>}
                    footer={
                        <div className='modal-card-foot'>
                            <button className="button is-info mr-3" onClick={() => handlePrintDetails('user-score')}>Print details</button>
                            <button className="button" onClick={() => modalDispatch({ type: 'CLOSE_MODAL', modal: 'testModalVisible' })}>Close</button>
                        </div>}
                />
            )}
        </div>
    );
}

export default StudentModules;