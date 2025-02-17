"use client";

import React, { useMemo } from "react";
import { Control, Controller } from "react-hook-form";
import { COUNTRY_MAP } from "../data/countryCodes";
import dynamic from "next/dynamic";

interface CountrySelectorProps {
  name: string;
  control: Control<any>;
  label?: string;
}

export default function CountrySelector({ name, control, label }: CountrySelectorProps) {
const Select = dynamic(() => import("react-select"), { ssr: false })
  const options = useMemo(
    () =>
      Object.entries(COUNTRY_MAP).map(([code, countryName]) => ({
        value: code,
        label: countryName,
      })),
    []
  );

  return (
    <div>
      {label && <label className="block font-medium mb-1">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const selectedOption = options.find((opt) => opt.value === field.value);
          return (
            <>
              <Select
                options={options}
                value={selectedOption}
                onChange={(option) => field.onChange(option?.value || "")}
                placeholder="Country of Citizenship"
              />
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
