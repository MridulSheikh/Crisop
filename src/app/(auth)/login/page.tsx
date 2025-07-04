"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import Image from "next/image";
import {
  useOauthLoginMutation,
  useLoginUserMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { setUser } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLoginButton from "@/components/auth/FacebookLoginButton";

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [oAuthLogin] = useOauthLoginMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  // email password login
  const onSubmit = async (data: FormData) => {
    // show a loading toast
    const toastId = toast.loading("Logging in…");

    try {
      const response = await loginUser(data).unwrap();

      const user = jwtDecode(response.data.accessToken);
      dispatch(setUser({ token: response.data.accessToken, user }));

      // update the existing loading toast into success
      toast.update(toastId, {
        render: "Logged in successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        position: "top-center",
      });

      // Optional: redirect after a short delay
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // update the existing loading toast into error
      toast.update(toastId, {
        render:
          err?.data?.errorMessag ??
          "Login failed — please check your credentials",
        type: "error",
        isLoading: false,
        autoClose: 4000,
        position: "top-center",
      });
    }
  };

  // handle google login
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (TokenRes) => {
      const toastId = toast.loading("Logging in…");
      try {
        const response = await oAuthLogin({
          accessToken: TokenRes.access_token,
          method: "google"
        }).unwrap();

        const user = jwtDecode(response.data.accessToken);
        dispatch(setUser({ token: response.data.accessToken, user }));

        toast.update(toastId, {
          render: "Logged in successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          position: "top-center",
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.update(toastId, {
          render:
            error?.data?.errorMessag ??
            "Login failed — please check your credentials",
          type: "error",
          isLoading: false,
          autoClose: 4000,
          position: "top-center",
        });
      }
    },
  });

  // handle facebook login


  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-green-50">
      {/* Left Image */}
      <div className="hidden relative md:flex items-center justify-center bg-green-100">
        <Image
          src="/img/login-page.jpg"
          alt="Fresh Grocery"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Right Login Form */}
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  disabled={isLoading}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    disabled={isLoading}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-500"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isLoading ? "Logging in…" : "Login"}
              </Button>
            </form>

            {/* OR Divider */}
            <div className="my-4 text-center">
              <div className="flex items-center justify-center space-x-2 mt-4">
                <div className="h-px w-full bg-gray-300" />
                <p className="text-sm text-gray-500">OR</p>
                <div className="h-px w-full bg-gray-300" />
              </div>
              <Button
                disabled={isLoading}
                onClick={() => handleGoogleLogin()}
                variant="outline"
                className="w-full mt-4 flex items-center justify-center space-x-2"
              >
                <Image
                  src="/img/google.png"
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span>Continue with Google</span>
              </Button>
              <FacebookLoginButton />
            </div>

            {/* Links */}
            <div className="mt-4 text-center text-sm text-gray-600 space-y-2">
              <a
                href="/forgot-password"
                className="text-green-700 hover:underline"
              >
                Forgot Password?
              </a>
              <div>
                Don’t have an account?{" "}
                <a
                  href="/signup"
                  className="text-green-700 hover:underline inline-flex items-center"
                >
                  Sign up <MoveRight size={14} className="ml-1" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
