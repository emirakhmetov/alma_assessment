import React from 'react'
import Image from "next/image";

const Visual = () => {
  return (
    <div className = "flex min-w-full items-center bg-[#DADEA6]">
          <Image
        src="/visual_left.png"
        alt="left image"
        width={150}
        height={150}
      />
        <div className = "flex flex-col bg-[#DADEA6] mx-12">
        <Image
        src="/alma_logo.png"
        alt="left image"
        width={50}
        height={50}
      />
            <h1 className='text-4xl '>Get An Assessment</h1>
            <h1 className='text-4xl'>Of Your Immigration Case</h1>
        </div>
    </div>
  )
}

export default Visual