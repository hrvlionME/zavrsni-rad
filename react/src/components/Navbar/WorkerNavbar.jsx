import { useState } from 'react'
import { Link } from 'react-router-dom'

function WorkerNavbar() {


  return (
    <>
     <div className="bg-primary-base shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-gray-100 font-open text-center hover:bg-primary-shadow hover:text-white px-3 py-2 w-full rounded-md text-sm font-medium">OGLASI</Link>
          <span className="text-gray-100 font-open mx-5">|</span>
          <Link to="/about" className="text-gray-100 font-open text-center hover:bg-primary-shadow hover:text-white px-3 py-2 w-full rounded-md text-sm font-medium">O NAMA</Link>
          <span className="text-gray-100 font-open mx-5">|</span>
          <h1 className="text-gray-100 font-content text-center font-bold text-lg w-full">JOB BOARD</h1>
          <span className="text-gray-100 font-open mx-5">|</span>
          <Link to="/" className="text-gray-100 font-open text-center hover:bg-primary-shadow hover:text-white px-3 py-2 w-full rounded-md text-sm font-medium">MOJ PROFIL</Link>
          <span className="text-gray-100 font-open mx-5">|</span>
          <Link to="/login" className="text-gray-100 font-open text-center bg-secondary-base hover:bg-secondary-shadow hover:text-white px-3 py-2 w-full rounded-md text-sm font-medium">LOGOUT</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default WorkerNavbar
