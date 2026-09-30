import { useState } from "react";

function AdminUsers() {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul",
      email: "rahul@gmail.com",
      role: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya",
      email: "priya@gmail.com",
      role: "User",
      status: "Active",
    },
    {
      id: 3,
      name: "Arun",
      email: "arun@gmail.com",
      role: "User",
      status: "Blocked",
    },
  ]);

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="users-page">
      <h1>Users Management</h1>

      <p>Manage all registered users from here.</p>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td
                className={
                  user.status === "Active"
                    ? "status-active"
                    : "status-blocked"
                }
              >
                {user.status}
              </td>

              <td>
                <button
                  onClick={() => {
                    setUsers(
                      users.map((item) =>
                        item.id === user.id
                          ? {
                              ...item,
                              status:
                                item.status === "Active"
                                  ? "Blocked"
                                  : "Active",
                            }
                          : item
                      )
                    );
                  }}
                >
                  {user.status === "Active" ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}

          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="6">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;