"use-client"

import React, { useState, useMemo } from 'react'
import { Control, Controller } from 'react-hook-form';
import Select from 'react-select'
import countryList from 'react-select-country-list'

interface CountrySelectorProps {
    name: string,
    control: Control<any>;
}
function CountrySelector({name, control}:CountrySelectorProps) {
  const options = useMemo(() => countryList().getData(), []);


  return (
  <Controller
  name={name}
  control={control}
  render={({ field, fieldState }) => {
    const selectedOption = options.find(opt => opt.value === field.value);
    return (
      <>
        <Select
          options={options}
          value={selectedOption}
          onChange={(option) => field.onChange(option?.value || "")}
          placeholder = "Country Of Citizenship"
        />
        {fieldState.error && (
          <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
        )}
      </>
    );
  }}
/>
  )
}

export default CountrySelector