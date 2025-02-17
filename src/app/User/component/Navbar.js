"use client"

import React,{useState,useEffect} from "react";

const Navbar = () => {
  const [userDetails, setUserDetails] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem("userdetails");
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout =async()=>{
    localStorage.removeItem("userdetails");
    window.location.href='/login';
  }

  return (
    <nav className="w-full navbar navbar-expand-lg navbar-light bg-light gap-4 d-flex justify-content-end">
      <a className="fw-bold fs-3 mx-2" href="/User/home">Home</a>
      <a className="fw-bold fs-3 mx-2" href="/User/profile">Profile</a>
      <a className="fw-bold fs-3 mx-2" href="/login">Login</a>  
      

      {userDetails.usertype === "admin" && (
        <a className="fw-bold fs-3 mx-2" href="/Admin/dashboard">Admin</a>
      )}
      <a onClick={handleLogout} className="fw-bold fs-3 mx-2 " >Logout</a>


    </nav>
  );
};

export default Navbar;
