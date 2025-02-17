'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../util/supabase/client';

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    console.log('Logging in with:', { username, password });

    try {
      // Check if user exists in Supabase
      const { data, error } = await supabase
        .from('userdetails') // Make sure this matches your Supabase table name
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single(); 

      if (error) {
        throw error;
      }

      if (data) {
        console.log('Login successful:', data);
        
        // Store user details in localStorage
        localStorage.setItem('userdetails', JSON.stringify(data));
        router.push('/User/home');
      } else {
        alert(' Invalid username or password');
      }
    } catch (error) {
      console.log(' Login error:', error.message);
      alert(' Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center border-2 border-primary" style={{ marginTop: "190px" }}>
        <form onSubmit={handleLogin} className="bg-white w-44 p-5 rounded">
          <h1 className="fw-bold">Login</h1>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control"style={{ backgroundColor: "rgba(135, 135, 135, 0.5)" }} 
              value={username} onChange={(event) => setUsername(event.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" style={{ backgroundColor: "rgba(135, 135, 135, 0.5)" }} 
              value={password} onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <div id="emailHelp" className="form-text">
            Don't have an Account? <a href="/signup" style={{ textDecoration: "none", textDecorationColor: "blueviolet" }}>Sign up</a>
          </div>
          <button type="submit" className="btn fw-bold text-white mt-2" style={{ backgroundColor: "rgb(180, 114, 241)" }}>Login</button>
        </form>
      </div>
    </>
  );
};

export default Page;
