"use client";

import Link from "next/link";
import { Cloud, ArrowLeft, Loader2 } from "lucide-react";
import { Separator } from "@repo/ui/components/separator";
import SocialAuth from "../../app/auth/_components/SocialAuth";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  showSocialAuth?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  loading?: boolean;
  callbackUrl?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  description,
  children,
  footer,
  showSocialAuth = true,
  setLoading,
  loading = false,
  callbackUrl = "/",
}) => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !isPending) {
      router.push("/");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950'>
        <Loader2 className='h-10 w-10 animate-spin text-primary' />
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <>
      <Link
        href='/'
        className='flex ml-4 mt-4 items-center space-x-2 text-sm text-gray-500 hover:text-primary transition-colors w-fit group'
      >
        <ArrowLeft size={18} className='group-hover:-translate-x-1 transition-transform' />
        <span className='font-medium'>Back to Home</span>
      </Link>
      <div className='flex relative items-center justify-center bg-gray-50 dark:bg-gray-950 p-4'>
        <div className='flex w-full max-w-[1200px] h-fit min-h-[750px] bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 transition-all relative'>
          {/* Left Side: Full Realistic Cloud Image */}
          <div className='hidden lg:block w-3/5 relative overflow-hidden'>
            <img
              src='/assets/realistic-cloud-bg.png'
              alt='Cloud Storage Concept'
              className='object-cover w-full h-full hover:scale-105 transition-transform duration-1000'
            />
            <div className='absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent pointer-events-none' />
          </div>

          {/* Right Side: Form Panel */}
          <div className='w-full lg:w-2/5 p-8 lg:p-12 flex flex-col relative text-center lg:text-left'>
            <div className='flex flex-col justify-center h-full'>
              <div className='flex items-center space-x-2 text-primary mb-10 justify-center lg:justify-start mt-8 lg:mt-0'>
                <div className='p-2 bg-primary rounded-xl text-white'>
                  <Cloud size={24} />
                </div>
                <span className='text-2xl font-bold tracking-tight'>File Forge</span>
              </div>

              <div className='mb-8'>
                <h2 className='text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight'>{title}</h2>
                <p className='text-gray-500 dark:text-gray-400 font-medium'>{description}</p>
              </div>

              {showSocialAuth && setLoading && (
                <>
                  <SocialAuth setLoading={setLoading} loading={loading} callbackUrl={callbackUrl} />

                  <div className='relative my-8'>
                    <div className='absolute inset-0 flex items-center'>
                      <Separator className='bg-gray-200 dark:bg-gray-700' />
                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                      <span className='bg-white dark:bg-gray-900 px-4 text-muted-foreground font-semibold tracking-wider'>
                        Or continue with email
                      </span>
                    </div>
                  </div>
                </>
              )}

              {children}

              <div className='text-center text-base text-gray-500 dark:text-gray-400 mt-10'>{footer}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
