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
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import AuthLayout from "../../../components/layouts/AuthLayout";

const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterContainer = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
      } else {
        toast.success("Account created successfully!");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title='Create Account'
      description='Start your journey with File Forge today.'
      loading={loading}
      setLoading={setLoading}
      callbackUrl={callbackUrl}
      footer={
        <>
          Already have an account?{" "}
          <Link href='/auth/login' className='font-extrabold text-primary hover:underline transition-all'>
            Login to Account
          </Link>
        </>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold text-gray-700 dark:text-gray-300'>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='John Doe'
                    autoComplete='name'
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
                <FormLabel className='font-bold text-gray-700 dark:text-gray-300'>Password</FormLabel>
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

          <Button
            type='submit'
            className='w-full h-14 text-lg font-extrabold shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all active:scale-[0.99] rounded-2xl cursor-pointer'
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default RegisterContainer;
