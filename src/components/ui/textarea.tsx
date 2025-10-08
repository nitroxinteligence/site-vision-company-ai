"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-lg border border-[#272727] bg-[#060606] px-3 py-3 text-sm",
          "min-h-[100px]",
          "placeholder:text-[#FFFFFF] placeholder:opacity-70",
          "focus:outline-none focus:ring-1 focus:ring-white focus:border-white",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "overflow-auto max-w-full resize-y scrollbar",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };