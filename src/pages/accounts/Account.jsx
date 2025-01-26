import React from "react";
import { MdDashboard } from "react-icons/md";
import "./account.css";
import { IoMdLogOut } from "react-icons/io";
import { UseData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UseData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };
  return (
    <div>
      {user && (
        <div className="account-page">
          {" "}
          {/* Add the specific class here */}
          <div className="profile">
            <h2>My Profile</h2>
            <div className="profile-info">
              <p>
                <strong>Name - {user.name}</strong>
              </p>
              <p>
                <strong>Email - {user.email}</strong>
              </p>
              <button
                onClick={() => navigate(`/${user._id}/dashboard`)}
                className="common-btn"
              >
                <MdDashboard /> Dashboard
              </button>
              <br />
              {
                user.role === "admin" && (
                  <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="common-btn"
              >
                <MdDashboard />Admin Dashboard
              </button>
                )
             }
              <br />
              <button onClick={logoutHandler} className="common-btn logout-btn">
                <IoMdLogOut /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
