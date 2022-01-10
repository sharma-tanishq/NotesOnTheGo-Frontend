import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" })
    
    useEffect(() => {
        if (localStorage.getItem('auth_token')) navigate('/login');
    })
    const onSubmitLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('https://notes-on-the-go-api.herokuapp.com/api/auth/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": credentials.username,
                "email": credentials.email.toLowerCase(),
                "password": credentials.password
            }) // body data type must match "Content-Type" header
        });
        const json = await response.json(); //json return success on 
        if (!json.success) { toast.warn("Please enter correct email , username and password", { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }
        else if(json.success) {
            toast.success("Logged In Successfully", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });
            localStorage.setItem('auth_token', json.authToken);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }

    return (
        <>
            {/* <div>
                <Alert/>
            </div> */}
            <div className=' p-8 rounded-xl w-11/12 shadow-md mx-auto my-16'>
                <h1 className='text-xl mb-7 justify-center flex items-center font-bold'>LogIn into your Account</h1>
                <form onSubmit={onSubmitLogin} className=''>

                    <label className='text-gray-500 pb-2 flex ' htmlFor="username">Enter Username</label>

                    <input type="text" required={true} id='username' value={credentials.username} onChange={onChange} className="w-full mb-3 p-2 border-2 rounded-lg border-gray-400 outline-none focus:border-yellow-500" placeholder='Please enter your username' />

                    <label className='text-gray-500 pb-2 flex ' htmlFor="signUpEmail">Enter Email</label>

                    <input type="email" required={true} id="email" value={credentials.email} onChange={onChange} className="w-full mb-3 p-2 border-2 rounded-lg border-gray-400 outline-none focus:border-yellow-500" placeholder='Please enter your Email' />

                    <label className='text-gray-500 pb-2 flex ' htmlFor="password">Enter Password</label>

                    <input type="password" required={true} id="password" value={credentials.password} onChange={onChange} className="w-full mb-3 p-2 border-2 rounded-lg border-gray-400 outline-none focus:border-yellow-500" placeholder='Please enter your password' />
                    <button type="submit" className='m-auto flex bg-yellow-500 px-5 py-2 rounded-xl shadow-md font-bold hover:text-neutral-100'>Submit</button>
                </form>
                <h1 className='text-xl mt-7 mb-7 justify-center flex items-center font-bold'>New to NewsOnTheGo create a account</h1>
                <button onClick={()=>navigate("/signup")} className='m-auto flex bg-yellow-500 px-5 py-2 rounded-xl shadow-md font-bold hover:text-neutral-100'>SignUp</button>
            </div>
            <ToastContainer />
        </>
    )
}

export default LoginForm
