import { Tooltip, TooltipProvider } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "@/ui/components/tooltip";

type AppTooltipProps = React.PropsWithChildren<{
  message: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}>;

/**
 * The TooltipProvider (required) provides a context for tooltip settings to be shared across
 * all tooltips within the application.
 * Override by specifying props in the Tooltip component.
 */
export const AppTooltip = ({
  message,
  side = "top",
  align = "center",
  children,
}: AppTooltipProps) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        className="bg-bee-accent-dark text-white p-2 rounded shadow-lg z-50"
      >
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
