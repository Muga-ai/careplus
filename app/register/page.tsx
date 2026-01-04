"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { saveUserProfile } from "@/lib/firestore";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "caregiver">("client");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await saveUserProfile(uid, {
        firstName,
        lastName,
        email,
        role,
        createdAt: new Date(),
      });

      // Success – redirect based on role
      if (role === "client") {
        router.push("/client/dashboard");
      } else {
        router.push("/caregiver/dashboard");
      }
    } catch (error: any) {
      let message = "Registration failed. Please try again.";
      if (error.code === "auth/email-already-in-use") message = "This email is already registered.";
      else if (error.code === "auth/weak-password") message = "Password must be at least 6 characters.";
      else if (error.code === "auth/invalid-email") message = "Please enter a valid email address.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      {/* Left Side – Inspirational Images (Hidden on mobile) */}
      <div className="hidden md:flex relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent z-10" />
        <div className="grid grid-cols-2 gap-6 p-12 h-full">
          <div className="rounded-xl bg-gradient-to-br from-blue-200 to-indigo-200" />
          <div className="rounded-xl bg-gradient-to-br from-teal-200 to-green-200" />
          <div className="rounded-xl bg-gradient-to-br from-pink-200 to-yellow-200" />
          <div className="rounded-xl bg-gradient-to-br from-gray-200 to-gray-400" />
        </div>
      </div>

      {/* Right Side – Registration Form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Welcome to CarePlus
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Seamless, compassionate care starts here
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition"
                />
              </div>

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
                placeholder="Password (6+ characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition"
              />

              {/* Role Selection – Beautiful Cards */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">I'm registering as:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <label
                    className={`relative flex flex-col items-center p-8 rounded-2xl border-4 cursor-pointer transition-all ${
                      role === "client"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-xl"
                        : "border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="client"
                      checked={role === "client"}
                      onChange={() => setRole("client")}
                      className="sr-only"
                    />
                    <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">Family / Client</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Need care for a loved one</div>
                  </label>

                  <label
                    className={`relative flex flex-col items-center p-8 rounded-2xl border-4 cursor-pointer transition-all ${
                      role === "caregiver"
                        ? "border-teal-500 bg-teal-50 dark:bg-teal-900/30 shadow-xl"
                        : "border-gray-300 dark:border-gray-600 hover:border-teal-300 dark:hover:border-teal-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="caregiver"
                      checked={role === "caregiver"}
                      onChange={() => setRole("caregiver")}
                      className="sr-only"
                    />
                    <div className="text-5xl mb-4">🩺</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">Caregiver</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Professional provider</div>
                  </label>
                </div>
              </div>

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
                    Creating Account...
                  </>
                ) : (
                  "Create My Account"
                )}
              </button>
            </form>

            <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Sign in →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}