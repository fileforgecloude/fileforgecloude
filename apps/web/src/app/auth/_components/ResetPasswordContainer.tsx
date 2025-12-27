"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import AuthLayout from "../../../components/layouts/AuthLayout";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.resetPassword({
        newPassword: values.password,
        token: token,
      });

      if (error) {
        toast.error(error.message || "Failed to reset password. Please try again.");
      } else {
        toast.success("Password reset successful! You can now login with your new password.");
        router.push("/auth/login");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <AuthLayout
        title='Invalid Link'
        description='The password reset link is invalid or has expired.'
        showSocialAuth={false}
        footer={
          <Link href='/auth/forgot-password' className='font-extrabold text-primary hover:underline transition-all'>
            Request New Link
          </Link>
        }
      >
        <div className='text-center py-6'>
          <p className='text-gray-500 dark:text-gray-400 mb-8 font-medium'>Please request a new password reset link to continue.</p>
          <Button asChild className='w-full h-14 rounded-2xl font-bold'>
            <Link href='/auth/forgot-password'>Go to Forgot Password</Link>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title='Set New Password'
      description='Enter your new password below to regain access to your account.'
      showSocialAuth={false}
      footer={
        <Link href='/auth/login' className='font-extrabold text-primary hover:underline transition-all'>
          Back to Login
        </Link>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold text-gray-700 dark:text-gray-300'>New Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder='••••••••'
                      autoComplete='new-password'
                      className='h-14 pl-5 pr-12 focus-visible:ring-primary/20 transition-all border-gray-200 dark:border-gray-800 bg-gray-50/40 dark:bg-gray-800/40 rounded-2xl text-base'
                      {...field}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors'
                    >
                      {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold text-gray-700 dark:text-gray-300'>Confirm Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder='••••••••'
                      autoComplete='new-password'
                      className='h-14 pl-5 pr-12 focus-visible:ring-primary/20 transition-all border-gray-200 dark:border-gray-800 bg-gray-50/40 dark:bg-gray-800/40 rounded-2xl text-base'
                      {...field}
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors'
                    >
                      {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='w-full h-14 text-lg font-extrabold shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all active:scale-[0.99] rounded-2xl cursor-pointer'
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                Resetting Password...
              </>
            ) : (
              "Save New Password"
            )}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default ResetPasswordContainer;
