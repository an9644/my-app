"use client";

import Navbar from '../components/Navbar.js';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Correct import for useRouter
import { supabase } from '@/app/util/supabase/client';

const Page = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // State to check if it's on the client

  useEffect(() => {
    setIsClient(true); // Update state after the component mounts
  }, []);

  if (!isClient) {
    return null; // Render nothing while the component is not mounted on the client
  }

  const { id, topic } = router.query;

  useEffect(() => {
    console.log("id", id);
    console.log("topic", topic);
  }, [id, topic]);



  return (
    <>
      {/* <Navbar />
      <div className="container mt-5">
        <div className="container align-items-center" style={{ marginTop: "150px", marginLeft: "150px" }}>
          <div className="card p-4 border border-primary shadow-lg d-flex flex-column" style={{ width: 900, height: 500, borderRadius: 12 }}>
            <form className="fs-4 p-3" onSubmit={handleUpdate}>

              <table>
                <tbody>
                  <tr className="mb-4">
                    <td><label htmlFor="category">Category:</label></td>
                    <td>
                      <select
                        name="category"
                        value={formData.category}
                        disabled
                        style={{ width: "400px", height: "40px" }}
                      >
                        <option value="Geography">Geography</option>
                        <option value="Technical">Technical</option>
                        <option value="Scientific">Scientific</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="mb-4">
                    <td><label htmlFor="question">Question:</label></td>
                    <td>
                      <input
                        type="text"
                        name="question"
                        placeholder="Enter question"
                        style={{ width: 400, height: 40 }}
                        value={formData.question}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr className="mb-4">
                    <td><label htmlFor="options">Options:</label></td>
                    <td>
                      <input
                        type="text"
                        name="option1"
                        placeholder="Option 1"
                        style={{ width: "400px", height: "40px", marginBottom: "10px" }}
                        value={formData.option1}
                        onChange={handleChange}
                      /><br />
                      <input
                        type="text"
                        name="option2"
                        placeholder="Option 2"
                        style={{ width: "400px", height: "40px", marginBottom: "10px" }}
                        value={formData.option2}
                        onChange={handleChange}
                      /><br />
                      <input
                        type="text"
                        name="option3"
                        placeholder="Option 3"
                        style={{ width: "400px", height: "40px", marginBottom: "10px" }}
                        value={formData.option3}
                        onChange={handleChange}
                      /><br />
                      <input
                        type="text"
                        name="option4"
                        placeholder="Option 4"
                        style={{ width: "400px", height: "40px", marginBottom: "10px" }}
                        value={formData.option4}
                        onChange={handleChange}
                      /><br />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="answer">Answer:</label></td>
                    <td>
                      <input
                        type="text"
                        name="answer"
                        placeholder="Enter answer"
                        style={{ width: "400px", height: "40px", marginBottom: "10px" }}
                        value={formData.answer}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-5 d-flex justify-content-center">
                <button type="submit" className="btn bg-primary btn-outline-secondary text-white fw-bold" style={{ width: "250px" }}>Update Question</button>
              </div>

            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Page;
