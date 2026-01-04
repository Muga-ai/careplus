import { ArrowRight, Shield, Star, Users } from 'lucide-react';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-20 md:py-32">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Seamless Post-Hospital Care at Home
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                CarePlus connects families with certified, highly-rated caregivers for safe, compassionate, and dignified recovery after hospital discharge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center justify-center gap-2">
                  Join the Waitlist <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
                  Learn More
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Launching soon 🚀 • Be the first to access verified caregivers</p>
            </div>

            {/* Hero Images Gallery – Authentic, emotional, trust-building */}
            <div className="relative order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://www.northriverhc.com/wp-content/uploads/2025/10/What-a-Week-of-Elder-Care-at-Home-Really-Looks-Like.png"
                    alt="Caregiver and senior sharing a warm moment during daily care"
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl mt-12">
                  <img
                    src="https://media.istockphoto.com/id/1407245313/photo/caregiver-talking-with-senior-clients-in-family-home.jpg?s=612x612&w=0&k=20&c=X-aCNTaS_j7_qUA5xhg00andnYDUz6XXTAlJ3B7Wt28="
                    alt="Caregiver discussing care plan with family at home"
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl -mt-12">
                  <img
                    src="https://bestqualityhomecareagency.com/wp-content/uploads/2025/07/professional-female-caregiver-is-preparing-a-tasty-meal-for-a-senior-citizen-at-home.jpg"
                    alt="Caregiver preparing nutritious meal with senior in kitchen"
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://ascendhealth.com/wp-content/uploads/2025/08/iStock-1487718165-1-1024x683.png"
                    alt="Caregiver assisting senior with mobility in comfortable home"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900 px-6">
          <div className="max-w-7xl mx-auto text-center space-y-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Why Choose CarePlus?</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="space-y-4 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
                <Shield className="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Certified & Vetted</h3>
                <p className="text-gray-600 dark:text-gray-300">Every caregiver is thoroughly background-checked, licensed, and professionally certified.</p>
              </div>
              <div className="space-y-4 bg-gradient-to-br from-teal-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
                <Star className="w-16 h-16 mx-auto text-teal-600 dark:text-teal-400" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Rated & Reviewed</h3>
                <p className="text-gray-600 dark:text-gray-300">Real family feedback ensures you find the perfect, trusted match.</p>
              </div>
              <div className="space-y-4 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
                <Users className="w-16 h-16 mx-auto text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Easy Matching</h3>
                <p className="text-gray-600 dark:text-gray-300">Quickly connect with available specialists in post-hospital recovery.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-blue-50 dark:bg-gray-800 px-6">
          <div className="max-w-7xl mx-auto text-center space-y-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-3xl shadow-xl p-10 border border-gray-200 dark:border-gray-700">
                <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-6">1</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Tell Us Your Needs</h3>
                <p className="text-gray-600 dark:text-gray-300">Share recovery details, preferences, and schedule requirements.</p>
              </div>
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-3xl shadow-xl p-10 border border-gray-200 dark:border-gray-700">
                <div className="text-6xl font-bold text-teal-600 dark:text-teal-400 mb-6">2</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Get Matched</h3>
                <p className="text-gray-600 dark:text-gray-300">Receive hand-selected profiles of qualified, compassionate caregivers.</p>
              </div>
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-3xl shadow-xl p-10 border border-gray-200 dark:border-gray-700">
                <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">3</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Start Care</h3>
                <p className="text-gray-600 dark:text-gray-300">Book confidently and begin seamless, dignified home recovery.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-16 text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold">Ready for Peace of Mind?</h2>
            <p className="text-xl opacity-90">Join thousands of families waiting for the most trusted platform in post-hospital care.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mt-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-xl text-gray-900 flex-1 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition shadow-lg">
                Get Early Access
              </button>
            </div>
            <p className="text-sm opacity-80 mt-6">No spam • Privacy guaranteed</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-900 text-white text-center">
          <p className="text-lg">&copy; 2026 CarePlus. All rights reserved. • Made with ❤️ for families</p>
        </footer>
      </div>
    </>
  );
}