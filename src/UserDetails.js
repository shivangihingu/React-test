import React from "react";
import EditIcon from "./assets/edit-icon.svg";
import DeleteIcon from "./assets/delete-icon.svg";

const Userdetails = ({
  users,
  selectedUser,
  onSelectUser,
  handleSelectUser,
  onDeleteUser,
  onLoadMore,
  numToShow,
  loading,
}) => {
  return (
    <div>
      <table className="table">
        <tbody>
          {loading
            ? "Please Wait..."
            : users && users.length > 0
            ? users &&
              users.slice(0, numToShow).map((user, index) => (
                <tr
                  key={index}
                  className={user.id === selectedUser?.id ? "selected" : ""}
                  onClick={() => onSelectUser(user)}
                >
                  <td>
                    Name <br />
                    {user.name}
                  </td>
                  <td>
                    Email <br />
                    {user.email}
                  </td>
                  <td>
                    <button onClick={() => handleSelectUser(user)}>
                      <img src={EditIcon} />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => onDeleteUser(user)}>
                      <img src={DeleteIcon} />
                    </button>
                  </td>
                </tr>
              ))
            : "No data found"}
          {users && users.length > 3 && (
            <button onClick={onLoadMore} className="load-more">
              Load More
            </button>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Userdetails;
