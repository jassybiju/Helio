import ClayButton from "@/src/components/ui/ClayButton";
import ClayWrapper from "@/src/components/ui/ClayWrapper";
import { Calendar, Lock, Pill } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-slate-50 px-4 py-10 md:py-22">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              NEW: 24/7 SPECIALIST SUPPORT
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Healthcare,
              <br />
              <span className="text-blue-600">Anytime,</span>
              <br />
              Anywhere
            </h1>
            <p className="text-xl text-slate-600">
              Experience high-quality telemedicine with soft, secure, and
              reliable care from the comfort of your home. Connect with top
              specialists in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/patient/doctors">
                <ClayButton variant="primary" size="lg">
                  Find a Doctor
                </ClayButton>
              </Link>
              <Link href="/patient/dashboard">
                <ClayButton variant="secondary" size="lg">
                  Go to Dashboard
                </ClayButton>
              </Link>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold text-sm"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-600">
                Trusted by <strong>10,000+</strong> active patients
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className=" rounded-2xl h-96 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  alt="Doctor With Lap"
                  src={"/DoctorWithLap.png"}
                  fill
                  objectFit="contain"
                ></Image>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">
              Built for Patient Comfort
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to manage your health securely and efficiently
              from any device.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="w-6 h-6 text-blue-600" />,
                title: "Easy Booking",
                desc: "Schedule appointments seamlessly with our intuitive, 2-click interface.",
              },
              {
                icon: <Lock className="w-6 h-6 text-blue-600" />,
                title: "Secure Video",
                desc: "HIPAA compliant encrypted video calls with top-tier security.",
              },
              {
                icon: <Pill className="w-6 h-6 text-blue-600" />,
                title: "Digital Prescriptions",
                desc: "Receive and manage your prescriptions directly in app, sent to pharmacy.",
              },
            ].map((feature, i) => (
              <ClayWrapper
                variant="secondary"
                key={i}
                className="p-8 space-y-4"
                noPadding
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.desc}</p>
              </ClayWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">How It Works</h2>
            <p className="text-lg text-slate-600">
              Get from sign-up to a healthier you in five simple, soft-guided
              steps.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              "Sign Up",
              "Find Doctor",
              "Book Session",
              "Follow-up",
              "Review",
            ].map((step, i) => (
              <div key={i} className="text-center space-y-4">
                <ClayWrapper className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">
                  {i + 1}
                </ClayWrapper>
                <h3 className="font-semibold text-slate-900">{step}</h3>
                <p className="text-sm text-slate-600">
                  Create account in under 2 minutes
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">
              What Our Patients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Emily Johnson",
                text: "The overall experience was great and such. Booking my first consultation was super easy and the doctor was wonderful.",
              },
              {
                name: "Mark Thompson",
                text: "This is a great app. Stitch Health has been a lifesaver. High-quality specialists are now a tap away.",
              },
              {
                name: "Linda Wu",
                text: "Smooth registration experience. My meds were picked up at the pharmacy before I even finished my call.",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-8 space-y-4 border border-slate-200"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-slate-600">{testimonial.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full" />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-500">Verified Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">
              Got Questions?
            </h2>
            <p className="text-lg text-slate-600">
              We&apos;re here to help you navigate your journey to better health
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Is my health data secure?",
              "How quickly can I see a doctor?",
              "Do you accept my insurance?",
            ].map((q, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-slate-200 p-6 flex items-center justify-between hover:border-blue-300 transition-colors cursor-pointer group"
              >
                <p className="font-semibold text-slate-900">{q}</p>
                <div className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform">
                  +
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 text-center space-y-4 border border-slate-200">
            <p className="text-slate-600">Still need help?</p>
            <ClayButton variant="primary">Start Live Chat</ClayButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <p className="font-bold">STITCH HEALTH</p>
            <p className="text-sm text-slate-400">
              Modern healthcare for the digital age. Patient care, redesigned
              with empathy and technology.
            </p>
          </div>
          {["SERVICES", "SUPPORT", "CONNECT"].map((section) => (
            <div key={section} className="space-y-2">
              <p className="font-semibold text-sm uppercase tracking-wide">
                {section}
              </p>
              <ul className="text-sm text-slate-400 space-y-2">
                {section === "SERVICES" && (
                  <>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Telemedicine
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Specialists
                      </a>
                    </li>
                  </>
                )}
                {section === "SUPPORT" && (
                  <>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Contact Us
                      </a>
                    </li>
                  </>
                )}
                {section === "CONNECT" && (
                  <>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Email
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>
            © 2024 Stitch Health Inc. All rights reserved. Made for the future
            of care.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default page;
