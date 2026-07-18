import React from "react";
import { Link } from "react-router";
import { Home, ArrowLeft, SearchX } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="h-28 w-28 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl">
            <SearchX className="h-14 w-14 text-blue-400" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="mt-8 text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-400 text-lg leading-7 max-w-xl mx-auto">
          The page you're trying to access doesn't exist, has been moved,
          or the URL might be incorrect.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30"
          >
            <Home size={20} />
            Go Home
          </Link>

          {/* <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-6 py-3 text-gray-200 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={20} />
            Go Back
          </button> */}

        </div>

        {/* Decorative Blur */}
        <div className="absolute top-20 left-20 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl -z-10"></div>

      </div>
    </div>
  );
};

export default PageNotFound;