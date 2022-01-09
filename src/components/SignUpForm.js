import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function SignupForm() {

    const navigate=useNavigate();
    const [credentials, setCredentials] = useState({ name: "", username: "", email: "", password: "" })

    if(localStorage.getItem('auth_token')){return navigate('/')}

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }

    const onSubmitSignUp = async (e) => {
        e.preventDefault();
        //veryfying input
        if(credentials.name.length<5){ return toast.warn("Name should be at least 5 character long", { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }
        
        if(credentials.username.length<5){ return toast.warn("Username should be at least 5 character long", { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }
        
        if(credentials.password.length<5){ return toast.warn("Password should be at least 5 character long", { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }
        
        //api call
        
        const response = await fetch('https://notes-on-the-go-api.herokuapp.com/api/auth/createuser', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": credentials.name,
                "username": credentials.username,
                "email": credentials.email,
                "password": credentials.password
            }) // body data type must match "Content-Type" header
        });
        
        const json = await response.json(); //json return success on 
        
        //handling errors from api
        if (json.message==="This email already signed up please log in") { toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }
        
        else if (json.message==="This username is already in use please use another") { toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }
        
        else if (json.message==="Internal Server Error") { toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }
        
        //if success = true
        else if(json.success) {
            toast.success("Signed Up Successfully", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });
            localStorage.setItem('auth_token', json.authToken);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
        
    }

    return (
        <div className=' p-8 rounded-lg border-2 border-gray-300 w-11/12  mx-auto my-16'>
            <h1 className='text-xl mb-7 justify-center flex items-center font-bold'>Create Your Account</h1>
            <form onSubmit={onSubmitSignUp} className=''>

                <label className='text-gray-500 pb-2 flex '  htmlFor="Name">Enter Name</label>

                <input type="text" required={true} id='name' value={credentials.name} onChange={onChange} className="w-full mb-3 p-2 border-2 rounded-lg border-gray-400 outline-none focus:border-yellow-500" placeholder='Please enter your Name' />

                <label className='text-gray-500 pb-2 flex ' htmlFor="username">Enter Username</label>

                <input type="text" required={true} id='username' value={credentials.username} onChange={onChange} className="w-full mb-3 p-2 border-2 rounded-lg border-gray-400 outline-none focus:border-yellow-500" placeholder='Please enter your username' />

                <label className='text-gray-500 pb-2 flex ' htmlFor="signUpEmail">Enter Email</label>

                <input type="email" required={true} id="email" value={credentials.email} onChange={onChange} className="w-full mb-3 p-2 border-2 rounded-lg border-gray-400 outline-none focus:border-yellow-500" placeholder='Please enter your Email' />

                <label className='text-gray-500 pb-2 flex ' htmlFor="password">Enter Password</label>

                <input type="password"  required={true} id="password" value={credentials.password} onChange={onChange} className="w-full mb-3 p-2 border-2 rounded-lg border-gray-400 outline-none focus:border-yellow-500" placeholder='Please enter your password' />
                <button type="submit" className='m-auto flex bg-yellow-500 px-5 py-2 rounded-xl shadow-md font-bold hover:text-neutral-100'>Submit</button>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default SignupForm
