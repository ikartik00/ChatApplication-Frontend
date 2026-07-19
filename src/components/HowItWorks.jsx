import { UserPlus, MessagesSquare, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    desc: "Register in just a few seconds and verify your email.",
  },
  {
    icon: MessagesSquare,
    title: "Start Chatting",
    desc: "Create or join chat rooms and invite your friends.",
  },
  {
    icon: Rocket,
    title: "Stay Connected",
    desc: "Share messages, files and media in real time.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-950 py-28 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <span className="text-indigo-400">HOW IT WORKS</span>

          <h2 className="text-5xl font-bold mt-4">
            Start Chatting In Minutes
          </h2>

          <p className="text-slate-400 mt-5">
            Three simple steps to connect with everyone.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 mt-20">

          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <div
                key={i}
                className="relative rounded-3xl border border-slate-800 bg-slate-900 p-10 hover:border-indigo-500 transition"
              >
                <div className="absolute -top-6 left-10 h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold">
                  {i + 1}
                </div>

                <div className="h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center mt-8">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-semibold mt-8">
                  {step.title}
                </h3>

                <p className="text-slate-400 mt-4">
                  {step.desc}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}