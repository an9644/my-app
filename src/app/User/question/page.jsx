"use client"

import { supabase } from '@/app/util/supabase/client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [topic, setTopic] = useState('');
  const [username, setUsername] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [score, setScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedTopic = localStorage.getItem('topic');
    const storedUser = JSON.parse(localStorage.getItem('userdetails'));
    
    setTopic(storedTopic);
    setUsername(storedUser?.username);

    if (storedTopic) fetchData(storedTopic);
  }, []);

  const fetchData = async (topicName) => {
    const { data, error } = await supabase.from(topicName).select('*');
    if (!error) {
      setQuestions(data || []);
    }
  };

  const handleAnswerCheck = async (selectedOption) => {
    if (!questions[currentIndex]) return;

    setSelectedAnswer(selectedOption);
    setCorrectAnswer(questions[currentIndex].answer);
    
    let newScore = score;
    if (selectedOption === questions[currentIndex].answer) {
      newScore += 1;
      setScore(newScore);
    }

    localStorage.setItem('currentAttempt', JSON.stringify({ topic, score: newScore }));

    await updateScore(newScore);
    
    setTimeout(() => handleNext(), 2000);
  };

  const updateScore = async (updatedScore) => {
    const { data, error } = await supabase
      .from('mark')
      .select('*')
      .eq('username', username)
      .maybeSingle(); 

    if (error) {
      console.error("Error fetching user score:", error);
      return;
    }

    // ✅ If no existing record, create a new one
    if (!data) {
      await supabase.from('mark').insert([{ username, [topic]: updatedScore }]);
    } else {
      const currentScore = data[topic] || 0;
      if (updatedScore > currentScore) {
        await supabase.from('mark').update({ [topic]: updatedScore }).eq('username', username);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setSelectedAnswer('');
      setCorrectAnswer('');
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/User/result');
    }
  };

  const handleButonClr = (option) => {
    if (!correctAnswer) return "btn btn-secondary";
    if (option === correctAnswer) return "btn btn-success";
    if (option === selectedAnswer) return "btn btn-danger";
    return "btn btn-secondary";
  };

  return (
    <>
      <div className="w-full h-5 bg-white gap-4 text-center p-2 rounded-3 ">
        <h1 className="fw-bold fs-1 ">Question {currentIndex + 1}</h1>
        <span className="fs-4">{topic} - Question</span>
      </div>

      <div className=" bg-white rounded border border-4 border-primary " style={{width :750 , height:550,marginLeft:650,marginTop:120}}>
      <div className='d-grid gap-3 p-5' style={{ marginTop: '10px' }}>
      <h3 className='text-xl text-center mt-5'>{questions[currentIndex]?.question}</h3>
      <button   className={`mt-3 ${handleButonClr(questions[currentIndex]?.option1)}`} onClick={() => handleAnswerCheck(questions[currentIndex]?.option1)}
            style={{ width: "250px" ,marginLeft :170 }}> 1. {questions[currentIndex]?.option1}
          </button>
          <button className={handleButonClr(questions[currentIndex]?.option2)} onClick={() => handleAnswerCheck(questions[currentIndex]?.option2)}
            style={{ width: "250px" ,marginLeft :170 }}> 2. {questions[currentIndex]?.option2} 
            </button>
          <button className={handleButonClr(questions[currentIndex]?.option3)} onClick={() => handleAnswerCheck(questions[currentIndex]?.option3)}
            style={{ width: "250px" ,marginLeft :170 }}> 3. {questions[currentIndex]?.option3}
          </button>
          <button className={handleButonClr(questions[currentIndex]?.option4)} onClick={() => handleAnswerCheck(questions[currentIndex]?.option4)}
            style={{ width: "250px" ,marginLeft :170 }}> 4. {questions[currentIndex]?.option4}
          </button>
        </div>
        <div className="mt-4 d-flex mb-5 " style={{marginLeft:590}}>
              <button className="btn btn-secondary" onClick={handleNext}  disabled={!selectedAnswer}>
                {currentIndex < questions.length - 1 ? "Next" : "Finish"}
              </button>
            </div>
      
        </div>



            
           
    </>
  )
}

export default Page
