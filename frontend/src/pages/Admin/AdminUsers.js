import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Signup from "../../components/AddUser";
import EditUser from "../../components/EditUser";
import { useUsersContext } from '../../hooks/useUsersContext';
import { useAuthContext } from "../../hooks/useAuthContext";
import { URL } from "../../App";

const AdminUsers = () => {
    const { users, dispatch } = useUsersContext();
    const { user } = useAuthContext();

    // Modals
    const [addUserModal, setAddUserModal] = useState(false);
    const [editUserModal, setEditUserModal] = useState(false);
    const [resetPassModal, setResetPassModal] = useState(false);
    const [emailSentModal, setEmailSentModal] = useState(false);
    const [deleteUserModal, setDeleteUserModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Selected user for editing/deleting
    const [selectedUser, setSelectedUser] = useState(null);

    // Handlers to open modals
    const handleAddUserModal = () => setAddUserModal(true);
    const handleDeleteUserModal = (eachUser) => {
        setSelectedUser(eachUser);
        setDeleteUserModal(true);
    };
    const handleEditUserModal = (eachUser) => {
        setSelectedUser(eachUser);
        setEditUserModal(true);
    };

    const confirmPassResetModal = (eachUser) => {
        setSelectedUser(eachUser);
        setResetPassModal(true);
    };
    const handleResetPass = async () => {
        setIsLoading(true);
        const data = {
            email: selectedUser.email,
        };
        try {
            const response = await fetch(`${URL}/api/user/forgotpassword/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            if (response.ok) {
                setIsLoading(false)
                setResetPassModal(false);
                setEmailSentModal(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        try {
            const fetchUsers = async () => {
                const response = await fetch(`${URL}/api/user/getusers`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json();
                if (response.ok) {
                    dispatch({ type: 'SET_USERS', payload: json });
                }
            };
            if (user) {
                fetchUsers();
            }
        }
        catch (error) {
            console.log(error);
        }
    }, [user, dispatch]);

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`${URL}/api/user/removeuser/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'DELETE_USER', payload: json });
                setDeleteUserModal(false);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="admin-users">
            <button className="button is-success" onClick={handleAddUserModal}>Add User</button>
            <div className="user-list">
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Field</th>
                            <th>Modules Taken</th>
                            <th className="has-text-right">Functions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((eachUser, index) => (
                            <tr key={index} className="is-clickable">
                                <td>{eachUser.name}</td>
                                <td>{eachUser.userfield}</td>
                                <td>{eachUser.modules.score ? eachUser.modules.score : 'none'}</td>
                                <td className="has-text-right">
                                    <button className="button is-info" onClick={() => handleEditUserModal(eachUser)}>
                                        Edit User
                                    </button>
                                    <button className="button is-danger" onClick={() => handleDeleteUserModal(eachUser)}>
                                        Remove User
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            {addUserModal && (
                <Modal
                    click={addUserModal}
                    setClick={setAddUserModal}
                    header="Add new user"
                    body={<Signup closeModal={() => setAddUserModal(false)} />}
                    footer={
                        <div className="modal-card-foot">
                            <button className="button" onClick={() => setAddUserModal(false)}>Cancel</button>
                        </div>
                    }
                />
            )}

            {/* Edit User Modal */}
            {editUserModal && (
                <Modal
                    click={editUserModal}
                    setClick={setEditUserModal}
                    header="Edit User"
                    body={
                        <EditUser
                            selectedUser={selectedUser}
                            closeModal={() => setEditUserModal(false)}
                            confirmPassResetModal={() => confirmPassResetModal(selectedUser)}
                        />
                    }
                />
            )}

            {/* Delete User Confirmation Modal */}
            {deleteUserModal && (
                <Modal
                    click={deleteUserModal}
                    setClick={setDeleteUserModal}
                    header="Delete User"
                    body={<p>Are you sure you want to delete {selectedUser?.name}?</p>}
                    footer={
                        <div className="modal-card-foot">
                            <button className="button is-danger" onClick={() => handleDeleteUser(selectedUser._id)}>Yes</button>
                            <button className="button" onClick={() => setDeleteUserModal(false)}>No</button>
                        </div>
                    }
                />
            )}
            {resetPassModal && (
                <Modal
                    click={resetPassModal}
                    setClick={setResetPassModal}
                    header="Reset Password"
                    body={
                        <p>Send a Reset Password Email to <strong>{selectedUser?.email}</strong>?</p>
                    }
                    footer={
                        <div className="modal-card-foot">
                            <button className="button is-success" onClick={() => handleResetPass()}>
                                Yes
                            </button>
                            <button className="button" onClick={() => setResetPassModal(false)}>
                                No
                            </button>
                        </div>
                    }
                />
            )}
            {emailSentModal && (
                <Modal
                    click={emailSentModal}
                    setClick={setEmailSentModal}
                    header="Email Sent"
                    body={
                        <p>A password reset email has been sent to <strong>{selectedUser?.email}</strong>.</p>
                    }
                    footer={
                        <div className="modal-card-foot">
                            <button className="button is-primary" onClick={() => setEmailSentModal(false)}>
                                Okay
                            </button>
                        </div>
                    }
                />
            )}
        </div>
    );
};

export default AdminUsers;
