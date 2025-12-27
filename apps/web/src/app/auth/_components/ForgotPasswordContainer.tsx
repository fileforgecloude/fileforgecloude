"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import AuthLayout from "../../../components/layouts/AuthLayout";

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordContainer = () => {
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setLoading(true);
    try {
      const { error } = await authClient.requestPasswordReset({
        email: values.email,
        redirectTo: "/auth/reset-password",
      });

      if (error) {
        toast.error(error.message || "Failed to send reset link. Please try again.");
      } else {
        setIsSent(true);
        toast.success("Password reset link sent to your email!");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (isSent) {
    return (
      <AuthLayout
        title='Check your email'
        description="We've sent a password reset link to your email address."
        showSocialAuth={false}
        footer={
          <Link href='/auth/login' className='font-extrabold text-primary hover:underline transition-all'>
            Back to Login
          </Link>
        }
      >
        <div className='text-center py-6'>
          <p className='text-gray-500 dark:text-gray-400 mb-8 font-medium'>
            Didn&apos;t receive the email? Check your spam folder or try again.
          </p>
          <Button variant='outline' className='w-full h-14 rounded-2xl font-bold' onClick={() => setIsSent(false)}>
            Try Again
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title='Forgot Password?'
      description="Enter your email and we'll send you a link to reset your password."
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
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold text-gray-700 dark:text-gray-300'>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder='name@example.com'
                    autoComplete='email'
                    className='h-14 px-5 focus-visible:ring-primary/20 transition-all border-gray-200 dark:border-gray-800 bg-gray-50/40 dark:bg-gray-800/40 rounded-2xl text-base'
                    {...field}
                  />
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
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPasswordContainer;
