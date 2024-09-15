import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosAPI } from '../api/axiosAPI';
import { login as authLogin } from '../store/authSlice';
import './SignupForm.css';

function LoginForm() {
    const authstatus = useSelector((state) => state.auth.status)
    const {register, handleSubmit} = useForm()
    const [userData, setUserData] = useState({})
    const dispatch = useDispatch()
    const [error, setError] = useState({})
    const navigate = useNavigate()
    let msgColor = "text-red-600";

    useEffect(() => {
        if(authstatus){
            navigate("/profile")
        }
    }, [authstatus])


    console.log(error);
    const loginUser = async(data) => {
        
        try{
            const response = await axiosAPI.post('/users/login', data)
            console.log(response.data);
            setUserData(response.data);
            if(response.data.data) dispatch(authLogin(response.data.data));
            
            
            
        }catch(err){
            console.log(err.response.data);
            setError(err.response.data)
        }
    }
    const loginMsg = ()=>{
        if(userData.message){
            msgColor="text-teal-500";
            return "LoggedIn Successfully"
        }
        else if(error.success === false){
            msgColor="text-red-600";
            return "Invalid Credentials"
        }
    }

    useEffect(() => {
        loginMsg()
        
    }, [userData, error])


    return (
        <>
            <h1 className="text-teal-500 font-bold ">Login</h1>
            
            {loginMsg() && <p className={`text-lg font-bold ${msgColor}`}>{loginMsg()}</p>}
            
            <div className="py-8 ">
            <form  className="flex flex-col gap-3" onSubmit={handleSubmit(loginUser)}>
                <div className="flex flex-col">
                    <label className="text-gray-500 font-medium text-left"
                    htmlFor="email">Email
                    </label>
                    <input className= 'p-2 rounded-sm border-gray-300 border-solid border text-base hover:bg-teal-50 focus:bg-teal-50 outline-gray-300'
                        {...register('email')}
                        type="email"  />
                    
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-500 font-medium text-left"
                    htmlFor="password">Password
                    </label>
                    <input className= 'p-2 rounded-sm border-gray-300 border-solid border text-base hover:bg-teal-50 focus:bg-teal-50 outline-gray-300'
                        {...register('password')}
                        type="password"  />
                    
                </div>
                <input className="p-3 rounded text-white font-medium text-xl bg-teal-400 drop-shadow-md my-4 hover:bg-teal-500 focus:bg-teal-600 "

                    type="submit"
                    value="Login" />
            </form>
            </div>
            
        </>
    )
}

export { LoginForm };

