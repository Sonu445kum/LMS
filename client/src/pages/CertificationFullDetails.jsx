import { useParams } from 'react-router-dom';
import { useGetCertificationByIdQuery } from '../Features/Api/certificationsApi';
import { Clock, Award, ChevronRight } from 'lucide-react';
// import ChatBot from '@/components/ChatBot';
import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

export default function CertificationFullDetails() {
  const { id } = useParams();
  const { data: cert, isLoading, isError } = useGetCertificationByIdQuery(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const [showFaq1, setShowFaq1] = useState(false);
  const [showFaq2, setShowFaq2] = useState(false);
  const [showFaq3, setShowFaq3] = useState(false);
  const [showFaq4, setShowFaq4] = useState(false);

  // Add image URL transformation function
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `http://localhost:9000${imagePath}`;
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-600 text-center">Loading...</p>
      </div>
    );
  }

  if (isError || !cert) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-600 text-center">Certificate not found.</p>
      </div>
    );
  }

  const handleDownloadSyllabus = async () => {
    if (id) {
      try {
        // Use the hook to fetch the syllabus
        const response = await fetch(
          `http://localhost:9000/api/v1/certifications/download-syllabus/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch the syllabus file.");
        }

        // Convert the response to a Blob
        const blob = await response.blob();

        // Create a temporary anchor element
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${cert.title.replace(/\s+/g, "_")}_certificationSyllabus.pdf`;

        // Append the link to the document, trigger the click, and remove the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading the syllabus:", error.message);
      }
    } else {
      console.error("No certification ID found.");
    }
  };
  console.log("Selected Category:", cert.category);
  console.log("Available Categories:", Object.keys(cert));
  console.log("Certifications for category:", cert);
  console.log('Image data:', cert?.image);

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-6 sm:px-6 lg:px-8 -mt-15">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative aspect-square w-48 h-48 sm:w-64 sm:h-64 md:w-full md:h-auto mx-auto rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                {cert.image && (
                  <img
                    src={getImageUrl(Array.isArray(cert.image) ? cert.image[0] : cert.image)}
                    alt={cert.title}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 p-2 sm:p-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.png";
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex-1 w-full">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2  sm:mb-4">
                {cert.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{cert.description}</p>

              {/* 100% pass guarantee */}
              <div className="w-[70%] bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg transform hover:scale-[1.03] transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-white rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">100% Passing Program or Your Money Back</h3>
                    <p className="text-blue-100 text-sm sm:text-base">
                      LearnLofts proudly offers a 100% Passing Rate Guarantee—if you don't pass, you get your money back. No risk, only reward.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 items-center text-sm">
                <span className="text-xl sm:text-2xl font-bold text-blue-600">
                  Price:${cert.price}
                </span>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                  <span className="text-sm sm:text-base">{cert.duration}</span>
                </div>
                {cert.tag && (
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm ${cert.tagColor}`}>
                    {cert.tag}
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Action Buttons Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  className="flex-1 bg-blue-600 text-white text-center py-4 px-8 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-200"
                  onClick={() => window.location.href = '#enroll'}
                >
                  Apply Now
                </button>
                <button
                  className="flex-1 bg-white text-blue-600 text-center py-4 px-8 rounded-lg text-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200"
                  onClick={handleDownloadSyllabus}
                >
                  Download Syllabus
                </button>
              </div>
            </div>


            {/* Certification Comparison */}
            <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mt-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Why Certification Is Important ?
              </h2>

              <div className="relative overflow-hidden">
                <div className="overflow-x-auto -mx-4 sm:mx-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200 bg-gray-900 text-white rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider w-1/4">
                            Criteria
                          </th>
                          <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
                            Certified Professionals
                          </th>
                          <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
                            Non-Certified Professionals
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        <tr className="hover:bg-gray-800/75 transition-colors">
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Average Salary</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">₹12–25 LPA (depending on field & experience)</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">₹6–15 LPA (limited by lack of credentials)</td>
                        </tr>
                        <tr className="bg-gray-800/50 hover:bg-gray-800/75 transition-colors">
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Salary Growth Rate</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">20%–40% higher than non-certified peers</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Slower salary growth</td>
                        </tr>
                        <tr className="hover:bg-gray-800/75 transition-colors">
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Job Opportunities</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">More job offers from top companies globally</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Fewer and often lower-paying job opportunities</td>
                        </tr>
                        <tr className="bg-gray-800/50 hover:bg-gray-800/75 transition-colors">
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Career Progression</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Faster promotions, leadership roles</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Slower career growth</td>
                        </tr>
                        <tr className="hover:bg-gray-800/75 transition-colors">
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Industry Recognition</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Recognized for specialized skills</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">May need to prove skills through experience alone</td>
                        </tr>
                        <tr className="bg-gray-800/50 hover:bg-gray-800/75 transition-colors">
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Global Opportunities</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">High chance of working with international clients</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Limited unless skills are proven otherwise</td>
                        </tr>
                        <tr className="hover:bg-gray-800/75 transition-colors">
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Roles Often Landed</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Cloud Architect, Cybersecurity Analyst, AI Engineer, Project Manager</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Junior Developer, Support Engineer, Assistant Roles</td>
                        </tr>
                        <tr className="bg-gray-800/50 hover:bg-gray-800/75 transition-colors">
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Job Security</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Higher due to in-demand certified skills</td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Moderate, depends on employer perception</td>
                        </tr>
                        {/* <tr className="hover:bg-gray-800/75 transition-colors">
                                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">Learning Curve</td>
                                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Structured and up-to-date with trends</td>
                                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Often self-taught or experience-based</td>
                                                </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent h-4 pointer-events-none sm:hidden"></div>
              </div>
              <p className="mt-2 text-xs text-gray-500 italic sm:hidden">Scroll horizontally to view more →</p>
            </section>

            {/* Introduction */}
            <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Introduction</h2>
              <p className="text-sm sm:text-base text-gray-600">{cert.introduction}</p>
            </section>

            {/* Key Highlights */}
            <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Key Highlights</h2>
              <div className="space-y-3 sm:space-y-4">
                {cert.key_1 && (
                  <div className="flex gap-2 sm:gap-3">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-sm sm:text-base text-gray-600">{cert.key_1}</p>
                  </div>
                )}
                {cert.key_2 && (
                  <div className="flex gap-2 sm:gap-3">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-sm sm:text-base text-gray-600">{cert.key_2}</p>
                  </div>
                )}
                {cert.key_3 && (
                  <div className="flex gap-2 sm:gap-3">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-sm sm:text-base text-gray-600">{cert.key_3}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Course Benefits */}
            <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Course Benefits</h2>
              <div className="space-y-3 sm:space-y-4">
                {cert.Course_Benefits && (
                  <div className="flex gap-2 sm:gap-3">
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-sm sm:text-base text-gray-600">{cert.Course_Benefits}</p>
                  </div>
                )}
                {cert.Course_Benefits_2 && (
                  <div className="flex gap-2 sm:gap-3">
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-sm sm:text-base text-gray-600">{cert.Course_Benefits_2}</p>
                  </div>
                )}
                {cert.Course_Benefits_3 && (
                  <div className="flex gap-2 sm:gap-3">
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-sm sm:text-base text-gray-600">{cert.Course_Benefits_3}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Course Content */}
            {cert.course_content && cert.course_content.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Course Content</h2>
                {cert.course_content.map((content, index) => (
                  <div key={index} className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">{content.title}</h3>
                    <div className="space-y-2 sm:space-y-3">
                      {content.lessons.map((lesson, lessonIndex) => (
                        <details key={lessonIndex} className="group">
                          <summary className="flex items-center gap-2 sm:gap-3 cursor-pointer list-none p-2 sm:p-3 rounded-lg hover:bg-gray-50">
                            <div className="flex-1">
                              <h4 className="text-sm sm:text-base font-medium text-gray-900">{lesson.title}</h4>
                            </div>
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform group-open:rotate-90" />
                          </summary>
                          {lesson.topics && lesson.topics.length > 0 && (
                            <div className="pl-6 sm:pl-8 mt-2 space-y-2">
                              {lesson.topics.map((topic, topicIndex) => (
                                <div key={topicIndex} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                                  <p className="text-sm sm:text-base text-gray-600">{topic}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Why Choose LearnLofts */}
            <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Why Choose LearnLofts for Your Certification Journey?
              </h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      Future-Ready Training Across Industries
                    </h3>
                    <p className="text-base text-blue-800">
                      At LearnLofts, we offer a wide spectrum of in-demand certifications to power your career—ranging from Project Management, Information Security, and Quality Management to Networking, Cyber Security, Scrum & Agile, Microsoft Certifications, Amazon Web Services, and more. Whether you're upgrading skills or stepping into a new domain, we've got the roadmap.
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                      Expert Mentors with Real-World Experience
                    </h3>
                    <p className="text-base text-green-800">
                      Our trainers aren't just certified professionals—they're working experts with years of hands-on experience. They bring industry scenarios into the classroom, helping you master not just theory, but application.
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">
                      Tailored Learning for Maximum Impact
                    </h3>
                    <p className="text-base text-purple-800">
                      Every learner is unique, and so is our approach. LearnLofts offers flexible, personalized learning paths designed to suit your style, pace, and goals. Whether you're self-paced or prefer guided sessions, we align with your rhythm.
                    </p>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                      Guaranteed Success or Your Money Back
                    </h3>
                    <p className="text-base text-yellow-800">
                      We stand behind our training with confidence. LearnLofts proudly offers a 100% Passing Rate Guarantee—if you don't pass, you get your money back. No risk, only reward.
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">
                      Beyond Certification – Real Career Growth
                    </h3>
                    <p className="text-base text-red-800">
                      We go beyond helping you pass an exam. Our training equips you with career-ready skills, industry insights, and the confidence to lead in your chosen field.
                    </p>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                      Join LearnLofts Today
                    </h3>
                    <p className="text-base text-indigo-800">
                      Your success is our mission. With the right support, expert guidance, and our proven methods, you're not just getting certified—you're getting ahead.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Faqs */}
            <div className="mb-8 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>

              {/* FAQ Item 1 */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => setShowFaq1(!showFaq1)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="font-medium text-gray-800">Who can take Learnlofts certifications?</span>
                  <ChevronRight
                    className={`transition-transform duration-200 ${showFaq1 ? 'rotate-90' : ''}`}
                  />
                </button>
                {showFaq1 && (
                  <p className="mt-2 text-gray-600">
                    Our certifications are designed for professionals at all levels - from beginners looking to enter the field to experienced practitioners seeking validation of their skills.
                  </p>
                )}
              </div>

              {/* FAQ Item 2 */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => setShowFaq2(!showFaq2)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="font-medium text-gray-800">Are Learnlofts certifications globally recognized?</span>
                  <ChevronRight
                    className={`transition-transform duration-200 ${showFaq2 ? 'rotate-90' : ''}`}
                  />
                </button>
                {showFaq2 && (
                  <p className="mt-2 text-gray-600">
                    Yes, Learnlofts certifications are industry-approved and recognized by employers worldwide, especially in Networking, Cloud Computing, and Microsoft technologies.
                  </p>
                )}
              </div>

              {/* FAQ Item 3 */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => setShowFaq3(!showFaq3)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="font-medium text-gray-800">How do I prepare for Microsoft-related certifications?</span>
                  <ChevronRight
                    className={`transition-transform duration-200 ${showFaq3 ? 'rotate-90' : ''}`}
                  />
                </button>
                {showFaq3 && (
                  <p className="mt-2 text-gray-600">
                    We recommend our official study guides, hands-on labs, and practice exams. For Azure certifications, practical experience with the platform is highly valuable.
                  </p>
                )}
              </div>

              {/* FAQ Item 4 */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => setShowFaq4(!showFaq4)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="font-medium text-gray-800">What's the exam retake policy?</span>
                  <ChevronRight
                    className={`transition-transform duration-200 ${showFaq4 ? 'rotate-90' : ''}`}
                  />
                </button>
                {showFaq4 && (
                  <p className="mt-2 text-gray-600">
                    You can retake exams after 14 days. We provide detailed score reports to help you focus your studies before attempting again.
                  </p>
                )}
              </div>
            </div>

            {/* Review */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Student Reviews</h2>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm text-gray-600 ml-2">(4.8/5 from 1,250 learners)</span>
                </div>
                <p className="text-gray-700 italic">"The content was very well explained. Helped me land my first role!"</p>
              </div>
            </div>



            {/* Roadmap */}
            {cert.Road_map?.[0] && (
              <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Learning Roadmap</h2>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={getImageUrl(cert.Road_map[0])}
                    alt="Certification Roadmap"
                    className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                    style={{ maxHeight: '600px' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 sticky top-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                Ready to Get Started?
              </h3>
              <button className="w-full bg-blue-600 text-white rounded-lg py-2.5 sm:py-3 px-4 text-sm sm:text-base font-medium hover:bg-blue-700 transition-colors">
                Enroll Now
              </button>
              <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                Join thousands of professionals who have already taken this certification course to advance their careers.
              </p>
            </div>



          </div>
        </div>

        {/* Add ChatBot component */}
        {/* <ChatBot /> */}
      </div>
    </div>
  );
}




