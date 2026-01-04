"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) throw new Error("User profile not found");

      const role = userDoc.data()?.role;
      if (role === "client") router.push("/client/dashboard");
      else if (role === "caregiver") router.push("/caregiver/dashboard");
      else throw new Error("Invalid role");
    } catch (error: any) {
      let message = "Login failed. Please check your credentials.";
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        message = "Invalid email or password.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Left Side – Inspirational Images */}
      <div className="hidden md:flex relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent z-10" />
        <div className="grid grid-cols-2 gap-6 p-12 h-full">
          {/* Same images as register for consistency */}
          <img src="https://media.istockphoto.com/id/1719538017/photo/home-care-healthcare-professional-hugging-senior-patient.jpg?s=612x612&w=0&k=20&c=DTQwVD1DTH0CMQ78aox8-cVKg8Nl-wCkSwY-S072M4E=" alt="Warm caregiver embrace" className="rounded-2xl object-cover shadow-2xl" />
          <img src="https://www.shutterstock.com/image-photo/senior-happy-women-portrait-nurse-600nw-2638385651.jpg" alt="Smiling senior and caregiver" className="rounded-2xl object-cover shadow-2xl mt-32" />
          <img src="https://www.shutterstock.com/image-photo/help-support-wheelchair-nurse-old-260nw-2267075473.jpg" alt="Nurse assisting patient" className="rounded-2xl object-cover shadow-2xl -mt-32" />
          <img src="https://westcoastuniversity.edu/wp-content/uploads/2022/11/WCU-Blog-Image_-Jobstacles-Communicating-with-Patients-Families-v2.jpg" alt="Family and nurse discussion" className="rounded-2xl object-cover shadow-2xl" />
        </div>
      </div>

      {/* Right Side – Login Form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Sign in to continue providing or receiving care
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 disabled:opacity-60 text-white text-lg font-semibold rounded-xl shadow-xl transition flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a href="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Create one →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}