"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CountrySelector from "./CountrySelector";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  linkedin: z.string().url("Invalid LinkedIn URL").optional(),
  visaCategories: z.array(z.string()).min(1, "At least one visa category is required"),
  country:z.string().min(1, "Country of Citizenship is required"),
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

  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    console.log(data)
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setSuccess("Lead submitted successfully!");
      reset();
    } catch (error) {
      console.error(error);
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 rounded-lg w-full max-w-lg">
        <div className = "flex flex-col items-center text-center gap-y-2">
            <h1>Want to understand your visa options?</h1>
            <p>Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals</p>
        </div>
      <div>
        <input {...register("firstName")} className="border p-2 w-full rounded" placeholder="First Name"/>
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
      </div>

      <div>
        <input {...register("lastName")} className="border p-2 w-full rounded "placeholder="Last Name" />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
      </div>

      <div>
        <input {...register("email")} type="email" className="border p-2 w-full rounded" placeholder="Email" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

        <CountrySelector name = "country" control={control}/>
      <div>
        <input {...register("linkedin")} type="url" className="border p-2 w-full rounded" placeholder="LinkedIn / Personal Website URL"/>
        {errors.linkedin && <p className="text-red-500 text-sm">{errors.linkedin.message}</p>}
      </div>

      <div>
        <p className="block font-medium text-center">Visa Categories of Interest?</p>
        <div className="flex flex-col gap-2 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="O-1"
              {...register("visaCategories")}
              className="h-4 w-4"
            />
            <span>O-1</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="EB-1A"
              {...register("visaCategories")}
              className="h-4 w-4"
            />
            <span>EB-1A</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="EB-2 NIW"
              {...register("visaCategories")}
              className="h-4 w-4"
            />
            <span>EB-2 NIW</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="I don't know"
              {...register("visaCategories")}
              className="h-4 w-4"
            />
            <span>I don&apos;t know</span>
          </label>
        </div>
        {errors.visaCategories && (
          <p className="text-red-500 text-sm">{errors.visaCategories.message}</p>
        )}
      </div>

      <div className = "flex flex-col items-center gap-y-5">
            <h1>How can we help you?</h1>
        <textarea {...register("message")} className="border p-2 w-full rounded" rows={3}></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
    </form>
  );
}
