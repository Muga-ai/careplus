"use client";

import React, { useEffect, useState } from "react";
import AuthWrapper from "@/components/AuthWrapper";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs, query, where, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  clientName: string;
  date: string;
  time: string;
  durationHours: number;
  notes: string;
}

export default function CaregiverDashboard() {
  const [firstName, setFirstName] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchingBookings, setFetchingBookings] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchName = async () => {
      try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setFirstName(docSnap.data()?.firstName || "Caregiver");
        }
      } catch (error) {
        alert("Failed to load profile. Please login again.");
        await signOut(auth);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const q = query(
          collection(db, "bookings"),
          where("caregiverId", "==", user.uid),
          where("status", "==", "pending")
        );
        const snapshot = await getDocs(q);
        const pendingBookings: Booking[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Booking));
        setBookings(pendingBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setFetchingBookings(false);
      }
    };

    fetchName();
    fetchBookings();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const updateBookingStatus = async (bookingId: string, newStatus: "confirmed" | "declined") => {
    setUpdating(true);
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status: newStatus });
      setBookings(bookings.filter((b) => b.id !== bookingId));
      alert(`Booking ${newStatus === "confirmed" ? "accepted" : "declined"}!`);
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <AuthWrapper allowedRoles={["caregiver"]}>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto p-6 lg:p-12 space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Hello, {firstName}!
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Make a difference today — manage your clients and schedule
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 sm:mt-0 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-md transition"
            >
              Logout
            </button>
          </div>

          {/* Incoming Booking Requests */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Incoming Booking Requests ({bookings.length})
            </h2>

            {fetchingBookings ? (
              <p className="text-center py-12 text-gray-600 dark:text-gray-400">Loading requests...</p>
            ) : bookings.length === 0 ? (
              <p className="text-center py-12 text-gray-600 dark:text-gray-400 bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-lg p-8">
                No pending requests at the moment. Enjoy your day!
              </p>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Request from {booking.clientName}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {booking.date} at {booking.time} • {booking.durationHours} hours
                      </p>
                      {booking.notes && (
                        <p className="text-sm italic text-gray-600 dark:text-gray-400 mt-3">
                          "{booking.notes}"
                        </p>
                      )}
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => updateBookingStatus(booking.id, "declined")}
                        disabled={updating}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-70 text-white font-medium rounded-xl transition"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking.id, "confirmed")}
                        disabled={updating}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white font-medium rounded-xl transition"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition duration-300">
              <div className="flex items-center mb-6">
                <span className="text-5xl mr-5">👥</span>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Assigned Clients
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                View families you're currently supporting and their care needs.
              </p>
              <button className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition">
                View Clients →
              </button>
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition duration-300">
              <div className="flex items-center mb-6">
                <span className="text-5xl mr-5">📅</span>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Upcoming Appointments
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Review, accept, or reschedule your scheduled visits.
              </p>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition">
                View Schedule →
              </button>
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition duration-300">
              <div className="flex items-center mb-6">
                <span className="text-5xl mr-5">🕒</span>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Update Availability
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Set your preferred hours and days to receive new bookings.
              </p>
              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition">
                Manage Availability →
              </button>
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition duration-300">
              <div className="flex items-center mb-6">
                <span className="text-5xl mr-5">👤</span>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Edit Profile
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Keep your bio, certifications, and photo up to date.
              </p>
              <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition">
                Update Profile →
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}