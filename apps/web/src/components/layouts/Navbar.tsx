"use client";

import Link from "next/link";
import { Cloud, Menu, X, LayoutDashboard, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@repo/ui/components/button";
import { ThemeToggle } from "../common/ThemeToggle";
import { cn } from "@repo/ui/lib/utils";
import { authClient, useSession } from "@/lib/auth-client";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";

const NavSkeleton = () => (
  <div className='flex items-center space-x-2 p-1.5 animate-pulse'>
    <div className='w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800' />
    <div className='w-4 h-4 rounded bg-gray-200 dark:bg-gray-800' />
  </div>
);

const UserMenu = ({ user }: { user: { image?: string | null; name: string; email: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-blue-600 dark:text-blue-400" },
    { label: "Profile", icon: User, href: "/profile", color: "text-purple-600 dark:text-purple-400" },
    { label: "Settings", icon: Settings, href: "/settings", color: "text-amber-600 dark:text-amber-400" },
  ];

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-2 p-1 rounded-full hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all outline-hidden group border border-transparent hover:border-gray-200 dark:hover:border-gray-700'
      >
        <div className='relative w-9 h-9 rounded-full bg-sky-600 p-0.5 shadow-xl group-hover:scale-105 transition-transform overflow-hidden'>
          <div className='w-full h-full rounded-full bg-white dark:bg-gray-950 overflow-hidden flex items-center justify-center'>
            {user.image ? (
              <img src={user.image} alt={user.name} className='w-full h-full object-cover' />
            ) : (
              <span className='text-primary font-bold text-sm tracking-tight'>{user.name?.charAt(0).toUpperCase()}</span>
            )}
          </div>
        </div>
        <ChevronDown size={14} className={cn("text-gray-400 transition-transform duration-500", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 15, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className='absolute right-0 mt-4 w-80 bg-white/90 dark:bg-gray-900/70 backdrop-blur-2xl rounded-4xl border border-gray-200/50 dark:border-gray-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden z-60'
          >
            {/* Header / Info Section */}
            <div className='relative p-3 text-center border-b border-gray-100 dark:border-gray-800/50 overflow-hidden bg-linear-to-b from-gray-50/50 to-transparent dark:from-gray-900/30'>
              <div className='relative w-20 h-20 mx-auto rounded-full bg-linear-to-tr from-primary/10 to-blue-600/10 flex items-center justify-center p-1 mb-4 group'>
                <div className='w-full h-full rounded-full'>
                  {user.image ? (
                    <img src={user.image} alt={user.name} className='w-full h-full object-cover rounded-full' />
                  ) : (
                    user.name?.charAt(0).toUpperCase()
                  )}
                </div>
              </div>
              <h4 className='font-extrabold text-lg text-gray-900 dark:text-white truncate px-2'>{user.name}</h4>
              <p className='text-xs font-medium text-gray-500 dark:text-gray-400 truncate mt-1 bg-gray-100 dark:bg-gray-800/50 py-1 px-3 rounded-full inline-block'>
                {user.email}
              </p>
            </div>

            {/* Menu Links */}
            <div className='p-1 space-y-1'>
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className='flex items-center space-x-3 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900/50 text-gray-700 dark:text-gray-300 font-bold transition-all group relative border border-transparent hover:border-gray-100 dark:hover:border-gray-800'
                >
                  <div
                    className={cn(
                      "p-2.5 rounded-xl transition-all duration-300 bg-gray-50 dark:bg-gray-800/50 group-hover:scale-110",
                      item.color
                    )}
                  >
                    <item.icon size={20} strokeWidth={2.5} />
                  </div>
                  <span className='text-sm'>{item.label}</span>
                  <div className='absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <ChevronDown size={14} className='-rotate-90 text-gray-400' />
                  </div>
                </Link>
              ))}
            </div>

            {/* Logout Section */}
            <div className='p-1 bg-gray-50/50 dark:bg-gray-900/30'>
              <button
                onClick={handleSignOut}
                className='w-full flex items-center space-x-3 p-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 font-bold transition-all cursor-pointer group border border-transparent hover:border-red-100 dark:hover:border-red-500/20'
              >
                <div className='p-2.5 bg-red-100 dark:bg-red-500/20 rounded-xl group-hover:scale-110 transition-transform'>
                  <LogOut size={20} strokeWidth={2.5} />
                </div>
                <span className='text-sm'>Sign out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, isPending } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Team", href: "/team" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 border-b",
        scrolled
          ? "bg-white/70 dark:bg-gray-950/40 backdrop-blur-2xl border-gray-200/50 dark:border-gray-900/50 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className='container mx-auto px-6 flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='flex items-center space-x-2.5 group'>
          <div className='p-2.5 bg-linear-to-tr from-primary to-blue-600 rounded-2xl text-white group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-primary/20'>
            <Cloud size={24} strokeWidth={2.5} />
          </div>
          <span className='text-2xl font-black tracking-tighter text-gray-900 dark:text-white'>File Forge</span>
        </Link>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center space-x-10'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-300 hover:-translate-y-0.5'
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className='hidden md:flex items-center space-x-6'>
          <ThemeToggle />
          {isPending ? (
            <NavSkeleton />
          ) : session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <div className='flex items-center space-x-3'>
              <Link href='/auth/login'>
                <Button variant='ghost' className='font-bold rounded-xl px-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all'>
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center space-x-4'>
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary transition-all active:scale-95'
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className='md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 overflow-hidden shadow-2xl'
          >
            <div className='flex flex-col items-center w-full px-6 py-10 space-y-8'>
              {session?.user && (
                <div className='flex flex-col items-center p-8 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-[3rem] w-full border border-gray-100 dark:border-gray-800 shadow-xl'>
                  <div className='w-24 h-24 rounded-3xl bg-linear-to-tr from-primary to-blue-600 p-1 mb-6 shadow-2xl'>
                    <div className='w-full h-full rounded-[1.25rem] bg-white dark:bg-gray-900 overflow-hidden flex items-center justify-center border-4 border-white dark:border-gray-900'>
                      {session.user.image ? (
                        <img src={session.user.image} alt={session.user.name} className='w-full h-full object-cover' />
                      ) : (
                        <span className='text-primary font-black text-4xl'>{session.user.name?.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                  </div>
                  <p className='font-black text-2xl text-gray-900 dark:text-white truncate max-w-full'>{session.user.name}</p>
                  <p className='text-sm font-medium text-gray-500 dark:text-gray-400 truncate max-w-full bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-full mt-2'>
                    {session.user.email}
                  </p>
                </div>
              )}

              <div className='w-full flex flex-col items-center space-y-4'>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className='w-full text-center py-4 text-xl font-black text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all rounded-3xl'
                  >
                    {link.name}
                  </Link>
                ))}

                {session?.user && (
                  <div className='w-full space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800'>
                    <Link
                      href='/dashboard'
                      onClick={() => setIsOpen(false)}
                      className='w-full flex items-center justify-center space-x-3 py-4 text-xl font-black text-primary hover:bg-primary/5 transition-all rounded-3xl'
                    >
                      <LayoutDashboard size={24} />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={async () => {
                        await authClient.signOut();
                        setIsOpen(false);
                        window.location.href = "/";
                      }}
                      className='w-full flex items-center justify-center space-x-3 py-4 text-xl font-black text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all rounded-3xl'
                    >
                      <LogOut size={24} />
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>

              {!session?.user && (
                <div className='flex flex-col w-full space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800'>
                  <Link href='/auth/login' className='w-full'>
                    <Button variant='outline' className='w-full h-16 rounded-3xl font-black text-xl border-2'>
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
