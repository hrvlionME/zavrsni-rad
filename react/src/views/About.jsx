import { useState } from 'react'
import DisplayNavbar from '../components/Navbar/DisplayNavbar'
import { FiSearch } from 'react-icons/fi'


function About() {


  return (
    <>
    <DisplayNavbar/>
            <div className="fixed inset-0 -z-10 bg-primary-base [background:radial-gradient(125%_125%_at_50%_10%,#265073_40%,#2D9596_100%)]"></div>
            <div className='flex flex-col justify-center w-7/12 h-screen mx-auto'>
            <div className='flex justify-center items-center'>
                <FiSearch className='text-white text-5xl mr-2' />
                <h1 className='text-center font-content text-white text-5xl m-3'>TražimPosao</h1>
            </div>
                <h3 className='text-center text-ju font-content text-white text-xl m-3'>U današnjem dinamičnom tržištu rada, vjerujemo da je pronalaženje pravog posla ključ uspjeha i zadovoljstva u karijeri. Zato smo stvorili TražimPosao – platformu koja koristi najnovije tehnologije i pristupe kako bi vam pružila najbolje mogućnosti za zapošljavanje.</h3>

<h4 className='text-center font-content text-white font-bold text-2xl mt-20 mb-4'>Što nas izdvaja?</h4>

<h2 className='text-justify font-content text-white text-lg m-2'>Jednostavno pretraživanje: Naša intuitivna pretraga omogućuje vam da brzo pronađete poslove koji odgovaraju vašim kriterijima.</h2>
<h2 className='text-justify font-content text-white text-lg m-2'>Personalizirani pristup: Uživajte u personaliziranim preporukama posla na temelju vaših preferencija i prethodnog iskustva.</h2>
<h3 className='text-center font-content text-white text-xl mt-32'>Hvala vam što ste odabrali TražimPosao kao vašeg partnera u traženju posla. Radujemo se što ćemo vam pomoći na putu do vaše sljedeće velike prilike!</h3>
            </div>
      
    </>
  )
}

export default About
