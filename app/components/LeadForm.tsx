"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CountrySelector from "./CountrySelector";
import Image from "next/image";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  linkedin: z.string().url("Invalid LinkedIn URL").optional(),
  visaCategories: z.array(z.string()).min(1, "At least one visa category is required"),
  country: z.string().min(1, "Country of Citizenship is required"),
  resume: z.any().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function LeadForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const { resume, ...otherData } = data;
      const formData = new FormData();
      Object.entries(otherData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, value);
        }
      });
      if (resume && resume.length > 0) {
        formData.append("resume", resume[0]);
      }
      const response = await fetch("/api/leads", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to submit");
      setSuccess("Lead submitted successfully!");
      reset();
      router.push("/success");
    } catch (error) {
      console.error(error);
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 rounded-lg w-full max-w-[450px]">
      <div>
        <input {...register("firstName")} className="border p-2 w-full rounded" placeholder="First Name" />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
      </div>
      <div>
        <input {...register("lastName")} className="border p-2 w-full rounded" placeholder="Last Name" />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
      </div>
      <div>
        <input {...register("email")} type="email" className="border p-2 w-full rounded" placeholder="Email" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <CountrySelector name="country" control={control} label="Country of Citizenship" />
      <div>
        <input {...register("linkedin")} type="url" className="border p-2 w-full rounded" placeholder="LinkedIn / Personal Website URL" />
        {errors.linkedin && <p className="text-red-500 text-sm">{errors.linkedin.message}</p>}
      </div>
      <div>
        <label className="block font-medium" htmlFor="resume">Upload Resume (Optional)</label>
        <input {...register("resume")} type="file" id="resume" className="border p-2 w-full rounded" accept=".pdf,.doc,.docx" />
      </div>
      <div>
        <div className="flex flex-col items-center">
          <Image src="/dice.png" alt="left image" width={50} height={50} />
          <p className="block text-center text-xl font-bold">Visa Categories of Interest?</p>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" value="O-1" {...register("visaCategories")} className="h-4 w-4" />
            <span>O-1</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" value="EB-1A" {...register("visaCategories")} className="h-4 w-4" />
            <span>EB-1A</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" value="EB-2 NIW" {...register("visaCategories")} className="h-4 w-4" />
            <span>EB-2 NIW</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" value="I don't know" {...register("visaCategories")} className="h-4 w-4" />
            <span>I don't know</span>
          </label>
        </div>
        {errors.visaCategories && <p className="text-red-500 text-sm">{errors.visaCategories.message}</p>}
      </div>
      <div className="flex flex-col items-center gap-y-5 text-xl font-bold">
        <Image src="/heart.png" alt="heart image" width={60} height={50} />
        <h1>How can we help you?</h1>
        <textarea {...register("message")} className="border p-2 w-full rounded" rows={3}></textarea>
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 font-bold">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
    </form>
  );
}
