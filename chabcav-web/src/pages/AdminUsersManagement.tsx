import React, { useState, useEffect } from "react";
import { Button, Input, Card, CardContent } from "@mui/material";
import axios from "axios";

type User = {
    id: number;
    username: string;
    email: string;
    password: string;
};

const AdminUserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [form, setForm] = useState<Omit<User, "id">>({
        username: "",
        email: "",
        password: "",
    });
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Fetch users from API on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://chabcav-api-development.up.railway.app/admin/get-all-users");
                setUsers(response.data); // Set users to state from API response
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };
        fetchUsers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddUser = async () => {
        if (!form.username || !form.email || !form.password) return;
        const newUser: User = {
            id: Date.now(),
            ...form,
        };
        try {
            const response = await axios.post("https://chabcav-api-development.up.railway.app/admin/add-user", newUser); // Post new user to API
            setUsers([...users, response.data]); // Add new user to the list
            setForm({ username: "", email: "", password: "" });
        } catch (error) {
            console.error("Error adding user", error);
        }
    };

    const handleUpdateUser = async () => {
        if (editingUserId === null) return;
        const updatedUser = {
            id: editingUserId,
            ...form,
        };

        try {
            const response = await axios.put(`https://chabcav-api-development.up.railway.app/admin/update-user/${editingUserId}`, updatedUser); // PUT request for update
            setUsers(users.map((user) =>
                user.id === editingUserId ? response.data : user // Update the user in the list
            ));
            setForm({ username: "", email: "", password: "" });
            setEditingUserId(null);
        } catch (error) {
            console.error("Error updating user", error);
        }
    };

   /* const handleEditClick = (user: User) => {
        setForm({ username: user.username, email: user.email, password: user.password });
        setEditingUserId(user.id);
    };*/

    /*const handleDeleteUser = async (id: number) => {
      try {
        await axios.delete(`https://chabcav-api-development.up.railway.app/admin/delete-user/${id}`); // DELETE request for deleting user
        setUsers(users.filter(user => user.id !== id)); // Remove user from state
      } catch (error) {
        console.error("Error deleting user", error);
      }
    };*/

    // Function to handle mouse movement
      useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
          if (event.clientX <= 10) {
            setIsSidebarCollapsed(false); // Expand if mouse is at the leftmost 10px
          } else if (event.clientX > 260) {
            setIsSidebarCollapsed(true); // Collapse if mouse moves far from the sidebar
          }
        };
    
        window.addEventListener("mousemove", handleMouseMove);
    
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      }, []);

    return (
<> 
<div   style={{
        transition: "margin 0.3s ease-in-out",
        marginLeft: isSidebarCollapsed ? "0" : "250px",
        width: isSidebarCollapsed ? "100%" : "calc(100% - 250px)",
      }}>
          {/* Page Header */}
      <div
        className="page-header min-height-300 border-radius-xl mt-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",


          
        }}
      >
        <span className="mask bg-gradient-dark opacity-6"></span>
      </div>
        <div className="card card-body mx-2 mx-md-2 mt-n6">
      
            <Card className="mb-6">
                <CardContent className="space-y-6 p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-center">
                        {editingUserId ? "Edit User" : "Add User"}
                    </h2>

                    {/* Form Grid Wrapper */}   
                    <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="w-full">
                            <Input
                                fullWidth
                                placeholder="Username"
                                name="username"
                                value={form.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                fullWidth
                                placeholder="Email"
                                name="email"
                                value={form.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                fullWidth
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="text-center w-full">
                        <Button onClick={editingUserId ? handleUpdateUser : handleAddUser}>
                            {editingUserId ? "Update User" : "Add User"}
                        </Button>
                    </div>
                </CardContent>

            </Card>

            <Card>
                <CardContent className="p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-6 text-center">User List</h2>

                    <div className="w-full max-w-4xl overflow-x-auto">
                        <table className="mx-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2 text-center">Username</th>
                                    <th className="border px-4 py-2 text-center">Email</th>
                                   {/* <th className="border px-4 py-2 text-center">Actions</th>*/}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="border px-4 py-2 text-center">{user.username}</td>
                                        <td className="border px-4 py-2 text-center">{user.email}</td>
                                       {/* <td className="border px-4 py-2 space-x-2 text-center">
                                            <Button size="small" onClick={() => handleEditClick(user)}>Edit</Button>
                                        </td>*/}
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="text-center py-4">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
        </div>
        </>
    );
};

export default AdminUserManagement;
