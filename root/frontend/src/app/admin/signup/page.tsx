'use client'
import { useState } from 'react';
import postHandler from '@/app/handlers/postHandler';
import { Toaster, ToastContainer } from '@/app/utils/Toaster';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    const response = await postHandler('http://127.0.0.1:8080/signup', formData);

    if (response.status === 1) {
      Toaster.success('Signup successful');
      console.log('Signup successful:', response.data);
      router.push('/admin/login');
    } else {
      Toaster.error(`${response.data.error}`);
      console.error('Signup error:', response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-xl w-full mx-auto p-4 bg-white rounded shadow">
        <h1 className="text-3xl text-center mb-6">SW Grievance Portal Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
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
            Signup
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
