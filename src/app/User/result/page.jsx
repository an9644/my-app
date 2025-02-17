"use client"

import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';

const Page = () => {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedTopic = localStorage.getItem('topic');

    if (storedTopic) {
      setTopic(storedTopic);
    }

    const currentAttempt = JSON.parse(localStorage.getItem('currentAttempt'));

    if (currentAttempt && currentAttempt.topic === storedTopic) {
      setResult(currentAttempt.score);
    } else {
      setResult(0); 
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-5 bg-white text-center p-4 rounded-3 shadow-lg" style={{ width: "80vw", height: "600px", marginLeft: "10vw", marginRight: "10vw" }}>
        <div className="border border-5 border-primary rounded-3 p-4 h-full">
          <img src="../images/result.png" width="250px" alt="Result" />

          {result !== null ? (
            result > 0 ? (
              <div>
                <h1 className="fw-bold text-primary">Congratulations!!<br />You Won!!!</h1>
                <div className="mt-5">
                  <h3>You scored {result} marks in {topic} Quiz</h3>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="fw-bold text-primary">Better Luck Next Time!!</h1>
                <div className="mt-5">
                  <h3>You scored 0 marks in {topic} Quiz</h3>
                </div>
              </div>
            )
          ) : (
            <h3>Loading...</h3> 
          )}

          <div className="d-flex justify-content-between mx-5 mt-2">
            <a className="btn btn-primary text-white fw-bold fs-5" href="/User/home">Go to Home</a>
            <a className="btn btn-primary text-white fw-bold fs-5" href="/User/profile">Go to Profile</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
