"use client";

import React, { useState, useEffect } from "react";
import { FaQuestion } from "react-icons/fa";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

const QuestionSection = () => {
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Updated form data keys
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    selectdepartment: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/faq/`
        );

        if (!response.ok) throw new Error("Failed to fetch FAQs");
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const isOpen = (index: number) =>
    openIndex === index || hoveredIndex === index;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          selectdepartment: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        alert("Failed to send message. " + JSON.stringify(errorData, null, 2));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col lg:flex-row w-full px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-12 bg-white gap-6 lg:gap-10 mt-10 sm:mt-16 lg:mt-20">
      {/* FAQ Section */}
      <div className="w-full lg:flex-[2]">
        <div className="text-center lg:text-left mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-black leading-tight">
            Have you any{" "}
            <span className="text-[#e7a98b] underline font-extrabold">questions?</span>
          </h1>
          <p className="text-gray-500 mb-2 text-sm sm:text-base">Feel free to contact us now.</p>
          <p className="text-gray-500 mb-4 text-sm sm:text-base leading-relaxed">
            Please read questions below and if you can&apos;t find your answer, please send us your question. We will answer you as soon as possible.
          </p>
        </div>

        <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6">
          <div className="bg-[#e7a98b] p-2 sm:p-3 rounded text-white text-lg sm:text-xl flex-shrink-0">
            <FaQuestion />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="font-bold text-lg sm:text-xl text-black">F.A.Qs</h2>
            <p className="text-xs sm:text-sm text-gray-600">Frequently asked questions</p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button
                className="w-full text-left bg-[#e7a98b] hover:bg-[#d68b6c] text-white px-3 sm:px-4 py-3 sm:py-4 font-semibold flex justify-between items-center transition-colors duration-200 text-sm sm:text-base"
                onClick={() => toggleFAQ(index)}
              >
                <span className="pr-2 leading-tight">{faq.question}</span>
                <div className="flex-shrink-0 ml-2">
                  {isOpen(index) ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
              </button>
              <div
                className={`bg-white text-gray-700 transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full lg:flex-[1] bg-[#2d241f] text-white rounded-lg p-4 sm:p-6 lg:p-8 lg:sticky lg:top-4 lg:self-start">
        <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6">
          <div className="bg-white text-black p-2 sm:p-3 rounded flex-shrink-0">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-lg sm:text-xl font-bold">Ask Us</h2>
            <p className="text-xs sm:text-sm text-gray-400">Quick Contact Form</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name (*)"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-white text-black placeholder:text-gray-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#e7a98b]"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email (*)"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-white text-black placeholder:text-gray-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#e7a98b]"
            />
          </div>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-white text-black placeholder:text-gray-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#e7a98b]"
          />

          <select
            name="selectdepartment"
            value={formData.selectdepartment}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-white text-black text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#e7a98b]"
          >
            <option value="">Select Department</option>
            <option value="business">Business Department</option>
            <option value="support">Support</option>
            <option value="transport">Transport</option>
            <option value="other">Other</option>
          </select>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={4}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-white text-black placeholder:text-gray-500 text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#e7a98b]"
          ></textarea>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#e7a98b] hover:bg-[#d68b6c] text-white font-semibold py-2 sm:py-3 px-6 rounded transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e7a98b] focus:ring-offset-[#2d241f]"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuestionSection;





