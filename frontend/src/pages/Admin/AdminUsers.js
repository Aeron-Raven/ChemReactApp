import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Signup from "../../components/Signup";
import { useUsersContext } from '../../hooks/useUsersContext';

const AdminUsers = () => {
    const { users, dispatch } = useUsersContext();

    // Modals
    const [addUserModal, setAddUserModal] = useState(false);
    const [editUserModal, setEditUserModal] = useState(false);
    const [deleteUserModal, setDeleteUserModal] = useState(false);

    // Selected user for editing/deleting
    const [selectedUser, setSelectedUser] = useState(null);

    // Handlers to open modals
    const handleAddUserModal = () => setAddUserModal(true);
    const handleEditUserModal = (user) => {
        setSelectedUser(user);
        setEditUserModal(true);
    };
    const handleDeleteUserModal = (user) => {
        setSelectedUser(user);
        setDeleteUserModal(true);
    };

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/user/getusers', { method: 'GET' });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_USERS', payload: json });
            }
        };
        fetchUsers();
    }, [dispatch]);

    const handleDeleteUser = async (userId) => {
        await fetch(`/api/user/${userId}`, { method: 'DELETE' });
        dispatch({ type: 'DELETE_USER', payload: userId });
        setDeleteUserModal(false);
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
                            <th className="has-text-right">Functions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user, index) => (
                            <tr key={index} className="is-clickable">
                                <td>{user.name}</td>
                                <td>{user.field}</td>
                                <td className="has-text-right">
                                    <button className="button is-info" onClick={() => handleEditUserModal(user)}>
                                        Edit User
                                    </button>
                                    <button className="button is-danger" onClick={() => handleDeleteUserModal(user)}>
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
                    body={<Signup closeModal={() => setEditUserModal(false)} user={selectedUser} />}
                    footer={
                        <div className="modal-card-foot">
                            <button className="button" onClick={() => setEditUserModal(false)}>Cancel</button>
                        </div>
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
        </div>
    );
};

export default AdminUsers;
