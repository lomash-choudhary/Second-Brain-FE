import { useContext } from "react";
import { Button } from "../components/Button";
import { CreateContext } from "../context/contextApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaBrain } from "react-icons/fa";

export default function LandingPage() {
  const { loading, setLoading }: any = useContext(CreateContext);
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    const toastId = toast.loading("Redirecting to Login Page");
    setLoading(true);
    navigate("/login");
    setLoading(false);
    toast.success("Redirected To Login Page Successfully", { id: toastId });
  };
  const redirectToSignUpPage = () => {
    const toastId = toast.loading("Redirecting to Signup Page");
    setLoading(true);
    navigate("/signup");
    setLoading(false);
    toast.success("Redirected To SignUp Page Successfully", { id: toastId });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-indigo-600 flex items-center gap-4">
            <FaBrain className="text-3xl"/>
            <p className="text-3xl">Second Brain</p>
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-8 py-12 md:py-0">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Organize your digital{" "}
            <span className="text-indigo-600">thoughts</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg">
            Your personal knowledge hub for saving articles, images, videos, and
            notes in one place - accessible from anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              variant="primary"
              text="Sign Up"
              className="px-8 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
              isDisabled={loading ? true : false}
              onClick={redirectToSignUpPage}
            />
            <Button
              variant="secondary"
              text="Log In"
              className="px-8 py-3 text-lg font-medium rounded-lg"
              isDisabled={loading ? true : false}
              onClick={redirectToLoginPage}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://illustrations.popsy.co/purple/digital-nomad.svg"
            alt="Digital organization illustration"
            className="w-full max-w-lg"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose SecondBrain
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Save Everything
              </h3>
              <p className="text-gray-600">
                Capture articles, images, documents, videos, and links from
                anywhere on the web.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Access Anywhere
              </h3>
              <p className="text-gray-600">
                Your second brain is synced across all your devices and
                accessible anytime, anywhere.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Share & Collaborate
              </h3>
              <p className="text-gray-600">
                Share your knowledge with others and collaborate on collections
                with teammates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <p>Create with ❤️ by Lomash Choudhary</p>
          </div>

          <div className="flex gap-10">
            <a href="https://github.com/lomash-choudhary" target="__blank">
              <FaGithub className="text-2xl"/>
            </a>
            <a
              href="https://www.linkedin.com/in/lomash-choudhary/"
              target="__blank"
            >
              <FaLinkedin className="text-2xl"/>
            </a>

            <a href="https://x.com/lomashonly" target="__blank">
              <RiTwitterXFill className="text-2xl"/>
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            © 2025 SecondBrain. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
