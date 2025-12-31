"use client";
import Container from "@repo/ui/components/container";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Mail } from "lucide-react";
import React, { useState } from "react";

const EMAIL = "hello@fileforge.com";
const WHATSAPP = "+1 (555) 123-4567";

const FAQ_ITEMS = [
  {
    question: "What are your business hours?",
    answer: "We're available Monday to Friday, 9 AM to 6 PM EST. For urgent matters, you can reach us on WhatsApp 24/7.",
  },
  {
    question: "How long does it take to get a response?",
    answer:
      "We typically respond within 2-4 business hours via email. WhatsApp inquiries are answered within 30 minutes during business hours.",
  },
  {
    question: "Do you offer customer support in multiple languages?",
    answer: "Yes, we provide support in English, Spanish, and French. Please specify your preferred language when contacting us.",
  },
  {
    question: "Where are your offices located?",
    answer: "Our headquarters are in Cityville, with satellite offices in London and Singapore. Remote support is available worldwide.",
  },
  {
    question: "What services do you provide?",
    answer: "We offer consulting, product development, and technical support services. Schedule a call to discuss your specific needs.",
  },
];

export default function ContactUs() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <Container className='pt-32 pb-20 text-gray-100'>
      {/* Header */}
      <header className='text-center mb-16'>
        <h1 className='text-5xl font-extrabold text-white drop-shadow-lg'>Contact Us</h1>
        <p className='mt-4 text-gray-300 max-w-2xl mx-auto text-lg'>
          Reach out through any of our channels. We're here to help with questions about features, pricing, partnerships, or anything else.
        </p>
      </header>

      {/* Contact Cards */}
      <section className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-20'>
        {/* Email Card */}
        <div className='bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300'>
          <div className='p-4 rounded-full bg-purple-900/40 mb-4'>
            <Mail />
          </div>
          <h3 className='text-xl font-semibold text-white mb-2'>Email Us</h3>
          <p className='text-gray-300'>We'll respond within 4 hours</p>
          <a href={`mailto:${EMAIL}`} className='mt-4 text-purple-400 hover:text-purple-300 flex items-center gap-2 font-medium'>
            {EMAIL}
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
            </svg>
          </a>
        </div>

        {/* WhatsApp Card */}
        <div className='bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300'>
          <div className='p-4 rounded-full bg-green-900/40 mb-4'>
            <IconBrandWhatsapp size={25} />
          </div>
          <h3 className='text-xl font-semibold text-white mb-2'>Chat on WhatsApp</h3>
          <p className='text-gray-300'>Instant response within minutes</p>
          <a
            href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g, "")}`}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-4 text-green-400 hover:text-green-300 flex items-center gap-2 font-medium'
          >
            {WHATSAPP}
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
            </svg>
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className=''>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-white mb-3'>Frequently Asked Questions</h2>
          <p className='text-gray-300 max-w-2xl mx-auto'>Find quick answers to common questions about our services and support</p>
        </div>

        <div className='space-y-4 max-w-3xl mx-auto'>
          {FAQ_ITEMS.map((faq, index) => (
            <div
              key={index}
              className='bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-800/20 overflow-hidden transition-all duration-300 hover:scale-[1.01]'
            >
              <button
                onClick={() => toggleFaq(index)}
                className='w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/10 transition-colors'
              >
                <h3 className='font-semibold text-lg text-white pr-4'>{faq.question}</h3>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaqIndex === index ? "rotate-180" : ""}`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaqIndex === index ? "max-h-48" : "max-h-0"}`}>
                <div className='px-6 pb-5 pt-2 border-t border-gray-800'>
                  <p className='text-gray-300'>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
