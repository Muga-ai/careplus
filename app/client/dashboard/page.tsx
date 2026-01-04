"use client";

import React, { useEffect, useState } from "react";
import AuthWrapper from "@/components/AuthWrapper";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

interface Caregiver {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  rate: string;
  specialties: string;
  bio: string;
  photoUrl: string;
}

interface Appointment {
  id: string;
  caregiverName: string;
  caregiverPhoto: string;
  date: string;
  time: string;
  durationHours: number;
  notes: string;
  status: "pending" | "confirmed" | "declined";
}

export default function ClientDashboard() {
  const [firstName, setFirstName] = useState<string>("");
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchingCaregivers, setFetchingCaregivers] = useState<boolean>(true);
  const [fetchingAppointments, setFetchingAppointments] = useState<boolean>(true);
  const router = useRouter();

  // Booking Modal State
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("4");
  const [notes, setNotes] = useState<string>("");
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchUserName = async () => {
      try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setFirstName(docSnap.data()?.firstName || "Client");
        }
      } catch (error) {
        alert("Failed to load profile.");
        await signOut(auth);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    const fetchCaregivers = async () => {
      try {
        const q = query(collection(db, "caregivers"), where("available", "==", true));
        const querySnapshot = await getDocs(q);
        const realCaregivers: Caregiver[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          realCaregivers.push({
            id: doc.id,
            name: data.name || "Caregiver",
            rating: data.rating || 5.0,
            reviews: data.reviews || 0,
            rate: data.rate || "$35/hr",
            specialties: data.specialties || "General care",
            bio: data.bio || "Dedicated professional.",
            photoUrl: data.photoUrl || "https://via.placeholder.com/400x400?text=Caregiver",
          });
        });
        setCaregivers(realCaregivers);
      } catch (error) {
        console.error("Error fetching caregivers:", error);
        alert("Could not load caregivers. Please try again.");
      } finally {
        setFetchingCaregivers(false);
      }
    };

    const fetchAppointments = async () => {
      try {
        const q = query(collection(db, "bookings"), where("clientId", "==", user.uid));
        const snapshot = await getDocs(q);
        const appts: Appointment[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            caregiverName: data.caregiverName || "Unknown",
            caregiverPhoto: data.caregiverPhoto || "https://via.placeholder.com/100",
            date: data.date || "",
            time: data.time || "",
            durationHours: data.durationHours || 0,
            notes: data.notes || "",
            status: data.status || "pending",
          };
        });
        setAppointments(appts);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setFetchingAppointments(false);
      }
    };

    fetchUserName();
    fetchCaregivers();
    fetchAppointments();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const openBookingModal = (caregiver: Caregiver) => {
    setSelectedCaregiver(caregiver);
    setBookingDate("");
    setBookingTime("");
    setDuration("4");
    setNotes("");
    setBookingSuccess(false);
  };

  const submitBooking = async () => {
    if (!selectedCaregiver || !bookingDate || !bookingTime) {
      alert("Please select date and time.");
      return;
    }

    setBookingLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not signed in");

      await addDoc(collection(db, "bookings"), {
        clientId: user.uid,
        clientName: firstName,
        caregiverId: selectedCaregiver.id,
        caregiverName: selectedCaregiver.name,
        caregiverPhoto: selectedCaregiver.photoUrl,
        date: bookingDate,
        time: bookingTime,
        durationHours: Number(duration),
        notes: notes.trim(),
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setBookingSuccess(true);
      setTimeout(() => {
        setSelectedCaregiver(null);
      }, 4000);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading your dashboard...</p>
      </div>
    );
  }

  const quickActions = [
    { icon: "🔍", title: "Browse Caregivers", description: "Find vetted, compassionate professionals" },
    { icon: "📅", title: "Book Appointment", description: "Schedule care that fits your needs" },
    { icon: "🗓️", title: "My Appointments", description: "View upcoming and past visits" },
    { icon: "👤", title: "Update Profile", description: "Keep your information current" },
  ];

  return (
    <AuthWrapper allowedRoles={["client"]}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto p-6 lg:p-12 space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {firstName}!
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Find trusted, compassionate care for your loved one
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 sm:mt-0 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-md transition"
            >
              Logout
            </button>
          </div>

          {/* Quick Actions Grid */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              What would you like to do today?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer"
                >
                  <div className="text-5xl mb-4">{action.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Available Caregivers */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Available Caregivers ({caregivers.length})
            </h2>

            {fetchingCaregivers ? (
              <p className="text-center py-12 text-gray-600 dark:text-gray-400">Loading caregivers...</p>
            ) : caregivers.length === 0 ? (
              <p className="text-center py-12 text-gray-600 dark:text-gray-400">
                No caregivers available at the moment. Check back soon!
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caregivers.map((caregiver) => (
                  <div
                    key={caregiver.id}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition"
                  >
                    <img
                      src={caregiver.photoUrl}
                      alt={caregiver.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {caregiver.name}
                      </h3>
                      <div className="flex items-center mb-3">
                        <span className="text-yellow-500 text-lg">★ {caregiver.rating}</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">
                          ({caregiver.reviews} reviews)
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {caregiver.specialties}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 italic">
                        "{caregiver.bio}"
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                          {caregiver.rate}
                        </span>
                        <div className="space-x-3">
                          <button
                            onClick={() => router.push(`/caregiver/${caregiver.id}`)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() => openBookingModal(caregiver)}
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Appointments */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              My Appointments
            </h2>

            {fetchingAppointments ? (
              <p className="text-center py-12 text-gray-600 dark:text-gray-400">Loading appointments...</p>
            ) : appointments.length === 0 ? (
              <p className="text-center py-12 text-gray-600 dark:text-gray-400 bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-lg p-8">
                No appointments yet. Book your first caregiver today!
              </p>
            ) : (
              <div className="space-y-6">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 flex items-center gap-6"
                  >
                    <img
                      src={appt.caregiverPhoto}
                      alt={appt.caregiverName}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {appt.caregiverName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {appt.date} at {appt.time} • {appt.durationHours} hours
                      </p>
                      {appt.notes && (
                        <p className="text-sm italic text-gray-600 dark:text-gray-400">
                          Notes: {appt.notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                          appt.status === "confirmed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : appt.status === "declined"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        }`}
                      >
                        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Booking Modal */}
        {selectedCaregiver && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
              {bookingSuccess ? (
                <div className="text-center py-12">
                  <div className="text-7xl mb-6">✅</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Booking Request Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedCaregiver.name} has been notified and will confirm your request soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Book {selectedCaregiver.name}
                    </h2>
                    <button
                      onClick={() => setSelectedCaregiver(null)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-teal-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-teal-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Duration
                      </label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-teal-500 transition"
                      >
                        <option value="2">2 hours</option>
                        <option value="4">4 hours</option>
                        <option value="6">6 hours</option>
                        <option value="8">8 hours (full day)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Notes (optional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                        placeholder="Any special requirements, medications, or instructions..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-teal-500 resize-none transition"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setSelectedCaregiver(null)}
                      className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitBooking}
                      disabled={bookingLoading}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 disabled:opacity-70 text-white font-semibold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                    >
                      {bookingLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Booking Request"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </AuthWrapper>
  );
}