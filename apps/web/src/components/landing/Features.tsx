"use client";

import Container from "@repo/ui/components/container";
import { Cloud, Lock, Share2, Smartphone, Zap, Database } from "lucide-react";
import { motion } from "motion/react";

const FeatureCard = ({ icon: Icon, title, description, color, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className='group relative p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_20px_80px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_80px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden'
  >
    {/* Background Glow */}
    <div
      className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-linear-to-br from-primary to-blue-600`}
    />

    <div className='relative z-10'>
      <div className={`p-5 rounded-2xl w-fit mb-8 transition-all duration-500 group-hover:rotate-6 shadow-lg ${color}`}>
        <Icon size={32} strokeWidth={2.5} />
      </div>
      <h3 className='text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-primary transition-colors'>
        {title}
      </h3>
      <p className='text-gray-500 dark:text-gray-400 font-bold leading-relaxed text-sm lg:text-base'>{description}</p>
    </div>
  </motion.div>
);

const Features = () => {
  const allFeatures = [
    {
      icon: Cloud,
      title: "Cloud Sync",
      description: "Access your files from anywhere, instantly synced across all your devices.",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: Lock,
      title: "Private & Secure",
      description: "AES-256 encryption ensures your data stays your data. We can't even see it.",
      color: "bg-green-500/10 text-green-500",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Generate password-protected links with custom expiration dates in a click.",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built on globally distributed edge networks for minimal latency.",
      color: "bg-yellow-500/10 text-yellow-500",
    },
    {
      icon: Database,
      title: "Reliable Storage",
      description: "99.9999% uptime guarantee with redundant backups across multiple regions.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "A seamless experience whether you're on a desktop, tablet, or smartphone.",
      color: "bg-red-500/10 text-red-500",
    },
  ];

  return (
    <section id='features' className='py-24 bg-gray-50/50 dark:bg-gray-950/50'>
      <Container>
        <div className='text-center mb-16'>
          <h2 className='text-xs font-extrabold text-primary tracking-widest uppercase mb-4'>Advanced Capabilities</h2>
          <h3 className='text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white'>
            Everything You Need <br /> To Manage Your Assets
          </h3>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {allFeatures.map((f, i) => (
            <FeatureCard key={i} index={i} {...f} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
