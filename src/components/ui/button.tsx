import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "gradient-accent text-primary-foreground shadow-surface hover:shadow-glow-accent rounded-[10px]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-[10px]",
        outline: "border border-border bg-transparent text-foreground hover:bg-surface-2 hover:border-[hsl(var(--border-medium))] rounded-[10px]",
        secondary: "bg-surface-2 text-foreground hover:bg-surface-3 rounded-[10px]",
        ghost: "hover:bg-surface-2 text-foreground rounded-[10px]",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "gradient-accent text-primary-foreground shadow-surface hover:shadow-glow-accent rounded-[10px]",
        "outline-green": "border border-status-green/30 text-status-green bg-green-soft hover:bg-status-green/20 rounded-[10px]",
        "outline-amber": "border border-status-orange/30 text-status-orange bg-orange-soft hover:bg-status-orange/20 rounded-[10px]",
        "outline-gold": "border border-[hsl(45,93%,47%)]/30 text-[hsl(45,93%,60%)] bg-[hsl(45,93%,47%,0.1)] hover:bg-[hsl(45,93%,47%,0.2)] rounded-[10px]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
        xs: "h-7 px-2.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
