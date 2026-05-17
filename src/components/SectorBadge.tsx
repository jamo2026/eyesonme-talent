type Sector = "it" | "hw";

interface SectorBadgeProps {
  sector: Sector;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const labels: Record<Sector, string> = {
  it: "CodeOnMe · IT",
  hw: "HandsOnMe · Handwerk",
};

const colors: Record<Sector, string> = {
  it: "bg-brand-it text-white",
  hw: "bg-brand-hw text-white",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export default function SectorBadge({ sector, size = "md", className = "" }: SectorBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${colors[sector]} ${sizes[size]} ${className}`}>
      {labels[sector]}
    </span>
  );
}
