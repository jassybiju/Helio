import React from "react";

type Variant = "primary" | "secondary" | "danger";
type Size = "sm" | "md" | "lg";

type ClayWrapperProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  noPadding?: boolean;
};

const ClayWrapper = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  noPadding,
}: ClayWrapperProps) => {
  const baseStyles =
    "rounded-2xl transition-all duration-300 active:scale-[0.98]";
  const variantStyles = {
    primary:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_18px_40px_rgba(37,99,235,0.35),0_8px_20px_rgba(37,99,235,0.25),inset_0_1px_0px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_24px_52px_rgba(37,99,235,0.4),0_12px_28px_rgba(37,99,235,0.3),inset_0_1px_0px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.1)] hover:scale-105 active:shadow-[0_10px_20px_rgba(37,99,235,0.3),inset_0_1px_0px_rgba(255,255,255,0.3),inset_0_2px_6px_rgba(0,0,0,0.2)]",

    secondary:
      "bg-slate-50 border border-slate-200 text-slate-900 shadow-[0_10px_25px_rgba(0,0,0,0.08),0_4px_10px_rgba(0,0,0,0.05),inset_0_1px_0px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.12),0_6px_15px_rgba(0,0,0,0.08),inset_0_1px_0px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05)] hover:border-blue-300 hover:scale-[1.02]",

    danger:
      "bg-gradient-to-b from-red-500 to-red-700 text-white shadow-[0_18px_40px_rgba(220,38,38,0.35),0_8px_20px_rgba(220,38,38,0.25),inset_0_1px_0px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_24px_52px_rgba(220,38,38,0.4),0_12px_28px_rgba(220,38,38,0.3),inset_0_1px_0px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.1)] hover:scale-105 active:shadow-[0_10px_20px_rgba(220,38,38,0.3),inset_0_1px_0px_rgba(255,255,255,0.3),inset_0_2px_6px_rgba(0,0,0,0.2)]",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${!noPadding ? sizeStyles[size] : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default ClayWrapper;
