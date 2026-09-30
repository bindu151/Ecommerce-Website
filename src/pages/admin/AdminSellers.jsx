import { useState } from "react";

function AdminSellers() {
  const [search, setSearch] = useState("");

  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: "Ravi Kumar",
      email: "ravi@gmail.com",
      store: "Ravi Electronics",
      status: "Active",
    },
    {
      id: 2,
      name: "Anita Sharma",
      email: "anita@gmail.com",
      store: "Anita Fashion",
      status: "Active",
    },
    {
      id: 3,
      name: "Vijay Patil",
      email: "vijay@gmail.com",
      store: "Vijay Home Store",
      status: "Blocked",
    },
  ]);

  const filteredSellers = sellers.filter((seller) =>
    `${seller.name} ${seller.email} ${seller.store}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="users-page">
      <h1>Sellers Management</h1>

      <p>Manage all registered sellers from here.</p>

      <input
        type="text"
        placeholder="Search seller or store..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Seller Name</th>
            <th>Email</th>
            <th>Store Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredSellers.map((seller) => (
            <tr key={seller.id}>
              <td>{seller.id}</td>
              <td>{seller.name}</td>
              <td>{seller.email}</td>
              <td>{seller.store}</td>

              <td
                className={
                  seller.status === "Active"
                    ? "status-active"
                    : "status-blocked"
                }
              >
                {seller.status}
              </td>

              <td>
                <button
                  onClick={() => {
                    setSellers(
                      sellers.map((item) =>
                        item.id === seller.id
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
                  {seller.status === "Active" ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}

          {filteredSellers.length === 0 && (
            <tr>
              <td colSpan="6">No sellers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminSellers;