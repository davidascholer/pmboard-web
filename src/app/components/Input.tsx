import { cn } from "@/ui/lib/utils";
import * as React from "react";

type InputAltProps = {
  searchInputValue: string;
  onInputChanged: (value: string) => void;
  className?: string;
} & React.ComponentProps<"input">;

const InputAlt = React.forwardRef<HTMLInputElement, InputAltProps>(
  ({ type, searchInputValue, onInputChanged, className, ...props }, ref) => {

    return (
      <input
        type={type}
        value={searchInputValue}
        onChange={(e) => onInputChanged(e.target.value)}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
InputAlt.displayName = "InputAlt";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, InputAlt };
