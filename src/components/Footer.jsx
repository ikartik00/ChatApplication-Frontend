import {
    //   Linkedin,
    //   Twitter,
    MessageCircleMore,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router";

export default function Footer() {
    const navigate = useNavigate()
    return (
        <footer className="border-t border-slate-800 bg-slate-950 text-white">

            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">

                {/* Logo */}

                <div>

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
                            <MessageCircleMore />
                        </div>

                        <h2 className="text-2xl font-bold">
                            ChatFlow
                        </h2>

                    </div>

                    <p className="mt-6 leading-7 text-slate-400">
                        Modern real-time messaging platform built
                        for fast, secure and seamless communication.
                    </p>

                    <div className="mt-8 flex gap-4">

                        {/* <Github className="cursor-pointer transition hover:text-indigo-400" /> */}

                        {/* <Linkedin className="cursor-pointer transition hover:text-indigo-400" />

            <Twitter className="cursor-pointer transition hover:text-indigo-400" /> */}

                    </div>

                </div>

                {/* Product */}

                <div>

                    <h3 className="mb-6 text-lg font-semibold">
                        Product
                    </h3>

                    <ul className="space-y-4 text-slate-400">
                        <li><a href="#features" className="hover:text-red-400 transition">
                            Features
                        </a></li>
                        <li><a href="#why-us" className="hover:text-red-400 transition">
                            About
                        </a></li>
                        <li><a href="#how-it" className="hover:text-red-400 transition">
                            How It Works
                        </a></li>
                    </ul>
                </div>

                {/* Resources */}

                <div>

                    <h3 className="mb-6 text-lg font-semibold">
                        Resources
                    </h3>

                    <ul className="space-y-4 text-slate-400">

                        <li className="cursor-pointer" onClick={()=>navigate("/privacy")}>Privacy Policy</li>
                        <li className="cursor-pointer" onClick={()=>navigate("/terms")}>Terms & Conditions</li>
                    </ul>

                </div>

            </div>

            <div className="border-t border-slate-800">

                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-slate-500 md:flex-row">

                    <p>
                        © 2026 ChatFlow. All rights reserved.
                    </p>

                    <p>
                        Built with ❤️ using React, Tailwind & Spring Boot
                    </p>

                </div>

            </div>

        </footer>
    );
}