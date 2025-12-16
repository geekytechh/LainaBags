"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Sparkles, ShoppingBag } from "lucide-react";

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
      const response = await fetch("https://formspree.io/f/mdkqrkpj", {
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
      {/* Hero Section with Graphics */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`
        }}></div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <MessageCircle className="absolute top-20 left-16 w-14 h-14 rotate-12 animate-float" />
          <Phone className="absolute top-32 right-24 w-10 h-10 -rotate-12 animate-float" style={{ animationDelay: '1s' }} />
          <Mail className="absolute bottom-32 left-1/4 w-12 h-12 rotate-6 animate-float" style={{ animationDelay: '2s' }} />
          <MapPin className="absolute bottom-24 right-1/3 w-10 h-10 -rotate-6 animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wide">Get In Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
              Contact Us
            </h1>
            <div className="w-20 h-1 bg-white/40 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Have questions about our products or services? We're here to help
            </p>
          </div>
        </div>
      </div>

      {/* Content Section with Graphics */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-50/30 rounded-full blur-3xl"></div>
        </div>

        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='2' fill='%233B82F6'/%3E%3C/svg%3E")`
        }}></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Send a Message</h2>
                  <div className="w-14 h-1 bg-blue-600 rounded-full"></div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 rounded-full border-t-white animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {isSubmitted && (
                    <div className="p-4 text-sm text-blue-700 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                      Thank you! We'll respond within 24 hours.
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
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Visit Our Store</h2>
                  <div className="w-14 h-1 bg-blue-600 rounded-full"></div>
                </div>
                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 mb-2">Address</h3>
                      <a
                        href="https://maps.app.goo.gl/bW6dYV15hzHGom939"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-slate-600 hover:text-blue-600 transition-colors text-sm"
                      >
                        <p>Room No. 1, Chawl 12, Byculla Station Rd</p>
                        <p>Near Star of India Hotel, Transit Camp</p>
                        <p>Byculla (W), Mumbai, Maharashtra - 400 011</p>
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 mb-2">Phone</h3>
                      <div className="space-y-1.5">
                        <a href="tel:02223088786" className="block text-slate-600 hover:text-blue-600 transition-colors text-sm">
                          022 23088786
                        </a>
                        <a href="tel:+919987225041" className="block text-slate-600 hover:text-blue-600 transition-colors text-sm">
                          +91 99872 25041
                        </a>
                        <a href="tel:+917045010589" className="block text-slate-600 hover:text-blue-600 transition-colors text-sm">
                          +91 70450 10589
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 mb-2">Email</h3>
                      <a href="mailto:info@lainabags.com" className="block text-slate-600 hover:text-blue-600 transition-colors text-sm">
                        info@lainabags.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Contact */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-black">Quick Response</h2>
                </div>
                <p className="mb-5 text-white/90 text-sm">
                  Need instant answers? Chat with us on WhatsApp for immediate assistance.
                </p>
                <a
                  href="https://wa.me/917045010589"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-white text-green-600 py-3 px-6 rounded-xl font-bold text-sm hover:bg-green-50 transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-black text-slate-900 mb-2">Business Hours</h2>
                  <div className="w-14 h-1 bg-blue-600 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-bold text-slate-700">Mon - Sat</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">9:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
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
