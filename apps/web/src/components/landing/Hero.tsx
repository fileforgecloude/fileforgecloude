"use client";

import Link from "next/link";
import { ArrowRight, Cloud, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@repo/ui/components/button";

const Hero = () => {
  return (
    <section className='relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden'>
      {/* Background Decor */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full' />
        <div className='absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full' />
      </div>

      <div className='container mx-auto px-6'>
        <div className='flex flex-col items-center text-center max-w-4xl mx-auto'>
          {/* Badge */}
          <div className='relative mb-8 animate-fade-in'>
            {/* Top center shine */}
            <div className='absolute -top-0 left-1/2 -translate-x-1/2 h-[2px] w-28 bg-gradient-to-r from-transparent via-primary to-transparent' />

            {/* Badge */}
            <div className='flex items-center px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/70'>
              <span className='text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest'>
                The Future of File Storage
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className='text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6'>
            Secure Your Files in our <br />
            <span className='bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent'>Cloud Forge</span>
          </h1>

          {/* Description */}
          <p className='text-lg lg:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed'>
            Experience lightning-fast file uploads, military-grade encryption, and seamless sharing across all your devices. Built for
            developers and teams.
          </p>

          {/* Actions */}
          <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto'>
            <Link href='/dashboard' className='w-full sm:w-auto'>
              <Button size='lg' className='h-16 px-10 text-lg font-bold rounded-2xl w-full sm:w-auto group shadow-2xl shadow-primary/30'>
                Get Started for Free
                <ArrowRight className='ml-2 group-hover:translate-x-1 transition-transform' />
              </Button>
            </Link>
          </div>

          {/* Subfeatures */}
          <div className='grid grid-cols-2 md:grid-cols-3 gap-8 mt-20 w-full border-t border-gray-100 dark:border-gray-800 pt-12'>
            <div className='flex flex-col items-center space-y-2'>
              <div className='p-3 bg-primary/10 rounded-2xl text-primary'>
                <ShieldCheck size={28} />
              </div>
              <span className='font-bold text-gray-900 dark:text-white'>End-to-End Encrypted</span>
            </div>
            <div className='flex flex-col items-center space-y-2'>
              <div className='p-3 bg-blue-500/10 rounded-2xl text-blue-500'>
                <Cloud size={28} />
              </div>
              <span className='font-bold text-gray-900 dark:text-white'>10GB Free Storage</span>
            </div>
            <div className='hidden md:flex flex-col items-center space-y-2'>
              <div className='p-3 bg-purple-500/10 rounded-2xl text-purple-500'>
                <Zap size={28} />
              </div>
              <span className='font-bold text-gray-900 dark:text-white'>Instant Sharing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
