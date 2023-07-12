'use client'
import { useState } from 'react';
import postHandler from '@/app/handlers/postHandler';
import { Toaster, ToastContainer } from '@/app/utils/Toaster';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    console.log(formData);

    const response = await postHandler('http://127.0.0.1:8080/login', formData);

    if (response.status === 1) {
      Toaster.success('Login successful');
      console.log('Login successful:', response.data);
    } else {
      Toaster.error(`${response.data.error}`);
      console.error('Login error:', response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-xl w-full mx-auto p-4 bg-white rounded shadow">
        <h1 className="text-3xl text-center mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
          >
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
