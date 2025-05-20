// components/AuthForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type AuthFormData = z.infer<typeof authSchema>;

interface AuthFormProps {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data: AuthFormData) => {
    // simulate async call
    await new Promise((res) => setTimeout(res, 1000));
    setMessage(`${type === "login" ? "Logged in" : "Registered"} with ${data.email}`);
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center capitalize">{type}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:opacity-90 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : type === "login" ? "Login" : "Register"}
        </button>

        {message && <p className="text-green-600 mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
}
