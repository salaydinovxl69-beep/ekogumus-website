import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_14px_32px_rgba(46,125,50,0.18)] active:translate-y-0 active:scale-[0.99] active:shadow-[0_10px_20px_rgba(46,125,50,0.16)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive glass-btn",
  {
    variants: {
      variant: {
        default:
          "bg-primary/90 text-primary-foreground hover:bg-primary/82 active:bg-primary/75 border-white/30 dark:border-white/10",
        destructive:
          "bg-destructive/90 text-white hover:bg-destructive/82 active:bg-destructive/75 border-white/20 dark:border-white/8 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background/80 text-foreground hover:bg-accent/70 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary/90 text-secondary-foreground hover:bg-secondary/82 active:bg-secondary/75 border-white/25 dark:border-white/8",
        ghost:
          "hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-accent/40",
        link: "text-primary underline-offset-4 hover:underline",
        glass:
          "text-foreground dark:text-white border-[color:var(--glass-border-strong)] bg-[color:var(--glass-surface-strong)] shadow-[0_16px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_18px_46px_rgba(0,0,0,0.22)]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
