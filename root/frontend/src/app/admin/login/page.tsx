'use client';
import { useState, useEffect } from 'react';
import postHandler from '@/app/handlers/postHandler';
import { Toaster, ToastContainer } from '@/app/utils/Toaster';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    const token = getCookie('token');
    if (token) {
      router.push('/admin/issues');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    const response = await postHandler('http://127.0.0.1:8080/login', formData);

    if (response.status === 1) {
      console.log('Login successful:', response.data);
      Toaster.success('Login successful');
      const token = response.data.token;
      setCookie('token', token);
      router.push('/admin/issues');
    } else {
      console.error('Login error:', response.data);
      Toaster.error('Login error');
    }
  };

  const handleSignup = () => {
    router.push('/admin/signup');
  };
  
  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; Secure;`;
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
        <div className="mt-4 text-center gap-x-8">
          <p>Don't have an account?</p>
          <button
            className="text-blue-500 hover:underline"
            onClick={handleSignup}
          >
            Sign up
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Page;
