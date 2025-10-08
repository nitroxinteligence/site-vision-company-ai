import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // Generate a visual representation of the dashes for progress indication
  const renderProgressDashes = () => {
    const dashes = [];
    // Use the actual totalSteps instead of a fixed number
    const maxDashes = totalSteps;
    
    // Calculate how many dashes should be colored based on current progress
    const coloredDashesCount = Math.floor((currentStep / totalSteps) * maxDashes);
    
    for (let i = 0; i < maxDashes; i++) {
      dashes.push(
        <div
          key={`dash-${i}`}
          style={{
            width: `calc((100% / ${maxDashes}) - 8px)`, // Dynamically calculate width based on total steps
            minWidth: "15px", // Minimum width for very small screens
            height: "4px",
            background: i < coloredDashesCount ? "linear-gradient(to right, #ffffff, #888888)" : "#333333",
            borderRadius: "2px",
            transition: "background-color 0.3s ease, width 0.3s ease"
          }}
        />
      );
    }
    
    return dashes;
  };
  
  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto 20px auto",
        padding: "10px 0",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
          padding: "4px",
          width: "100%",
        }}
      >
        {renderProgressDashes()}
      </div>
    </div>
  );
}