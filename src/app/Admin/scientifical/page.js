"use client";

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { supabase } from '@/app/util/supabase/client';
import { useRouter } from 'next/navigation';


const page = () => {
    const [questions,setQuestions]=useState([]);
    const router=useRouter()


    const fetchData = async () => {
      const { data, error } = await supabase.from("scientifical").select("*");

      if (error) {
        console.log("Error fetching data:", error.message);
      } else {
        setQuestions(data);
      }
    };    

    useEffect(() => {
        
        fetchData();
      }, []);

      const deleteData=async(id)=>{
        const {error}=await supabase
        .from("scientifical")
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
      const handleNext = (id, topic) => {
        router.push(`/Admin/update?id=${id}&topic=${topic}`);
    };
    
  return (
    <>
    <Navbar />
    <div className="container ">
    <div className="mt-5 d-flex justify-content-center gap-5">
            <button className="p-2 rounded text-primary fw-bold border-primary "><a style={{textDecoration: "none"}} href="/Admin/geographical">Geographical</a></button>
            <button className="p-2 rounded text-primary fw-bold border-primary "><a style={{textDecoration: "none"}} href="/Admin/technical">Technical</a></button>
            <button className="p-2 rounded text-primary fw-bold border-primary "><a style={{textDecoration: "none"}} href="/Admin/scientifical">Scientific</a></button>
        </div>    
        
        <div className="mt-5">
        {questions.length > 0 ? (
            <table className="table table-striped text-center ">
                <thead>
                    <tr>
                        <th scope="col">Sl.NO</th>
                        <th scope="col">Question</th>
                        <th scope="col">Options</th>
                        <th scope="col">Answer</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>

                     </tr>
                </thead>
                <tbody>   
                {questions.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.question}</td>
                    <td>
                            {item.option1} <br />
                            {item.option2} <br />
                            {item.option3} <br />
                            {item.option4}
                        </td>
                        <td>{item.answer}</td>
                        <td>
                      <button  className="btn btn-primary" onClick={() => handleNext(item.id, "scientifical")}>
                        Update
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteData(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center mt-5">
              <i className="fas fa-question-circle fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">No questions found.</h5>
            </div>
              )}

    
         </div>

     </div>

    </>
  )
}

export default page