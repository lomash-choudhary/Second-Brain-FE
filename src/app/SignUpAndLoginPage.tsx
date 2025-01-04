import { useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CreateContext } from "../context/contextApi"
import { RxCross1 } from "react-icons/rx"
import { Button } from "../components/Button"
import axios from "axios"
import toast from "react-hot-toast"

export default function SignUpAndLogin () {
    const navigate = useNavigate()
    const currentPathName = useLocation()
    const {loading, setLoading, userData, setUserData, error, setError}:any = useContext(CreateContext)

    const loginFn = async () => {
        const toastId = toast.loading("Logging In");
        try{
            setLoading(true)
            const response = await axios.post(`http://localhost:3000/api/v1/login`,{
                username:userData.username,
                password:userData.password
                }
            )
            setUserData({
                username:"",
                password:""
            })
            localStorage.setItem("userAuthToken", response.data);
            setLoading(false);
            toast.success("Logged In Successfully", {id:toastId}) 
            navigate("/dashboard")   
        }
        catch(err:any){
            setError(err.response.data)
            toast.error(err.response.data,{id:toastId})
        }
        finally{
            setLoading(false)
        }
        
    }

    const signupFn = async () => {
        const toastId = toast.loading("Signing Up");
        try{
            setLoading(true)
            await axios.post(`http://localhost:3000/api/v1/signup`,{
                username:userData.username,
                password:userData.password
                }
            )
            setUserData({
                username:"",
                password:""
            })
            setLoading(false);
            toast.success("Signed Up Successfully", {id:toastId})
            navigate('/login')   
        }
        catch(err:any){
            setError(err.response.data)
            toast.error(err.response.data,{id:toastId})
        }
        finally{
            setLoading(false)
        }
    }



    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="border-2 border-slate-200 bg-white px-4 py-2 flex flex-col gap-4 rounded-lg">
                <nav className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                        {(() => {
                            if(currentPathName.pathname === '/signup'){
                                return <p>Sign Up</p>
                            }
                            else{
                                return <p>Login</p>
                            }
                        })()}
                    </div>
                    <div className="text-2xl font-semibold hover:cursor-pointer">
                    <RxCross1 />
                    </div>
                </nav>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold">Username</label>
                    <input

                        placeholder="Enter the Username"
                        value={userData.username}
                        onChange={(e:any) => setUserData({...userData, username:e.target.value})}
                        type="text"
                        className="px-4 py-2 rounded-lg border-slate-200 border-2"
                    />
                    <label className="text-xl font-semibold">Password</label>
                    <input
                        placeholder="Enter Your Password"
                        value={userData.password}
                        onChange={(e:any) => setUserData({...userData, password:e.target.value})}
                        type="password"
                        className="px-4 py-2 rounded-lg border-slate-200 border-2"
                    />
                </div>
                <Button variant="primary" text={currentPathName.pathname === '/signup' ? "Sign Up" : "Login"} className="w-full" onClick={currentPathName.pathname === '/signup' ? signupFn:loginFn } isDisabled={loading ? true:false}></Button>
            </div>
            
        </div>
    )
}