"use client";

import LeadForm from "./components/LeadForm";
import Visual from "./components/Visual";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-y-3">
      <Visual/>
      <div className="flex flex-col items-center text-center gap-y-2 w-1/2">
           <Image
              src="/doc_info.png"
              alt="left image"
              width={50}
              height={50}
            />
        <h1 className = "text-xl font-bold">Want to understand your visa options?</h1>
        <p className = "font-bold">
          Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals
        </p>
      </div>
      <LeadForm />
    </main>
  );
}
