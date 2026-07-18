import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function CTA() {
    const navigate = useNavigate()
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28">

      <div className="absolute left-1/2 top-1/2 h-125 w-125-translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[160px]" />

      <div className="relative mx-auto max-w-6xl px-6">

        <div className="rounded-[40px] border border-slate-800 bg-linear-to-r from-indigo-600 via-indigo-500 to-purple-600 py-16 md:px-16 px-10 text-center shadow-2xl">

          <span className="rounded-full bg-white/20 px-2 py-2 text-sm text-white">
            🚀 Join ChatFlow Today
          </span>

          <h2 className="mt-8 sm:text-5xl text-2xl font-bold text-white">
            Ready To Start
            <br />
            Your Conversations?
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-indigo-100">
            Create your free account and experience fast,
            secure and beautiful real-time messaging.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <button className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:scale-105" onClick={()=>navigate("/register")}>
              Get Started
              <ArrowRight size={20} />
            </button>

            <button className="rounded-xl border border-white/30 px-8 py-4 text-white transition hover:bg-white/10">
              Learn More
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}