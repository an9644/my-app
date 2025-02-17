"use client"

import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import { supabase } from '@/app/util/supabase/client';

const page = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {

      // Fetch total users count
      const { count: userCount, error: userError } = await supabase
        .from("userdetails") 
        .select("*", { count: "exact", head: true })
        .neq("usertype", "admin");     

      if (userError) {
        console.error("Error fetching users count:", userError);
      } else {
        setTotalUsers(userCount || 0);
      }
    };

    fetchCounts();
  }, []);

     return (
    <>
    <Navbar />    
     <div className="container mt-5">
       <div className="row">
            <div className="col-md-3 text-center">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Total Questions</h5>
                        <h1 className="display-3 fw-bold">20</h1>
                        <div className="ml-5 d-flex justify-content-center">
                            <button className="btn btn-outline-secondary p-2 bg-primary" >
                                <a className="text-light  " style={{textDecoration:" none"}} href="/Admin/geographical">View Question</a></button>
                        </div>
                    </div>
                </div>
            </div>  
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Total Users</h5>
                        <h1 className="display-3 fw-bold">{totalUsers}</h1>
                        </div>
                </div>
            </div>
          
        </div>
        
    </div> 
    
    </>
  )
}

export default page