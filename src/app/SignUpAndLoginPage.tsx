import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateContext } from "../context/contextApi";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../components/Button";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpAndLogin() {
  const navigate = useNavigate();
  const currentPathName = useLocation();
  const { loading, setLoading, userData, setUserData, setError }: any =
    useContext(CreateContext);

  const loginFn = async () => {
    const toastId = toast.loading("Logging In");
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/login`, {
        username: userData.username,
        password: userData.password,
      });
      setUserData({
        username: "",
        password: "",
      });
      localStorage.setItem("userAuthToken", response.data);
      setLoading(false);
      toast.success("Logged In Successfully", { id: toastId });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response.data);
      toast.error(err.response.data, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const signupFn = async () => {
    const toastId = toast.loading("Signing Up");
    try {
      setLoading(true);
      await axios.post(`http://localhost:3000/api/v1/signup`, {
        username: userData.username,
        password: userData.password,
      });
      setUserData({
        username: "",
        password: "",
      });
      setLoading(false);
      toast.success("Signed Up Successfully", { id: toastId });
      navigate("/login");
    } catch (err: any) {
      setError(err.response.data);
      toast.error(err.response.data, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md border border-gray-200 bg-white px-8 py-6 flex flex-col gap-6 rounded-xl shadow-lg">
        <nav className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="text-2xl font-bold text-gray-800">
            {(() => {
              if (currentPathName.pathname === "/signup") {
                return <p>Create Account</p>;
              } else {
                return <p>Welcome Back</p>;
              }
            })()}
          </div>
          <div className="text-xl text-gray-500 hover:text-gray-700 hover:cursor-pointer transition-colors">
            <RxCross1 />
          </div>
        </nav>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <input
                placeholder="Enter your username"
                value={userData.username}
                onChange={(e: any) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-800 bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                placeholder="Enter your password"
                value={userData.password}
                onChange={(e: any) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-800 bg-white"
              />
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          text={
            currentPathName.pathname === "/signup" ? "Create Account" : "Login"
          }
          className="w-full py-3 rounded-lg font-medium text-base shadow-sm"
          onClick={currentPathName.pathname === "/signup" ? signupFn : loginFn}
          isDisabled={loading ? true : false}
        />

        <div className="text-center text-sm text-gray-600">
          {currentPathName.pathname === "/signup" ? (
            <p>
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Login
              </a>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
