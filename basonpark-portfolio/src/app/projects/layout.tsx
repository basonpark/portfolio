import { ReactNode } from "react";

export default function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {/* Primary background: Medium brown at the top */}
      <div 
        className="fixed top-0 left-0 w-full h-full overflow-auto bg-gradient-to-b from-[#BC8F8F] via-[#BC8F8F] to-[#A67F7F]" 
        style={{ 
          zIndex: -2 // Base layer
        }}
      />
      
      {/* Secondary gradient that appears toward the bottom */}
      <div 
        className="fixed bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-[#8D6E63] to-transparent" 
        style={{ 
          zIndex: -1, // Layer on top of the primary background
          opacity: 0.6 // Subtle blend
        }}
      />
      
      {/* Original content */}
      {children}
    </>
  );
}
