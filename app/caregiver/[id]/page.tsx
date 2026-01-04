"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft } from "lucide-react"; // Optional: install lucide-react if not already: npm i lucide-react

interface Caregiver {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  rate: string;
  specialties: string;
  bio: string;
  photoUrl: string;
  experience?: string;
  certifications?: string;
}

export default function CaregiverProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [caregiver, setCaregiver] = useState<Caregiver | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCaregiver = async () => {
      try {
        const docSnap = await getDoc(doc(db, "caregivers", id));
        if (docSnap.exists()) {
          setCaregiver({ id: docSnap.id, ...docSnap.data() } as Caregiver);
        } else {
          alert("Caregiver not found.");
          router.push("/client/dashboard");
        }
      } catch (error) {
        console.error("Error fetching caregiver:", error);
        alert("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchCaregiver();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-xl">Loading caregiver profile...</p>
      </div>
    );
  }

  if (!caregiver) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto p-6 lg:p-12">
        {/* Back Button */}
        <button
          onClick={() => router.push("/client/dashboard")}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Caregivers
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Photo & Key Info */}
          <div className="md:col-span-1">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img
                src={caregiver.photoUrl}
                alt={caregiver.name}
                className="w-full h-96 object-cover"
              />
              <div className="p-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {caregiver.name}
                </h1>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-yellow-500 text-2xl">★ {caregiver.rating}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ({caregiver.reviews} reviews)
                  </span>
                </div>
                <p className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">
                  {caregiver.rate}
                </p>
                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-lg font-semibold rounded-xl shadow-lg transition">
                  Book {caregiver.name.split(" ")[0]} Now
                </button>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Bio */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                About Me
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {caregiver.bio}
              </p>
              {caregiver.experience && (
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  <strong>Experience:</strong> {caregiver.experience}
                </p>
              )}
              {caregiver.certifications && (
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  <strong>Certifications:</strong> {caregiver.certifications}
                </p>
              )}
            </div>

            {/* Specialties */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Specialties
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {caregiver.specialties}
              </p>
            </div>

            {/* Mock Reviews */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Reviews from Families
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-teal-500 pl-6">
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "{caregiver.name.split(" ")[0]} was a blessing during my mother's recovery. Kind, professional, and truly caring."
                  </p>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">- Sarah L.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-6">
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "Reliable and skilled. Made the transition from hospital so much easier."
                  </p>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">- Michael R.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}