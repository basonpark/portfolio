import { ReactNode } from "react";

export default function QuotesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {/* Fixed positioning to cover the entire page with the beige gradient */}
      <div 
        className="fixed top-0 left-0 w-full h-full overflow-auto" 
        style={{ 
          zIndex: -1,
          background: "linear-gradient(to right, #f3f0e5, #e5ded3, #d5c9bb, #bfb5a5, #e1d2c2)"
        }}
      />
      {/* Original content */}
      {children}
    </>
  );
}
