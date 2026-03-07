import SchoolAIChatbot from './components/SchoolAIChatbot';

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-black text-gray-100 font-sans selection:bg-white/30 relative overflow-hidden flex items-center justify-center p-0 sm:p-4 md:p-8">
      {/* Morphing Background Blobs */}
      <div className="absolute top-[10%] left-[20%] w-[40rem] h-[40rem] bg-white/5 rounded-full mix-blend-screen filter blur-[100px] animate-blob pointer-events-none"></div>
      <div className="absolute top-[20%] right-[20%] w-[35rem] h-[35rem] bg-gray-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[30%] w-[45rem] h-[45rem] bg-white/5 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000 pointer-events-none"></div>
      
      <SchoolAIChatbot />
    </div>
  );
}
