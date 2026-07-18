import { CircleChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

const PrivacyPolicy = () => {
   const navigate = useNavigate()
  return (
    <section className="min-h-screen relative bg-slate-950 text-white py-24">
       <div className="absolute top-8 left-8 cursor-pointer" onClick={()=>navigate("/")}><CircleChevronLeft size={50} /></div>
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-5xl font-bold">
          Privacy Policy
        </h1>

        <p className="mt-4 text-slate-400">
          Last Updated: July 2026
        </p>

        <div className="mt-12 space-y-10">

          <div>
            <h2 className="text-2xl font-semibold">
              Information We Collect
            </h2>

            <p className="mt-3 text-slate-400 leading-8">
              ChatFlow collects basic account information such as your
              name, email address, and profile details when you create
              an account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              How We Use Your Information
            </h2>

            <p className="mt-3 text-slate-400 leading-8">
              Your information is used to provide authentication,
              maintain your account, enable messaging, and improve
              the overall experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Data Security
            </h2>

            <p className="mt-3 text-slate-400 leading-8">
              We take reasonable measures to protect your personal
              information using modern authentication and secure
              communication protocols.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Third-Party Services
            </h2>

            <p className="mt-3 text-slate-400 leading-8">
              ChatFlow may use trusted third-party services for hosting,
              analytics, authentication, and email delivery.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Changes to This Policy
            </h2>

            <p className="mt-3 text-slate-400 leading-8">
              We may update this Privacy Policy from time to time.
              Continued use of the platform indicates acceptance
              of any changes.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PrivacyPolicy;