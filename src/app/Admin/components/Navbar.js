"use client"

import React from "react";

const Navbar = () => {

    const handleLogout =async()=>{
        localStorage.removeItem("userdetails");
        window.location.href='/login';
      }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <a className="navbar-brand" href="/Admin/dashboard">Admin Dashboard</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active"  href="/Admin/addquestion">Add Question</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active"  href="/Admin/user">Users</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active"  href="/User/home">Home</a>
                    </li>
                </ul>
                <li>
                <a onClick={handleLogout} className="fw-bold fs-3 mx-2 " >Logout</a>
                </li>
            </div>
        </div>
    </nav>
    
    </>
  )
}

export default Navbar