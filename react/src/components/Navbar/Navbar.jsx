import { useState } from 'react'

function Navbar() {


  return (
    <>
     <div className="bg-primary-base shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
 
       
            <a href="/" className="text-content text-center hover:bg-primary-shadow hover:text-white px-3 py-2 w-full rounded-md text-sm font-medium">Link 1</a>
            <span className="text-content mx-5">|</span>
            <a href="/" className="text-content text-center hover:bg-primary-shadow hover:text-white px-3 py-2 w-full rounded-md text-sm font-medium">Link 2</a>
       
            <span className="text-content mx-5">|</span>
    
            <a href="/" className="text-content text-center font-bold text-lg w-full">JOB BOARD</a>
     
            <span className="text-content mx-5">|</span>
            <a href="/" className="text-content text-center hover:bg-primary-shadow hover:text-white px-3 py-2 w-full rounded-md text-sm font-medium">Link 3</a>
            <span className="text-content mx-5">|</span>
            <a href="/" className="text-content text-center hover:bg-primary-shadow hover:text-white px-3 py-2 w-full rounded-md text-sm font-medium">Link 4</a>

        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar
