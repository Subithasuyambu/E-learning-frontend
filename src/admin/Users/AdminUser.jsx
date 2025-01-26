import React, { useEffect, useState } from 'react';
import './adminuser.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { server } from "../../main.jsx";
import Layout from '../Utils/Layout.jsx';
import toast from 'react-hot-toast';

const AdminUser = ({ user }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  
    if (user && user.role !== "admin") {
      navigate("/");
    }
  

  // Fetch users from the backend
  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);
    
    const updateRole = async (id) => {
        if (confirm("Are you Sure, You Want To update This User")) {
            try {
                const { data } = await axios.put(`${server}/api/user/${id}`, {}, {
                    headers: {
                        token:localStorage.getItem("token"),
                    }
                })
                toast.success(data.message);
                fetchUsers();
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    }

  console.log(users);

  return (
    <Layout>
    <div className="users">
      <h1>All Users</h1>
      <table border={"black"}>
        <thead>
          <tr>
            <td>S.No</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Update role</td>
          </tr>
        </thead>

        {users &&
          users.map((e, i) => (
            <tbody>
              <tr>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td>
                  <button
                    onClick={() => updateRole(e._id)}
                    className="common-btn"
                  >
                    Update Role
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  </Layout>
  );
};

export default AdminUser;
