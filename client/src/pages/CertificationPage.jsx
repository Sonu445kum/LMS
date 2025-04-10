import { Award, CheckCircle, Star, Trophy } from "lucide-react";

function CertificationPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Certification Programs</h1>
          <p className="text-xl text-gray-600 mb-12">
            Earn recognized certifications to advance your career
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <Award className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Professional Certificates</h3>
            <p className="text-gray-600 mb-4">
              Industry-recognized certificates for professional development
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Industry-aligned curriculum</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Expert-led instruction</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Portfolio projects</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <Star className="h-12 w-12 text-yellow-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Specialization Programs</h3>
            <p className="text-gray-600 mb-4">
              Deep dive into specific areas of expertise
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Comprehensive learning paths</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Hands-on projects</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Peer-reviewed assignments</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <Trophy className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Master's Certificates</h3>
            <p className="text-gray-600 mb-4">
              Advanced certification for career advancement
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Advanced coursework</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Research projects</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Industry mentorship</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Our Certifications?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Industry Recognition</h3>
              <p className="text-gray-600">
                Our certificates are recognized by leading companies worldwide
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
              <p className="text-gray-600">
                Learn at your own pace with our self-paced courses
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of experience
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Career Support</h3>
              <p className="text-gray-600">
                Get career guidance and job placement assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificationPage; 