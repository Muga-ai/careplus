import { ArrowRight, Shield, Star, Users } from 'lucide-react';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-20 md:py-32">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Seamless Post-Hospital Care at Home
              </h1>
              <p className="text-xl text-gray-600">
                CarePlus connects families with certified, highly-rated caregivers for safe and compassionate recovery after hospital discharge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  Join the Waitlist <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
                  Learn More
                </button>
              </div>
              <p className="text-sm text-gray-500">Launching soon 🚀 • Be the first to access verified caregivers</p>
            </div>
            <div className="relative">
              {/* HERO IMAGE: Using regular <img> to avoid Next/Image config error */}
              {/* Warm hug between caregiver and senior – perfect emotional trust builder */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://www.shutterstock.com/image-photo/hug-caregiver-senior-patient-support-260nw-2542552123.jpg"
                  alt="Compassionate caregiver sharing a warm, supportive hug with senior patient during home recovery"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white px-6">
          <div className="max-w-7xl mx-auto text-center space-y-12">
            <h2 className="text-4xl font-bold text-gray-900">Why Choose CarePlus?</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="space-y-4">
                <Shield className="w-16 h-16 mx-auto text-blue-600" />
                <h3 className="text-2xl font-semibold">Certified & Vetted</h3>
                <p className="text-gray-600">Every caregiver is thoroughly background-checked and professionally certified.</p>
              </div>
              <div className="space-y-4">
                <Star className="w-16 h-16 mx-auto text-blue-600" />
                <h3 className="text-2xl font-semibold">Rated & Reviewed</h3>
                <p className="text-gray-600">Real client feedback ensures you find the perfect match for your needs.</p>
              </div>
              <div className="space-y-4">
                <Users className="w-16 h-16 mx-auto text-blue-600" />
                <h3 className="text-2xl font-semibold">Easy Matching</h3>
                <p className="text-gray-600">Quickly connect with available caregivers specialized in post-hospital recovery.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-blue-50 px-6">
          <div className="max-w-7xl mx-auto text-center space-y-12">
            <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-5xl font-bold text-blue-600 mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Tell Us Your Needs</h3>
                <p className="text-gray-600">Share recovery details and preferences.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-5xl font-bold text-blue-600 mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
                <p className="text-gray-600">Receive profiles of qualified caregivers.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-5xl font-bold text-blue-600 mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Start Care</h3>
                <p className="text-gray-600">Book and begin seamless home recovery.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl md:text-5xl font-bold">Ready for Peace of Mind?</h2>
            <p className="text-xl">Join thousands waiting for the trusted platform in post-hospital care.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-lg text-gray-900 flex-1"
              />
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
                Get Early Access
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 bg-gray-900 text-white text-center">
          <p>&copy; 2026 CarePlus. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}