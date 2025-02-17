"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center w-1/2">
        <Image src="/dice.png" alt="Dice Icon" width={50} height={50} />
        <h1 className="text-2xl font-bold mt-4">Access Denied</h1>
        <p className="text-md text-center mt-2 font-bold">
          You are not authenticated to access this page.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/login">
            <button className="bg-black text-white py-2 px-4 rounded-lg font-bold text-sm">
              Login
            </button>
          </Link>
          <Link href="/">
            <button className="bg-black text-white py-2 px-4 rounded-lg font-bold text-sm">
              Go back to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
