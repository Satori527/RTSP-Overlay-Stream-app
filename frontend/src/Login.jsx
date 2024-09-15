import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
const Login = () => {
    const authstatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();

    // if(authstatus){
    //     navigate("/profile")
    // }
    return (
        <div className=' p-8 border-2  shadow-lg shadow-slate-300 border-gray-200 border-solid w-96 rounded-md'>
        <LoginForm />
        </div>
    )
}

export default Login;