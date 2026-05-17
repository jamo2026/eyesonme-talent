import React from "react";

type Variant = "it" | "hw" | "outline" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  it: "bg-brand-it text-white hover:opacity-90 active:scale-95",
  hw: "bg-brand-hw text-white hover:opacity-90 active:scale-95",
  outline: "border-2 border-navy text-navy bg-transparent hover:bg-navy hover:text-white",
  ghost: "text-navy bg-transparent hover:bg-gray-100",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3 text-lg",
};

export default function Button({ variant = "it", size = "md", className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
