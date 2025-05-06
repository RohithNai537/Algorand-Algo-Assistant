
import React from "react";

const AlgorandLogo = ({ className }: { className?: string }) => {
  return (
    <svg 
      className={className} 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M20.416 16.289L14.981 4.883C14.799 4.517 14.416 4.288 14.007 4.288H10.047C9.638 4.288 9.255 4.517 9.072 4.883L3.637 16.289C3.455 16.655 3.455 17.113 3.637 17.479L5.617 21.404C5.799 21.77 6.183 22 6.592 22H17.461C17.87 22 18.254 21.77 18.436 21.404L20.416 17.479C20.598 17.113 20.598 16.655 20.416 16.289ZM10.316 6.288H13.739L18.461 16.288H15.039L10.316 6.288Z" 
        fill="currentColor" 
      />
    </svg>
  );
};

export default AlgorandLogo;
