"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/mblkywpq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V4h4V2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V4h4V2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
              Contact Us
            </h1>
            <div className="w-24 h-1.5 bg-white/30 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Have questions about our products? We're here to help and answer
              any questions you might have.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Send Us a Message</h2>
                  <div className="w-16 h-1 bg-sky-600 rounded-full"></div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-bold text-slate-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-bold text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-bold text-slate-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-bold text-slate-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-300"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3.5 px-6 bg-sky-600 text-white rounded-xl font-black text-sm hover:bg-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 rounded-full border-t-white animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {isSubmitted && (
                    <div className="p-4 text-sm text-sky-700 bg-sky-50 rounded-xl border-l-4 border-sky-600">
                      Thank you for your message! We'll get back to you soon.
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Store Info */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Our Store</h2>
                  <div className="w-16 h-1 bg-sky-600 rounded-full"></div>
                </div>
                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 mb-2">Address</h3>
                      <a 
                        href="https://maps.app.goo.gl/TkMbQxgaCfq13wn58"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-slate-600 hover:text-sky-600 transition-colors"
                      >
                        <p>Shop No. 28, Lohe Ki Chawl, Mumbai Bag Market</p>
                        <p>Maulana Azad Road, Madanpura, Mumbai - 400 008</p>
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 mb-2">Phone</h3>
                      <div className="space-y-2">
                        <a href="tel:+919326123535" className="block text-slate-600 hover:text-sky-600 transition-colors">
                          +91 93261 23535
                        </a>
                        <a href="tel:+918828081163" className="block text-slate-600 hover:text-sky-600 transition-colors">
                          +91 88280 81163
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 mb-2">Email</h3>
                      <div className="space-y-2">
                        <a href="mailto:support@lainabags.com" className="block text-slate-600 hover:text-sky-600 transition-colors">
                          support@lainabags.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Contact */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl border border-green-400 shadow-xl p-6 md:p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black">Quick Contact</h2>
                </div>
                <p className="mb-6 text-white/90">
                  Prefer to chat? Reach us instantly on WhatsApp for quick responses.
                </p>
                <a
                  href="https://wa.me/919326123535"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-white text-green-600 py-3.5 px-6 rounded-xl font-black text-sm hover:bg-green-50 transition-all duration-300 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Business Hours</h2>
                  <div className="w-16 h-1 bg-sky-600 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-sky-600" />
                      <span className="text-sm font-bold text-slate-700">Monday - Friday</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-sky-600" />
                      <span className="text-sm font-bold text-slate-700">Saturday</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-sky-600" />
                      <span className="text-sm font-bold text-slate-700">Sunday</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
