import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { MessageSquare, Users, Share2, Sparkles } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Connect with the world</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Share your thoughts with the{" "}
              <span className="text-blue-600">world</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Join millions of people sharing their ideas, connecting with
              friends, and staying updated with what's happening around the
              globe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth/register">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                  Get Started
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg px-8"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div>
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Tweets Shared</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">100K+</div>
                <div className="text-sm text-gray-600">Connections</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-6">
              {/* Feature Card 1 */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      Share Your Voice
                    </h3>
                    <p className="text-gray-600">
                      Express yourself with tweets up to 280 characters and
                      engage with your community.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      Connect & Grow
                    </h3>
                    <p className="text-gray-600">
                      Build meaningful connections and grow your network with
                      like-minded people.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Share2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      Share Privately
                    </h3>
                    <p className="text-gray-600">
                      Share tweets with specific friends and keep your content
                      private when needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </section>

      {/* Optional: Add CSS for blob animation */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Home;
