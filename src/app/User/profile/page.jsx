"use client";

import React, { useState, useEffect } from "react";
import Navbar from '../component/Navbar';
import { supabase } from "@/app/util/supabase/client";

const Page = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userdetails"));
    if (storedUser?.username) {
      setUsername(storedUser.username);
    }
  }, []);

  useEffect(() => {
    if (username) { 
      fetchUserData();
    }
  }, [username]); 

  const fetchUserData = async () => {
    try {
      console.log("Fetching data for:", username);

      const { data, error } = await supabase
        .from('mark')
        .select('*')
        .eq('username', username)
        .maybeSingle(); // Prevents errors if no data is found

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        console.log("User Data Fetched:", data);
        setUserData(data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className=" bg-white p-4 rounded-3 shadow-lg  " style={{marginTop :"200px" , width: "100vh", height: "auto", marginLeft: "480px" }}>
        <h3>Username: {username || "Loading..."}</h3>

        {userData ? (
    <div className="mt-5 d-flex justify-content-around flex-wrap">
            {userData.geographical > 0 && (
              <div className="w-25 bg-secondary rounded-3 bg-opacity-50 text-center p-3 mb-3">
                <h4>Geographical Quiz</h4>
                <img src="/images/medal.png" width="50px" alt="Medal" />
                <h4>Score: {userData.geographical}</h4>
              </div>
            )}

            {userData.technical > 0 && (
              <div className="w-25 bg-success rounded-3 bg-opacity-50 text-center p-3 mb-3">
                <h4>Technical Quiz</h4>
                <img src="/images/medal.png" width="50px" alt="Medal" />
                <h4>Score: {userData.technical}</h4>
              </div>
            )}

            {userData.scientifical > 0 && (
              <div className="w-25 bg-primary rounded-3 bg-opacity-50 text-center p-3 mb-3">
                <h4>Scientific Quiz</h4>
                <img src="/images/medal.png" width="50px" alt="Medal" />
                <h4>Score: {userData.scientifical}</h4>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center mt-4">Loading user data...</p>
        )}
      </div>
    </>
  );
};

export default Page;
