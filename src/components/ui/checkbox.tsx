"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, style, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(event.target.checked);
      }
    };

    return (
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className={cn(
          "h-5 w-5 rounded border border-[#272727] bg-[#060606]",
          "focus:outline-none focus:ring-1 focus:ring-white focus:border-white",
          "cursor-pointer",
          className
        )}
        ref={ref}
        style={{
          accentColor: "#ffffff",
          ...style
        }}
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };