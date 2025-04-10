import { useState } from "react";
import CertificationPage from "./CertificationPage";

export default function HeaderOrNavbar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      {/* Hover Trigger */}
      <div
        className="px-4 py-2 text-gray-700 cursor-pointer hover:text-blue-600 font-medium"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Certification

        {/* Dropdown only shows on hover */}
        {isHovered && (
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="absolute left-0 top-full mt-1 w-full z-50"
          >
            <CertificationPage />
          </div>
        )}
      </div>
    </div>
  );
}
