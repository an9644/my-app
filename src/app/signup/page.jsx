'use client';

import React, { useState } from 'react'
import {supabase} from '../util/supabase/client'
import { useRouter } from 'next/navigation';

const page = () => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const router = useRouter();

  const handleSignup=async(event)=> {  
    event.preventDefault()
    try {      
      const { data, error } = await supabase
      .from('userdetails')
      .insert([
        {  username: username,
          password:password,
          usertype:'user'},
      ])
      .select()       
  
      if (data) {
        const userDetails = {  username, password };
        localStorage.setItem('userdetails', JSON.stringify(userDetails));
        console.log('User created successfully:', userDetails);
        alert('User created successfully')
        router.push('/login');
      }
      if (error) {
        throw error;       
      }      
    } catch (error) {
      console.log('Error creating user:', error);
    }
  }

  return (
    <>
    <div className="d-flex justify-content-center border-2 border-primary" style={{marginTop: "190px"}}>
        <form onSubmit={handleSignup} className="bg-white  w-44 p-5 rounded">
            <h1 className="fw-bold ">Signup</h1>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input value={username} onChange={(event) => setUsername(event.target.value)} type="text" className="form-control" id="username"  style={{backgroundColor: "rgba(135, 135, 135, 0.5)"}} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" id="password" style={{backgroundColor: "rgba(135, 135, 135, 0.5)"}} />
            </div>
            <div id="emailHelp" className="form-text">Already have an Account? <a className="" style={{textDecoration: "none", textDecorationColor:" blueviolet"}} href="/login">Login </a></div>
            <button type="submit" className="btn text-white fw-bold mt-2" style={{backgroundColor: "rgb(180, 114, 241)"}}>Submit            </button>
          </form>
    </div>

    </>
  )
}

export default page