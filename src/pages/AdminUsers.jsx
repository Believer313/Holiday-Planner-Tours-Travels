// src/pages/AdminUsers.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminUsers.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!confirm(`Make this user ${newRole.toUpperCase()}?`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${import.meta.env.VITE_API_URL}/auth/users/${id}/role`, 
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      alert('Failed to update role');
    }
  };

  const toggleBlock = async (id, isBlocked) => {
    if (!confirm(isBlocked ? 'Unblock this user?' : 'Block this user?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${import.meta.env.VITE_API_URL}/auth/users/${id}/block`, 
        { isBlocked: !isBlocked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      alert('Failed to block/unblock');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading Users...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Users Management</h1>
        <p>Total Users: {users.length} | Admins: {users.filter(u => u.role === 'admin').length}</p>
      </div>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td className="user-name">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || '—'}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role?.toUpperCase()}
                  </span>
                </td>
                <td>
                  <span className={`status ${user.isBlocked ? 'blocked' : 'active'}`}>
                    {user.isBlocked ? 'BLOCKED' : 'ACTIVE'}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className={`btn-role ${user.role === 'admin' ? 'btn-demote' : 'btn-promote'}`}
                    onClick={() => toggleRole(user._id, user.role)}
                  >
                    {user.role === 'admin' ? 'Demote' : 'Make Admin'}
                  </button>
                  <button
                    className={`btn-block ${user.isBlocked ? 'btn-unblock' : ''}`}
                    onClick={() => toggleBlock(user._id, user.isBlocked)}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}