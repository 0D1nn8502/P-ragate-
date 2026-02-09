"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Header from "@/components/Header";
import { signupWithEmail } from "@/lib/api/auth";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
  // Entrance animation for the form
  const ctx = gsap.context(() => {
    if (formRef.current) {
      gsap.from(formRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      const staggerElements = formRef.current.querySelectorAll(".stagger");
      if (staggerElements.length > 0) {
        gsap.from(staggerElements, {
          y: 8,
          opacity: 0,
          duration: 0.45,
          stagger: 0.08,
          delay: 0.12,
          ease: "power2.out",
        });
      }
    }
  }, formRef);
    return () => ctx.revert();
  }, []);

  const validateEmail = (value: string) => {
    // simple email regex (sufficient for basic validation)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      // shake animation on invalid
      gsap.fromTo(
        inputRef.current,
        { x: -8 },
        { 
          x: 8, 
          duration: 0.06, 
          repeat: 5, 
          yoyo: true, 
          onComplete: () => {
            gsap.to(inputRef.current, { x: 0 });
          }
        }
      );
      return;
    }

    setLoading(true);
    

    try {
      const res = await signupWithEmail(email);  

      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        // subtle error pulse on button
        gsap.fromTo(
          submitBtnRef.current,
          { scale: 1 },
          { 
            scale: 0.98, 
            duration: 0.08, 
            yoyo: true, 
            repeat: 3 
          }
        );
      } else {
        setMessage("Verification email sent — check your inbox!");
        setEmail("");
        // success pop animation
        gsap.fromTo(
          formRef.current,
          { scale: 0.995 },
          { 
            scale: 1, 
            duration: 0.2, 
            ease: "elastic.out(1, 0.6)" 
          }
        );
      }
    } catch (err) {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-zinc-900 text-gray-100 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-6">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white/5 border border-white/6 rounded-2xl p-8 shadow-lg backdrop-blur-sm"
          aria-labelledby="connect-heading"
        >
          <h2 id="connect-heading" className="text-2xl font-semibold mb-4 stagger">
            Get a verification link
          </h2>

          <p className="text-sm text-gray-300 mb-6 stagger">
            Enter your email and we'll send you a verification link to join.
          </p>

          <div className="relative mb-4 stagger">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>

            <input
              ref={inputRef}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              aria-invalid={!!error}
              aria-describedby={error ? "email-error" : message ? "email-success" : undefined}
              className="w-full rounded-xl border border-white/8 bg-white/3 px-4 py-3 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              required
            />

            {/* floating validation icon */}
            <div className="absolute right-3 top-3">
              {validateEmail(email) ? (
                <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3 stagger">
            <button
              ref={submitBtnRef}
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl px-5 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <span className="mr-2">{loading ? "Sending..." : "Send link"}</span>

              {loading ? (
                <img
                  src="/loading.svg"
                  alt="Loading"
                  className="w-6 h-6 spin-slow"
                />
              ) : (

              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 2L11 13" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              )} 

            </button>

            <button
              type="button"
              onClick={() => setEmail("")}
              className="px-3 py-2 rounded-xl border border-white/8 text-sm hover:bg-white/3 transition"
            >
              Clear
            </button>
          </div>

          <div className="mt-4">
            {error ? (
              <p id="email-error" className="text-sm text-red-400">
                {error}
              </p>
            ) : null}

            {message ? (
              <p id="email-success" className="text-sm text-green-300">
                {message}
              </p>
            ) : null}
          </div>

          <div className="mt-6 text-xs text-gray-400">
            By continuing you agree to our terms and may receive informational emails. You can unsubscribe at any time.
          </div>
        </form>
      </main>
    </div>
  );
}
