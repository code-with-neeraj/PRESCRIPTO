import React from "react"; // Import React
import { assets } from "../assets/assets"; // Import assets for images

// Header component: Hero section for homepage
const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-[#3A4FFF] to-[#202C80] rounded-lg px-6 md:px-10 lg:px-20">
      {" "}
      {/* Main header container */}
      {/*-----------LEFT SIDE-----------*/}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto mf:py-[10vw] md:mb-[-30px]">
        {" "}
        {/* Left section with text and button */}
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          {" "}
          {/* Main heading */}
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          {" "}
          {/* Subheading and group image */}
          <img className="w-28" src={assets.group_profiles} alt="" />{" "}
          {/* Group profiles image */}
          <p>
            Simply browse through our extensive list of trusted doctors,{" "}
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          {" "}
          {/* Button to scroll to speciality section */}
          Book appointment{" "}
          <img className="w-3" src={assets.arrow_icon} alt="" />{" "}
          {/* Arrow icon */}
        </a>
      </div>
      {/*-----------RIGHT SIDE-----------*/}
      <div className="md:w-1/2 relative">
        {" "}
        {/* Right section with header image */}
        <img
          className="w-full md:absolute lg:relative bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />{" "}
        {/* Header image */}
      </div>
    </div>
  );
};

export default Header; // Export the Header component
