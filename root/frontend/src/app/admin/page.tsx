'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getHandler from '@/app/handlers/getHandler';
import patchHandler from '@/app/handlers/patchHandler';
import { ToastContainer, Toaster } from '@/app/utils/Toaster';

const Page = () => {
  const [users, setUsers] = useState<Array<any>>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [inputRole, setInputRole] = useState('');
  const router = useRouter();

  const getCookie = (name: string) => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie('token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await getHandler('http://127.0.0.1:8080/admin/panel');
      console.log(response);
      if (response.status === 1) {
        setUsers(response.data);
      }
    };
    fetchData();
  }, [router]);

  const updateUserRole = async (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleRoleUpdate = async (userId: string) => {
    const token = getCookie('token') || '';
    const URL = `http://127.0.0.1:8080/admin/panel/update/${userId}`;
    const formData = {
      role: inputRole,
    };
  
    const response = await patchHandler(URL, formData, 'application/json', token);
    if (response.status === 1) {
      Toaster.success('User role updated successfully');
      console.log('User role updated:', response.data);
      // Update the user list to reflect the changed role
      const updatedUsers = users.map((user: any) => {
        if (user.id === userId) {
          return { ...user, role: inputRole };
        }
        return user;
      });
      setUsers(updatedUsers);
      setSelectedUserId(null);
      setInputRole('');
    } else {
      Toaster.error('Error updating user role');
      console.error('Error updating user role:', response.data);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 ml-4">User List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user: any) => (
          <div
            key={user._id}
            className="bg-white rounded shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-gray-500 mb-4 truncate">{user.email}</p>
              <p className="text-gray-500">{user.role}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">{user.id}</p>
              {user.id === selectedUserId ? (
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter new role"
                    value={inputRole}
                    onChange={(e) => setInputRole(e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded mr-2"
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => handleRoleUpdate(user.id)}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => updateUserRole(user.id)}
                >
                  Update Role
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;



