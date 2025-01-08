import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { DashBoard } from './app/DashBoard';
import { ContextProvider } from './context/contextApi';
import SignUpAndLogin from './app/SignUpAndLoginPage';
import InvalidRoute from './app/404page';
import { Toaster } from 'react-hot-toast';
import LandingPage from './app/LandingPage';

function App() {
  return (
    <ContextProvider>
      <div className="bg-[#f0f2f3] min-h-screen w-screen flex flex-col">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />}/>
            <Route path="/signup" element={<SignUpAndLogin />} />
            <Route path="/login" element={<SignUpAndLogin />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/brain/share/:shareId" element={<DashBoard />} />
            <Route path="*" element={<InvalidRoute />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </ContextProvider>
  );
}

export default App;