"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Checkbox } from "@repo/ui/components/checkbox";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import AuthLayout from "../../../components/layouts/AuthLayout";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  rememberMe: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginContainer = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title='Welcome Back'
      description='Manage your cloud storage with ease.'
      loading={loading}
      setLoading={setLoading}
      callbackUrl={callbackUrl}
      footer={
        <>
          New user?{" "}
          <Link href='/auth/register' className='font-extrabold text-primary hover:underline transition-all'>
            Create Free Account
          </Link>
        </>
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
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between'>
                  <FormLabel className='font-bold text-gray-700 dark:text-gray-300'>Password</FormLabel>
                  <Link href='/auth/forgot-password' className='text-sm font-bold text-primary hover:underline transition-all'>
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder='••••••••'
                      autoComplete='current-password'
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

          <div className='flex items-center justify-between py-1'>
            <FormField
              control={form.control}
              name='rememberMe'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center space-x-2 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className='w-5 h-5 border-gray-300 dark:border-gray-700 data-[state=checked]:bg-primary rounded-md'
                    />
                  </FormControl>
                  <FormLabel className='text-sm font-semibold text-gray-500 dark:text-gray-400 cursor-pointer'>Keep me logged in</FormLabel>
                </FormItem>
              )}
            />
          </div>

          <Button
            type='submit'
            className='w-full h-14 text-lg font-extrabold shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all active:scale-[0.99] rounded-2xl cursor-pointer'
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                Verifying...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default LoginContainer;
