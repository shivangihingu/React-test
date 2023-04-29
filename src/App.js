import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import UserForm from "./UserForm";

//bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import Userdetails from "./UserDetails";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
  });
  const [users, setUsers] = useState([]);
  const [numToShow, setNumToShow] = useState(3);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    setUsers(storedUsers);
    localStorage.setItem("users", JSON.stringify(storedUsers));
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsEdit(true);
    setInitialValues({
      name: user.name,
      email: user.email,
    });
  };

  const handleLoadMore = () => {
    // Assuming we have a list of all users somewhere
    // and we keep track of the last loaded index
    setNumToShow((prevNum) => prevNum + 3);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    const isConfirmed = window.confirm(
      `Are you sure you want to delete user ${user.name}?`
    );
    if (isConfirmed) {
      setLoading(true);
      const filteredUsers = users.filter((u) => u.id !== user.id);
      setUsers(filteredUsers);
      setLoading(false);
      localStorage.setItem("users", JSON.stringify(filteredUsers));
    }
  };

  return (
    <div className="App">
      <Header />
      <div>
        <div className="card card-userForm">
          <div className="card-body">
            <h5 className="card-title">Enter User Details</h5>
            <UserForm
              isEdit={isEdit}
              selectedUser={selectedUser}
              initialValues={initialValues}
              users={users}
              setUsers={setUsers}
              setIsEdit={setIsEdit}
              setSelectedUser={setSelectedUser}
              setInitialValues={setInitialValues}
              setLoading={setLoading}
              loading={loading}
            />
          </div>
        </div>

        <div className="card card-userdetails">
          <div className="card-body">
            <h5 className="card-title">User Details</h5>
            <Userdetails
              users={users}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
              handleSelectUser={handleSelectUser}
              onDeleteUser={handleDeleteUser}
              onLoadMore={handleLoadMore}
              numToShow={numToShow}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
