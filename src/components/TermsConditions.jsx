import { CircleChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

const TermsConditions = () => {
  const navigate = useNavigate()
  return (
    <section className=" relative min-h-screen bg-slate-950 text-white py-24">
      <div className="absolute top-8 left-8 cursor-pointer" onClick={()=>navigate("/")}><CircleChevronLeft size={50} /></div>
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold">
          Terms & Conditions
        </h1>

        <p className="mt-4 text-slate-400">
          Last Updated: July 2026
        </p>

        <div className="mt-12 space-y-10">

          <div>
            <h2 className="text-2xl font-semibold">
              Acceptance of Terms
            </h2>

            <p className="mt-3 text-slate-400 leading-8">
              By accessing and using ChatFlow, you agree to comply
              with these Terms and Conditions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              User Responsibilities
            </h2>

            <p className="mt-3 text-slate-400 leading-8">
              Users must keep their accounts secure and must not
              use the platform for illegal, abusive, or harmful
              activities.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Prohibited Activities
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-400">
              <li>Spamming other users</li>
              <li>Sharing harmful or illegal content</li>
              <li>Attempting unauthorized access</li>
              <li>Disrupting platform functionality</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Account Termination
            </h2>

            <p className="mt-3 text-slate-400 leading-8">
              ChatFlow reserves the right to suspend or terminate
              accounts that violate these terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Changes to Terms
            </h2>

            <p className="mt-3 text-slate-400 leading-8">
              We may revise these Terms from time to time.
              Continued use of the platform constitutes acceptance
              of any updates.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TermsConditions;