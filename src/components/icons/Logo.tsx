import { cn } from "@/lib/utils";

export const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={cn(className)}
    {...props}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="1" />
      </linearGradient>
    </defs>
    <circle cx="40" cy="50" r="30" fill="url(#grad1)" fillOpacity="0.7" />
    <circle cx="60" cy="50" r="30" fill="url(#grad1)" fillOpacity="0.7" />
  </svg>
);
