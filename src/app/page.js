import React from 'react'

const Intro = () => {
  return (
    <>
    <div className=" text-dark bg-opacity-50">
    <div className="container bg-white mr-6 text-dark text-center shadow-lg  border border-3 border-info rounded-3 rounded "  style={{marginTop: "180px; padding: 100px"}}>
        <p className=" fs-1 fw-bold">Welcome to <br/> World Quiz App</p>

       <a style={{textDecoration:"none"}} className="text-dark badge border bg-info fs-5"  href="/User/home">Get Started</a> 
    </div> 
    
</div>
    
    </>
  )
}

export default Intro