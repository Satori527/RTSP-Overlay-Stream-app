import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

    

    
function Header() {

    //const [userData, SetuserData] = useState(null);
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)
    console.log("authStatus", authStatus);
    console.log("userData", userData);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        console.log("logout")
        navigate('/login')
    }




    return (
        <>
            <div className="head bg-sky-400 w-full h-16 flex flex-row justify-between items-center -">
                <div className="inline-block w-auto m-8 text-3xl text-white">StreamApp</div>
            
            
            <Link className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700" to="/Stream">Stream</Link>
            <Link className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700" to="/Overlay">Overlay</Link>
                {
                    (authStatus)?
                    (<div className="flex gap-4 flex-row m-8">
                    
                    <button  className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700" onClick={logoutHandler}>Logout</button>
                </div>
                ):(
                    <div className="flex gap-4 flex-row m-8">
                    <Link className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700" to="/login">Login</Link>
                    <Link className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700" to="/signup">Signup</Link>
                    
                </div>)
                }
            </div>
        </>
    )
}

export default Header