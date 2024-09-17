import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const Home = () => {

    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status)
    useEffect(() => {
        if(authStatus){
            console.log("Not logged in")
            navigate("/overlay")
        }
    }), [authStatus]

    return (
        <>
            <h1 className="text-teal-400">To Use the App Please Login or Signup</h1>
        </>
    )
}

export default Home;