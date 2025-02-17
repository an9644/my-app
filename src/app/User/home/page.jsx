'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../component/Navbar';
import { supabase } from '@/app/util/supabase/client';

const Page = () => {
  const router = useRouter();

  const handleStartNow = async (topic) => {
    const userDetails = JSON.parse(localStorage.getItem('userdetails')); // Parse JSON properly

    if (!userDetails || !userDetails.username) {
      alert('Please log in first!');
      router.push('/login');
      return;
    }

    const username = userDetails.username; 

    try {
      const { data, error } = await supabase
        .from('mark')
        .select('username')
        .eq('username', username)
        .maybeSingle(); 

      if (error) {
        console.error('Error checking user:', error);
        alert('Something went wrong. Please try again.');
        return;
      }

      if (!data) {
        const { error: insertError } = await supabase
          .from('mark')
          .insert([{ username }]);

        if (insertError) {
          console.log('Insert error:', insertError);
        } else {
          console.log('User stored successfully');
        }
      } else {
        console.log('User already exists. No need to insert.');
      }

      localStorage.setItem('topic', topic);
      router.push(`/User/question?topic=${topic}`);
      
    } catch (error) {
      console.log('Error handling user:', error);
    }
  };

  return (
    <>
      <Navbar />
      {/* Body part */}
      <div className="d-flex justify-content-around gap-5 mt-5">
        {/* Geographical Questions */}
        <div className="card rounded-2 mt-5" style={{ height: "47rem", width: "28rem" }}>
          <div className="card-body">
            <img src="/images/geo.jpg" className="p-3 card-img-top img-fluid" style={{ filter: "brightness(50%)", height: "635px" }} />
            <div className="card-img-overlay d-flex justify-content-center align-items-center">
              <p className="card-title fs-3 fw-bold text-white">Geographical Questions</p>
            </div>
            <div className='mt-2'>
              <button onClick={() => handleStartNow('geographical')} className='text-white fw-bold bg-primary p-3 rounded position-relative z-index-1' style={{ textDecoration: "none", marginLeft: "9rem" }}>Start Now</button>
            </div>
          </div>
        </div>
        {/* Technical Questions */}
        <div className="d-flex justify-content-center mt-5">
          <div className="card" style={{ height: "47rem", width: "28rem" }}>
            <img src="../images/tech.jpg" className="p-4 card-img-top img-fluid" style={{ filter: "brightness(50%)", height: "635px" }} />
            <div className="card-img-overlay d-flex justify-content-center align-items-center">
              <p className="card-title fs-3 fw-bold text-white">Technical Questions</p>
            </div>
            <div className='mt-2'>
              <button onClick={() => handleStartNow('technical')} className='text-white fw-bold bg-primary p-3 rounded position-relative z-index-1' style={{ textDecoration: "none", marginLeft: "10rem" }}>Start Now</button>
            </div>
          </div>
        </div>
        {/* Scientific Questions */}
        <div className="d-flex justify-content-center mt-5">
          <div className="card" style={{ height: "47rem", width: "28rem" }}>
            <img src="../images/science.jpg" className="p-4 card-img-top img-fluid" style={{ filter: "brightness(50%)", height: "643px" }} />
            <div className="card-img-overlay d-flex justify-content-center align-items-center">
              <p className="card-title fs-3 fw-bold text-white">Scientific Questions</p>
            </div>
            <div className='mt-2'>
              <button onClick={() => handleStartNow('scientifical')} className='text-white fw-bold bg-primary p-3 rounded position-relative z-index-1' style={{ textDecoration: "none", marginLeft: "10rem" }}>Start Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
