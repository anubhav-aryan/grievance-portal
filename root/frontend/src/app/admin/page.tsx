'use client'
import React, { useState, useEffect } from 'react';
import getHandler from '../handlers/getHandler';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const getCookie = (name) => {
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
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
