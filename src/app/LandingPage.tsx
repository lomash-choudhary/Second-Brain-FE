import { useContext } from "react";
import { Button } from "../components/Button";
import { CreateContext } from "../context/contextApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LandingPage(){
    const {loading, setLoading}:any = useContext(CreateContext)
    const navigate = useNavigate()

    const redirectToLoginPage = () => {
        const toastId = toast.loading("Redirecting to Login Page")
        setLoading(true)
        navigate('/login')
        setLoading(false);
        toast.success("Redirected To Login Page Successfully", {id:toastId})

    }
    const redirectToSignUpPage = () => {
        const toastId = toast.loading("Redirecting to Signup Page")
        setLoading(true)
        navigate('/signup')
        setLoading(false);
        toast.success("Redirected To SignUp Page Successfully", {id:toastId})

    }

    return(
        <div>
            <Button variant="primary" text="Sign Up" isDisabled={loading ? true : false} onClick={redirectToSignUpPage}/>
            <Button variant="secondary" text="Log In" isDisabled={loading ? true : false} onClick={redirectToLoginPage}/>
        </div>
    )
}