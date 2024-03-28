import { useState } from 'react'
import DisplayNavbar from '../components/Navbar/DisplayNavbar'

function LandingPage() {


  return (
    <>
    <DisplayNavbar/>
    <div className="absolute inset-0 -z-10 h-full w-full bg-primary-base [background:radial-gradient(125%_125%_at_50%_10%,#265073_40%,#2D9596_100%)]">
            <div className='flex flex-col justify-center w-full h-screen'>
                <h1 className='text-center font-content text-white text-5xl m-3'>Job Board</h1>
                <h3 className='text-center font-content text-white text-xl m-3'>Pronađite svoj savršen posao vec danas!</h3>
            </div>
        </div>
    </>
  )
}

export default LandingPage
