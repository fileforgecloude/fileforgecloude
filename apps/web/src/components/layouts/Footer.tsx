"use client";

import Link from "next/link";
import { Cloud, Github, Twitter, Linkedin, Mail } from "lucide-react";
import Container from "@repo/ui/components/container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#" },
        { name: "Enterprise", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Documentation", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className='bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 pt-20 pb-10'>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16'>
          {/* Brand */}
          <div className='lg:col-span-2 space-y-6'>
            <Link href='/' className='flex items-center space-x-2 group'>
              <div className='p-2 bg-primary rounded-xl text-white group-hover:rotate-12 transition-transform'>
                <Cloud size={24} />
              </div>
              <span className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>File Forge</span>
            </Link>
            <p className='text-gray-500 dark:text-gray-400 font-medium max-w-xs leading-relaxed'>
              The ultimate cloud storage forge for creative professionals and modern teams. Secure, fast, and free to start.
            </p>
            <div className='flex items-center space-x-5'>
              <Link href='#' className='text-gray-400 hover:text-primary transition-colors'>
                <Github size={20} />
              </Link>
              <Link href='#' className='text-gray-400 hover:text-primary transition-colors'>
                <Twitter size={20} />
              </Link>
              <Link href='#' className='text-gray-400 hover:text-primary transition-colors'>
                <Linkedin size={20} />
              </Link>
              <Link href='#' className='text-gray-400 hover:text-primary transition-colors'>
                <Mail size={20} />
              </Link>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className='space-y-6'>
              <h4 className='text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-widest'>{section.title}</h4>
              <ul className='space-y-4'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='text-gray-500 dark:text-gray-400 font-bold hover:text-primary dark:hover:text-primary transition-colors'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className='border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 font-medium space-y-4 md:space-y-0'>
          <p>© {currentYear} File Forge. All rights reserved.</p>
          <div className='flex items-center space-x-6'>
            <Link href='#' className='hover:text-primary transition-colors'>
              Status
            </Link>
            <Link href='#' className='hover:text-primary transition-colors'>
              Terms of Service
            </Link>
            <Link href='#' className='hover:text-primary transition-colors'>
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
