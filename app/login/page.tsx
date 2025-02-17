"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    if (result?.ok) {
      router.push("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center w-1/2 bg-white rounded-lg shadow-lg p-8">
        <Image src="/dice.png" alt="Dice Icon" width={50} height={50} />
        <h1 className="text-2xl font-bold mt-4">Admin Login</h1>
        {error && <p className="text-red-500 text-md mt-2 font-bold">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full mt-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg font-bold transition"
          >
            Login
          </button>
          <div className="mt-4">
            <Link href="/">
              <p className="text-black  font-bold text-sm text-center">
                Go back to Homepage
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
