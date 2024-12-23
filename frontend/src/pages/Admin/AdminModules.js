import { useState, useEffect, useReducer } from 'react';
import { useModulesContext } from '../../hooks/useModulesContext';
import Modal from '../../components/Modal';
import { useAuthContext } from '../../hooks/useAuthContext';
import { URL } from '../../App';

// Modal Bodies
import TestDetailsBody from '../../components/Admin/modalinfo/TestDetailsBody';
import AddModuleBody from '../../components/Admin/modalinfo/AddModuleBody';
import AddQuestionsBody from '../../components/Admin/modalinfo/AddQuestionsBody';
import EditModuleBody from '../../components/Admin/modalinfo/EditModuleBody';
import printJS from 'print-js';

const AdminModules = () => {
    const { tests, dispatch } = useModulesContext();
    const { user } = useAuthContext();
    const [error, setError] = useState('');
    const choiceLabels = ["A", "B", "C", "D"];

    // Fetch tests
    useEffect(() => {
        const fetchTests = async () => {
            setError(''); // Reset error before request
            try {
                const response = await fetch(`${URL}/api/testModules`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json();
                if (!response.ok) {
                    throw new Error(json.error || 'Failed to fetch tests');
                }
                dispatch({ type: 'SET_TESTS', payload: Array.isArray(json) ? json : [] });
            } catch (error) {
                setError(error.message || 'Something went wrong');
            }
        };
        if (user) {
            fetchTests();
        }
    }, [user, dispatch]);

    const initialModalState = {
        testModalVisible: false,
        addModuleModalVisible: false,
        addQuestionsModalVisible: false,
        editTestModalVisible: false,
        confirmSaveModalVisible: false,
        deleteTestModalVisible: false,
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

    // Module Form States
    const [selectedTest, setSelectedTest] = useState(null);
    const [moduleName, setModuleName] = useState('');
    const [moduleNumber, setModuleNumber] = useState('');
    const [moduleOver, setModuleOver] = useState('');
    const [questions, setQuestions] = useState([]);

    const [modalState, modalDispatch] = useReducer(modalReducer, initialModalState);

    const handleOpenTestModal = (test) => {
        setSelectedTest(test);
        modalDispatch({ type: 'OPEN_MODAL', modal: 'testModalVisible' });
    };

    const handleOpenAddModuleModal = () => {
        modalDispatch({ type: 'OPEN_MODAL', modal: 'addModuleModalVisible' });
    };

    const handleProceedToAddQuestions = () => {
        if (moduleOver > 50 || !moduleName || !moduleOver || moduleNumber > 10 || !moduleNumber) {
            setError('Please fill the correct inputs.');
            return;
        }
        modalDispatch({ type: 'CLOSE_MODAL', modal: 'addModuleModalVisible' });
        modalDispatch({ type: 'OPEN_MODAL', modal: 'addQuestionsModalVisible' });
        setQuestions(Array.from({ length: moduleOver }, () => ({ question: '', choices: ['', '', '', ''] })));
    };

    const handleBackToAddModuleModal = () => {
        modalDispatch({ type: 'OPEN_MODAL', modal: 'addModuleModalVisible' });
        modalDispatch({ type: 'CLOSE_MODAL', modal: 'addQuestionsModalVisible' });
    };

    const handleEditTestModal = (test) => {
        setSelectedTest(test);
        setModuleOver(questions.length);
        setModuleNumber(test.title.split(" ")[1]);
        setModuleName(test.title.replace(`Lesson: ${test.title.split(" ")[1]} `, ''));
        setQuestions(
            Object.values(test.question).map((questionObj) => ({
                questionText: questionObj.questionText,
                choices: questionObj.choices.map((choice, index) =>
                    choice.replace(`${choiceLabels[index]}. `, '')
                ),
                correctAnswer: questionObj.correctAnswer
            }))
        );
        modalDispatch({ type: 'OPEN_MODAL', modal: 'editTestModalVisible' });

    };

    const handleSaveChanges = () => {
        if (moduleOver > 50 || !moduleName || moduleNumber > 10 || !moduleNumber) return;
        modalDispatch({ type: 'OPEN_MODAL', modal: 'confirmSaveModalVisible' });
    };

    const confirmSaveChanges = async () => {
        setError('');
        try {
            const moduleData = {
                title: `Lesson: ${moduleNumber} ${moduleName}`,
                question: questions.map((q) => ({
                    questionText: q.questionText,
                    choices: q.choices,
                    correctAnswer: q.correctAnswer || 'A',
                })),
                over: questions.length,
            };
            const response = await fetch(`${URL}/api/testModules/${selectedTest._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(moduleData),
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error || 'Failed to update module');
            }
            dispatch({ type: 'UPDATE_TEST', payload: json });
            resetModuleForm();
            modalDispatch({ type: 'CLOSE_MODAL', modal: 'confirmSaveModalVisible' });
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
    };

    const saveModule = async () => {
        // if (questions.some(q => !q.question.trim() || q.choices.some(choice => !choice.trim()))) return;
        setError('');
        try {
            const moduleData = {
                title: `Lesson: ${moduleNumber} ${moduleName}`,
                question: questions.map((q) => ({
                    questionText: q.questionText,
                    choices: q.choices,
                    correctAnswer: q.correctAnswer || 'A',
                })),
                over: questions.length,
            };
            const response = await fetch(`${URL}/api/testModules/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(moduleData),
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error || 'Failed to save module');
            }
            dispatch({ type: 'CREATE_TEST', payload: json });
            resetModuleForm();
            modalDispatch({ type: 'CLOSE_MODAL', modal: 'addQuestionsModalVisible' });
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
    };

    const handleDeleteTest = async (selectedId) => {
        setError('');
        try {
            const response = await fetch(`${URL}/api/testModules/${selectedId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error || 'Failed to delete module');
            }
            dispatch({ type: 'DELETE_TEST', payload: json });
            modalDispatch({ type: 'CLOSE_MODAL', modal: 'deleteTestModalVisible' });
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
    };

    const resetModuleForm = () => {
        setSelectedTest(null);
        setModuleName('');
        setModuleNumber('');
        setModuleOver('');
        setQuestions([]);
    };

    const handlePrintDetails = (elementId) => {
        printJS({
            printable: elementId, // Dynamically use the passed ID
            type: 'html',
            style: `
                .modal-card-body {
                    font-size: 14px;
                    line-height: 1.5;
                    margin: 0;
                    padding: 0;
                }
            `, // Custom styles (optional)
        });
    };


    return (
        <div className="admin-modules">
            <button className="button is-success" onClick={handleOpenAddModuleModal}>Add Module</button>
            {tests && tests.map((test, index) => (
                <div className="module-list" key={index}>
                    <table className="table is-fullwidth is-bordered is-hoverable">
                        <tbody>
                            <tr className="is-clickable" onClick={() => handleOpenTestModal(test)}>
                                <td>
                                    <h1 className="title is-4">{test.title}</h1>
                                    <h5 className="subtitle">Score up to: {test.over}</h5>
                                </td>
                                <td className="has-text-right">
                                    <button className="button is-info" onClick={(e) => { e.stopPropagation(); handleEditTestModal(test); }}>Edit Module</button>
                                    <button className="button is-danger" onClick={(e) => { e.stopPropagation(); setSelectedTest(test); modalDispatch({ type: 'OPEN_MODAL', modal: 'deleteTestModalVisible' }); }}>Remove Module</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}

            {/* Modals */}
            {selectedTest && modalState.testModalVisible && (
                <Modal
                    click={modalState.testModalVisible}
                    setClick={() => modalDispatch({ type: 'CLOSE_MODAL', modal: 'testModalVisible' })}
                    header={selectedTest.title}
                    body={<TestDetailsBody test={selectedTest} />}
                    footer={
                        <div className='modal-card-foot'>
                            <button className="button is-info mr-3" onClick={() => handlePrintDetails('test-details')}>Print details</button>
                            <button className="button" onClick={() => modalDispatch({ type: 'CLOSE_MODAL', modal: 'testModalVisible' })}>Close</button>
                        </div>}
                />
            )}
            {modalState.addModuleModalVisible && (
                <Modal
                    click={modalState.addModuleModalVisible}
                    setClick={() => modalDispatch({ type: 'CLOSE_MODAL', modal: 'addModuleModalVisible' })}
                    header="Add New Module"
                    body={<AddModuleBody error={error} setError={setError} moduleName={moduleName} setModuleName={setModuleName} moduleOver={moduleOver} setModuleOver={setModuleOver} moduleNumber={moduleNumber} setModuleNumber={setModuleNumber} />}
                    footer={
                        <div className='modal-card-foot'>
                            <button className="button is-success" onClick={handleProceedToAddQuestions}>Proceed</button>
                            <button className="button" onClick={() => modalDispatch({ type: 'CLOSE_MODAL', modal: 'addModuleModalVisible' })}>Cancel</button>
                        </div>
                    }
                />
            )}
            {modalState.addQuestionsModalVisible && (
                <Modal
                    click={modalState.addQuestionsModalVisible}
                    setClick={() => modalDispatch({ type: 'CLOSE_MODAL', modal: 'addQuestionsModalVisible' })}
                    header={"Number of Questions: " + moduleOver}
                    body={<AddQuestionsBody questions={questions} setQuestions={setQuestions} choiceLabels={choiceLabels} />}
                    footer={
                        <div className='modal-card-foot'>
                            <button className="button is-success" onClick={saveModule}>Add Module</button>
                            <button className="button" onClick={handleBackToAddModuleModal}>Back</button>
                        </div>
                    }
                />
            )}
            {selectedTest && modalState.editTestModalVisible && (
                <Modal
                    click={modalState.editTestModalVisible}
                    setClick={() => modalDispatch({ type: 'CLOSE_MODAL', modal: 'editTestModalVisible' })}
                    header={selectedTest.title}
                    body={<EditModuleBody questions={questions} setQuestions={setQuestions} choiceLabels={choiceLabels} moduleName={moduleName} setModuleName={setModuleName} moduleNumber={moduleNumber} setModuleNumber={setModuleNumber} />}
                    footer={
                        <div className='modal-card-foot'>
                            <button className="button is-success" onClick={handleSaveChanges}>Save changes</button>
                            <button className="button" onClick={() => modalDispatch({ type: 'CLOSE_MODAL', modal: 'editTestModalVisible' })}>Cancel</button>
                        </div>
                    }
                />
            )}
            {modalState.confirmSaveModalVisible && (
                <Modal
                    click={modalState.confirmSaveModalVisible}
                    setClick={() => modalDispatch({ type: 'CLOSE_MODAL', modal: 'confirmSaveModalVisible' })}
                    header="Save Changes"
                    body={<p>Are you sure you want to save the changes?</p>}
                    footer={
                        <div className='modal-card-foot'>
                            <button className="button is-success" onClick={confirmSaveChanges}>Yes</button>
                            <button className="button" onClick={() => modalDispatch({ type: 'CLOSE_MODAL', modal: 'confirmSaveModalVisible' })}>No</button>
                        </div>
                    }
                />
            )}
            {modalState.deleteTestModalVisible && (
                <Modal
                    click={modalState.deleteTestModalVisible}
                    setClick={() => modalDispatch({ type: 'CLOSE_MODAL', modal: 'deleteTestModalVisible' })}
                    header="Delete Module"
                    body={<p>Are you sure you want to delete this module?</p>}
                    footer={
                        <div className='modal-card-foot'>
                            <button className="button is-danger" onClick={() => handleDeleteTest(selectedTest._id)}>Yes</button>
                            <button className="button" onClick={() => modalDispatch({ type: 'CLOSE_MODAL', modal: 'deleteTestModalVisible' })}>No</button>
                        </div>
                    }
                />
            )}
        </div>
    );
};

export default AdminModules;
