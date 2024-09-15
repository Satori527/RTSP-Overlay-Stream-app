import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { axiosAPI } from '../api/axiosAPI';
import './SignupForm.css';

function SignupForm() {
    const {register, handleSubmit} = useForm()
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()

    const createUser = async(data) => {

        
        
        try{
            const response = await axiosAPI.post('/users/register', data)
            console.log(response.data);
            setUserData(response.data);
            
            navigate('/login')
            
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <h1 className="text-teal-500 font-bold ">SignUp Form</h1>
            
            {userData && <p className=" text-lg text-teal-500 font-bold ">{userData.message}</p>}
            <div className="py-8 ">
            <form  className="flex flex-col gap-3" onSubmit={handleSubmit(createUser)}>
                <div className="flex flex-col">
                    <label className="text-gray-500 font-medium text-left"
                        htmlFor="name">Username
                    </label>
                    <input className= 'p-2 rounded-sm border-gray-300 border-solid border text-base hover:bg-teal-50 focus:bg-teal-50 outline-gray-300'
                        {...register('name')}
                        type="text" />
                    
                </div>
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
                    value="Submit" />
            </form>
            </div>
            
        </>
    )
}

export { SignupForm };

