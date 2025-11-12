import React from "react";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className = "" }) => (
  <div
    className={`w-full  text-white border border-cyan-800  mb-6  mx-auto ${className}`}
  >
    <p className="font-normal text-[20px] leading-12 text-center bg-green-700 p-4">
      {children}
    </p>
  </div>
);

export default Header;
