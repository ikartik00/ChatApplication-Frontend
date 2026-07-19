import { MessageCircleMore, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600">
            <MessageCircleMore size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              ChatFlow
            </h1>

            <p className="text-xs text-slate-400">
              Connect Instantly
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-10 text-slate-300 md:flex">
          <a href="#" className="transition hover:text-white">
            Home
          </a>

          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a href="#why-us" className="transition hover:text-white">
            Why-Us
          </a>

          <a href="#how-it" className="transition hover:text-white">
            How-it-works
          </a>
        </nav>

        {/* Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <button className="rounded-lg px-5 py-2 text-slate-300 transition hover:text-white cursor-pointer" onClick={()=>navigate("/login")}>
            Login
          </button>

          <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500" onClick={()=>navigate("/register")}>
            Get Started
          </button>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <div className="flex flex-col gap-5 p-6 text-slate-300">
            <a href="#home" onClick={()=>setOpen(false)}>Home</a>
            <a href="#features" onClick={()=>setOpen(false)}>features</a>
            <a href="#why-us" onClick={()=>setOpen(false)}>Why Chooose Us</a>
            <a href="#how-it-works" onClick={()=>setOpen(false)}>How it Works</a>

            <button className="rounded-lg border border-slate-700 py-3" onClick={()=>navigate("/login")}>
              Login
            </button>

            <button className="rounded-lg bg-indigo-600 py-3 text-white" onClick={()=>navigate("/register")}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;