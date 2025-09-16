"use client";

import React, { useState } from "react";
import { Inbox, Phone, MapPin, Globe } from "lucide-react";

const Contactsection = () => {
  // Update form state keys to match backend requirements
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    phonenumber: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Send keys exactly as backend expects
    const payload = {
      name: formData.name,
      email: formData.email,
      service: formData.service,
      phonenumber: formData.phonenumber,
      message: formData.message,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/form-page/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          service: "",
          phonenumber: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        alert("Failed to send message: " + JSON.stringify(errorData));
      }
    } catch (error) {
      alert("An error occurred: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 bg-white">
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 mb-16">
          <div className="flex items-start gap-6">
            <div className="bg-[#e7a98b] p-3 rounded-md">
              <Inbox className="text-white w-12 h-12" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-black">Email</h1>
              <p className="text-gray-600 text-md">
                sbi.training.cntr@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="bg-[#e7a98b] p-3 rounded-md">
              <Phone className="text-white w-12 h-12" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-black">Phone</h1>
              <p className="text-gray-600 text-md">+977-9851403517</p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="bg-[#e7a98b] p-3 rounded-md">
              <MapPin className="text-white w-12 h-12" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-black">Address</h1>
              <p className="text-gray-600 text-md">Basundhara, Kathmandu</p>
            </div>
          </div>
        </div>

        {/* Japanese Company Details Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white p-2 rounded-md">
                <Globe className="text-red-600 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Japan Office</h2>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-md border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    ABC株式会社
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="text-white w-4 h-4 mt-1 flex-shrink-0" />
                      <p className="text-white/90 text-sm">
                        福岡県久留米市六ツ門町7－24－1206
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="text-white w-4 h-4 flex-shrink-0" />
                      <p className="text-white/90 text-sm">0942-48-2095</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="text-white w-4 h-4 flex-shrink-0" />
                      <a
                        href="http://www.theabc.jp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/90 text-sm hover:text-white transition-colors underline"
                      >
                        www.theabc.jp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <div
            className="w-full md:w-1/2 relative bg-cover bg-center rounded-lg min-h-[500px]"
            style={{
              backgroundImage: "url('/assets/images/yes.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-lg"></div>

            <div className="relative p-8 md:p-12 z-10 h-full flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-white mb-6">
                Get in touch{" "}
                <span className="underline text-[#d78e6b] font-extrabold">
                  with us
                </span>
              </h1>

              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-white mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-gray-300 placeholder-white bg-white/10 text-white"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-white mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-gray-300 placeholder-white bg-white/10 text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-white mb-1">
                    Interested Service
                  </label>
                  <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-gray-300 placeholder-white bg-white/10 text-white"
                    placeholder="E.g., Home Care"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-white mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-gray-300 placeholder-white bg-white/10 text-white"
                    placeholder="+977..."
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-white mb-1">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-gray-300 placeholder-white bg-white/10 text-white"
                  rows={4}
                  placeholder="Type your message here..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="text-white font-semibold py-2 px-6 rounded-md bg-[#d78e6b] transition hover:bg-[#bf7a5f]"
                >
                  {isSubmitting ? "Sending..." : "Request a Quote"}
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 min-h-[400px] sm:min-h-[500px] md:min-h-[500px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.182985757176!2d85.33033547525514!3d27.742501476162488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19007cf861e5%3A0x1416266e41d6b7c4!2sKathmandu%20International%20Travel!5e0!3m2!1sen!2snp!4v1754037698761!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactsection;
