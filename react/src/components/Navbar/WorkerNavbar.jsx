import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function WorkerNavbar() {

  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
      const handleResize = () => {
          setIsClicked(window.innerWidth <= 768); 
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []); 


  function handleToggle(){
      setIsClicked(!isClicked)
  }

  return (
    <>
     <div className="bg-primary-base shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
      <div className={`${isClicked ? 'hidden' : ''} flex-col md:flex-row flex justify-between items-center md:h-16 h-auto`}>
          <Link to="/" className="text-gray-100 font-open text-center hover:bg-primary-shadow hover:text-white px-3 py-2 my-1 w-full rounded-md text-sm font-medium">POČETNA</Link>
          <span className="text-gray-100 font-open mx-5 hidden md:block">|</span>
          <Link to="/about" className="text-gray-100 font-open text-center hover:bg-primary-shadow hover:text-white px-3 py-2 my-1 w-full rounded-md text-sm font-medium">O NAMA</Link>
          <span className="text-gray-100 font-open mx-5 hidden md:block">|</span>
          <h1 className="text-gray-100 font-content text-center font-bold text-lg w-full hidden md:block">JOB BOARD</h1>
          <span className="text-gray-100 font-open mx-5 hidden md:block">|</span>
          <Link to="/" className="text-gray-100 font-open text-center hover:bg-primary-shadow hover:text-white px-3 py-2 my-1 w-full rounded-md text-sm font-medium">OGLASI</Link>
          <span className="text-gray-100 font-open mx-5 hidden md:block">|</span>
          <Link to="/login" className="text-gray-100 font-open text-center bg-secondary-base hover:bg-secondary-shadow hover:text-white px-3 py-2 my-1 w-full rounded-md text-sm font-medium">LOGIN</Link>
        </div>
        <div className="md:hidden block">
              <button className={`rounded bg-secondary-base text-white hover:bg-secondary-shadow transition m-3 px-3 py-1 ${isClicked ? '' : 'hidden'}`} onClick={handleToggle}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

              </button>
              <button className={`absolute left-2 top-2 rounded bg-sec text-white hover:bg-pri transition px-3 py-1 ${isClicked ? 'hidden' : ''}`} onClick={handleToggle}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>


              </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default WorkerNavbar
