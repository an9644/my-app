"use client"

import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import { supabase } from '@/app/util/supabase/client'

const page = () => {
    const [user,setUser]=useState([]);

    useEffect(()=>{
        const fetchData = async () => {
        const { data, error } = await supabase.from("userdetails").select("*");
    
          if (error) {
            console.log("Error fetching data:", error.message);
          } 
          else {
            const admin=data.filter(user =>user.usertype != "admin");
            setUser(admin);
          }
        };    
        fetchData();
      }, []);

      const deleteData=async(id)=>{
        const {error}=await supabase
        .from("userdetails")
        .delete()
        .eq("id",id);
        if(error){
            alert("Failed to delete data.");
            console.log(error.message)
        }else{
            alert("Data deleted successfully!");
            fetchData();
        }

      }
  return (
    <>
    <Navbar/>
    <div className="container mt-5">
        <div className="row mt-5">
         <div className="col-md-12">
            <h2>Active User</h2>
               <table className="table table-striped text-center ">
             <thead>
                        <tr>
                            <th scope="col">User</th>
                            <th scope="col">Geography</th>
                            <th scope="col">Technical</th>
                            <th scope="col">Science</th>
                            <th scope="col">Delete</th>
                         </tr>
                    </thead>
                    <tbody>
                    {user.length > 0 ? (
                        user.map((item, index) => (
                            <tr key={index}>
                            <td>{item.username}</td>
                            <td>{item.geography}</td>
                            <td>{item.technical}</td>
                            <td>{item.science}</td>
                            <td><button className="btn btn-danger" onClick={() => deleteData(item.id)}>
                                Delete </button>
                            </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="5"><div className="text-center mt-5">
                            <i className="fas fa-question-circle fa-3x text-muted mb-3"></i>
                            <h5 className="text-muted">No questions found.</h5>
                            </div></td>
                        </tr>
                        )}

                    </tbody>
                </table>
              </div> </div>
    </div> 
    
    </>
  )
}

export default page