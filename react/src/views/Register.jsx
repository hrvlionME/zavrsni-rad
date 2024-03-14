import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        description: '',
        tags: '',
      });
    const { setUser, setToken } = useStateContext();
    const [progress, setProgress] = useState(0)
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const nextStep = (ev) => {
        ev.preventDefault()
        if(progress == 66){
        setProgress(progress => progress + 34);
        submitForm();
        }else
        setProgress(progress => progress + 33);
        }

    const roleClicked = (ev, role) => {
        ev.preventDefault();
        setFormData({ ...formData, role: role})
        setProgress(progress => progress + 33);
    }

    const prevStep = (ev) => {
        ev.preventDefault();
        if(progress == 100)
            setProgress(progress => progress - 34);
        else
            setProgress(progress => progress - 33);
    }

    const submitForm = async () => {
        setLoading(true);
        await axiosClient
            .post("/signup", formData)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
       
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
        });
        setLoading(false);
    
    }

  return (
    <>
    <Navbar/>
    <div className="absolute inset-0 -z-10 h-full w-full bg-primary-base [background:radial-gradient(125%_125%_at_50%_10%,#265073_40%,#2D9596_100%)] overflow-y-scroll no-scrollbar">
            <div className='flex flex-col justify-center w-full h-screen'>
            <div className="relative w-40 h-40 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                className="text-gray-200 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                ></circle>
                <circle
                className="text-secondary-base  progress-ring__circle stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDashoffset={`calc(400 - ${progress * 2.5})`}
                ></circle>
                <text fill='#fff' x="50" y="50" textAnchor="middle" fontFamily='Verdana' alignmentBaseline="middle">{progress}%</text>

            </svg>
            </div>
            {progress == 0 ?
            <div className='flex flex-col justify-center'>
                <h1 className="text-white font-open text-5xl mx-auto my-5">Prvo unesite neke Vaše osnovne podatke</h1>
                <input className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" placeholder='Ime i prezime' />
                <input className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="text" placeholder='Email' />
                <input className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" placeholder='Lozinka' />
                <input className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md" value={formData.password_confirmation} onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} type="password" placeholder='Potvrda lozinke' />
            </div> 
            : progress == 33 ? 
            <div className="flex justify-center flex-col">
                        <h1 className="text-white font-open text-5xl mx-auto my-5">Ja sam...</h1>
            <div className='flex justify-center'>
                
                <div className="w-1/3 m-10 relative cursor-pointer shadow-lg" onClick={(ev) => roleClicked(ev, 'poslodavac')}>
                <img className="opacity-40" src="https://plus.unsplash.com/premium_photo-1683140722537-0eb6f05b57d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <div className="absolute bottom-0 px-4 py-3 bg-primary-shadow/50 w-full flex justify-center">
                        <h1 className="text-white font-open text-4xl"> POSLODAVAC </h1>
                    </div>
                </div>
                <div className="w-1/3 m-10 relative cursor-pointer shadow-lg" onClick={(ev) => roleClicked(ev, 'radnik')}>
                <img className="opacity-40" src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <div className="absolute bottom-0 px-4 py-3 bg-secondary-base/50 w-full flex justify-center">
                        <h1 className="text-white font-open text-4xl"> RADNIK </h1>
                    </div>
            </div>
            </div>
            </div>
            : progress == 66 ? <div>{
            loading ? <ReactLoading className='mx-auto my-5' type='spin'/> :
            <div className='flex flex-col justify-center'>
                <h1 className="text-white font-open text-5xl mx-auto my-5">Napravite profil</h1>
                <input className="font-open text-1xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md"type="text" placeholder='Unesite vaše vještine odvojene razmakom npr: vozač kuhar nastavnik'  value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })}/>
                <textarea className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md"type="text" placeholder='Recite nešto više o sebi' rows={6}  value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <div className="flex justify-center w-full items-center mb-4">
                    <label className="block text-center font-open text-2xl text-white px-4 py-2 bg-secondary-base hover:bg-secondary-shadow rounded-lg cursor-pointer shadow-md hover:bg-primary-shade -200">
                    Kliknite ovdje da postavite sliku vašeg profila
                    <input type="file" className="hidden" />
                    </label>
                </div>
            </div>}</div> : <h1 className="text-white font-open text-5xl mx-auto my-5">Registrirali ste se</h1>}
            <div className="flex justify-center">
                {progress == 0 ?  <div></div> : progress == 100 ? <Link to="/" className="text-gray-100 font-open text-center text-2xl bg-secondary-base  hover:text-white px-3 py-2 w-1/5 rounded-md font-medium">DALJE</Link> :
                <div className="bg-secondary-base hover:bg-secondary-shadow rounded-full p-4 mx-56 cursor-pointer shadow-md" onClick={prevStep}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
                }
                {progress == 33 || progress == 100 ? <div></div> :
                <div className="bg-secondary-base hover:bg-secondary-shadow rounded-full p-4 mx-56 cursor-pointer shadow-md" onClick={nextStep}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}  stroke="#fff" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </div>
                }
            </div>

            </div>
        </div>
    </>
  )
}

export default Register
