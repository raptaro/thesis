"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, Edit, UserPlus, Search, Filter, MoreHorizontal, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userRole from "@/components/hooks/userRole";

// User Schema for Validation (for editing)
const UserSchema = z.object({
  id: z.number().optional(),
  email: z.string().email("Invalid email address"),
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  role: z.enum(["admin", "doctor", "secretary"]),
  is_active: z.boolean().default(true)
});

// Edit User Schema (for editing)
const EditUserSchema = UserSchema.partial().extend({
  email: z.string().email("Invalid email address").optional()
});

// Create User Schema (for creation, include password fields)
// Note: Allowed roles exactly match the model: "admin", "doctor", "secretary"
const CreateUserSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "doctor", "secretary"]),
  is_active: z.boolean().default(true),
  password: z.string().min(6, "Password must be at least 6 characters"),
  re_password: z.string().min(6, "Password must be at least 6 characters")
}).refine(data => data.password === data.re_password, {
  message: "Passwords do not match",
  path: ["re_password"],
});

type User = z.infer<typeof UserSchema>;
type EditUserFormData = z.infer<typeof EditUserSchema>;
type CreateUserFormData = z.infer<typeof CreateUserSchema>;

/** 
 * EditUserDialog is rendered outside of the dropdown.
 * It receives a "user" to edit, an "onClose" callback, and a callback to refresh the user list.
 */
function EditUserDialog({ user, onClose, onUpdated }: { user: User; onClose: () => void; onUpdated: () => void }) {
  const [open, setOpen] = useState(true);
  const form = useForm<EditUserFormData>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      is_active: user.is_active
    }
  });

  async function onSubmit(data: EditUserFormData) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/auth/users/${user.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Failed to update user");
      toast.success("User updated successfully");
      onUpdated();
      onClose();
    } catch {
      toast.error("Error updating user");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => { 
      setOpen(newOpen); 
      if (!newOpen) onClose(); 
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <Input {...form.register("first_name")} className="mt-1" />
            {form.formState.errors.first_name && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.first_name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <Input {...form.register("last_name")} className="mt-1" />
            {form.formState.errors.last_name && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.last_name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input {...form.register("email")} className="mt-1" />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select 
              {...form.register("role")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
              <option value="secretary">Medical Secretary</option>
            </select>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              {...form.register("is_active")}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm text-gray-900">Active Account</label>
          </div>
          <Button type="submit" className="w-full">Update User</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/**
 * CreateUserDialog works similarly, controlling its own open state.
 */
function CreateUserDialog({ onUserCreated }: { onUserCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      role: 'doctor', // default is doctor, but user can change it
      is_active: true,
      password: '',
      re_password: ''
    }
  });

  async function onSubmit(data: CreateUserFormData) {
    try {
      const accessToken = localStorage.getItem("access");
      const response = await fetch("http://127.0.0.1:8000/user/register/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Failed to create user");
      toast.success("User created successfully");
      onUserCreated();
      setOpen(false);
    } catch {
      toast.error("Error creating user");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-blue-600 hover:bg-blue-50">
          Create New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <Input {...form.register("first_name")} className="mt-1" />
            {form.formState.errors.first_name && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.first_name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <Input {...form.register("last_name")} className="mt-1" />
            {form.formState.errors.last_name && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.last_name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input {...form.register("email")} className="mt-1" />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select 
              {...form.register("role")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
              <option value="secretary">Medical Secretary</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input type="password" {...form.register("password")} className="mt-1" />
            {form.formState.errors.password && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <Input type="password" {...form.register("re_password")} className="mt-1" />
            {form.formState.errors.re_password && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.re_password.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              {...form.register("is_active")}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm text-gray-900">Active Account</label>
          </div>
          <Button type="submit" className="w-full">Create User</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function UserManagementDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const role = userRole();

  useEffect(() => {
    fetchUsers();
  }, []);

  const filterUsers = useCallback(() => {
    let result = users;
    if (searchTerm) {
      result = result.filter(user => 
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedRole) {
      result = result.filter(user => user.role === selectedRole);
    }
    setFilteredUsers(result);
  }, [users, searchTerm, selectedRole]);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedRole, users, filterUsers]);

  async function fetchUsers() {
    try {
      const accessToken = localStorage.getItem("access");
      const response = await fetch("http://127.0.0.1:8000/auth/users/", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching users");
    }
  }

  async function deleteUser(userId: number) {
    try {
      const accessToken = localStorage.getItem("access");
      const response = await fetch(`http://127.0.0.1:8000/auth/users/${userId}/`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });
      if (!response.ok) throw new Error("Failed to delete user");
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user");
    }
  }

  // Only allow admin access
  if (!role || role.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Not Authorized
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Refined Header */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 md:p-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <UserPlus className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-white">
                User Management
              </h1>
            </div>
            <CreateUserDialog onUserCreated={fetchUsers} />
          </div>

          {/* Advanced Search and Filter */}
          <div className="p-4 md:p-6 bg-slate-100/50 border-b border-slate-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Input 
                  placeholder="Search users by name, email, or role..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-2.5 border-slate-300 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 border-slate-300 hover:bg-slate-200/50 transition-colors"
                  >
                    <Filter className="w-5 h-5" /> 
                    <span>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedRole(null)}>
                    All Roles
                  </DropdownMenuItem>
                  {['admin', 'doctor', 'secretary'].map((role) => (
                    <DropdownMenuItem 
                      key={role} 
                      onClick={() => setSelectedRole(role)}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Enhanced User Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  {['Name', 'Email', 'Role', 'Status', 'Actions'].map((header) => (
                    <th 
                      key={header} 
                      className={`p-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider ${header === 'Actions' ? 'text-right' : ''}`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className="border-b border-slate-200 hover:bg-slate-100/50 transition-colors duration-150"
                  >
                    <td className="p-4 font-medium text-slate-800">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="p-4 text-slate-600">{user.email}</td>
                    <td className="p-4">
                    <span className={`
                      px-2.5 py-1 rounded-full text-xs font-semibold
                      ${user.role === 'admin' ? 'bg-red-100 text-red-700' : 
                        user.role === 'doctor' ? 'bg-green-100 text-green-700' : 
                        user.role === 'secretary' ? 'bg-blue-100 text-blue-700' : 
                        'bg-gray-100 text-gray-700'}
                    `}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>

                    </td>
                    <td className="p-4">
                      {user.is_active ? (
                        <span className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
                          <Check className="w-4 h-4 mr-1" /> Active
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs">
                          <X className="w-4 h-4 mr-1" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-slate-200/50 transition-colors">
                            <MoreHorizontal className="w-5 h-5 text-slate-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setEditingUser(user)} className="flex items-center gap-2">
                            <Edit className="w-4 h-4" /> Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:bg-red-50 flex items-center gap-2" onClick={() => user.id !== undefined && deleteUser(user.id)}>
                            <Trash2 className="w-4 h-4" /> Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12 px-4 bg-slate-50">
              <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 max-w-md mx-auto">
                <UserPlus className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
                <h2 className="text-xl font-semibold text-slate-800 mb-2">No Users Found</h2>
                <p className="text-slate-600 mb-4">
                  {searchTerm || selectedRole 
                    ? "No users match your current filter." 
                    : "Create your first user to get started."}
                </p>
                <CreateUserDialog onUserCreated={fetchUsers} />
              </div>
            </div>
          )}
        </div>
      </div>

      {editingUser && (
        <EditUserDialog user={editingUser} onClose={() => setEditingUser(null)} onUpdated={fetchUsers} />
      )}
    </div>
  );
}
