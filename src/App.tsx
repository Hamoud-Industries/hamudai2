import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SchoolAIChatbot from './components/SchoolAIChatbot';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Imprint from './pages/Imprint';
import Terms from './pages/Terms';
import CookieConsent from './components/CookieConsent';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-[100dvh] w-full bg-black text-gray-100 font-sans selection:bg-white/30 relative flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
        {/* Morphing Background Blobs */}
        <div className="fixed top-[10%] left-[20%] w-[40rem] h-[40rem] bg-white/5 rounded-full mix-blend-screen filter blur-[100px] animate-blob pointer-events-none z-0"></div>
        <div className="fixed top-[20%] right-[20%] w-[35rem] h-[35rem] bg-gray-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none z-0"></div>
        <div className="fixed bottom-[10%] left-[30%] w-[45rem] h-[45rem] bg-white/5 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000 pointer-events-none z-0"></div>
        
        <Routes>
          {/* Chat Route (No Navbar, full screen) */}
          <Route path="/chat" element={
            <div className="flex-1 h-full w-full p-0 sm:p-4 md:p-8 flex items-center justify-center overflow-hidden relative z-10">
              <SchoolAIChatbot />
            </div>
          } />
          
          {/* Other Routes (With Navbar, scrollable) */}
          <Route path="*" element={
            <>
              <Navbar />
              <main className="flex-1 relative z-10 flex flex-col pt-24">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/imprint" element={<Imprint />} />
                  <Route path="/terms" element={<Terms />} />
                </Routes>
              </main>
              <CookieConsent />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
