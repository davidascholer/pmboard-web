import { Button } from "@/ui/components/button";
import { useSidebar } from "@/ui/components/sidebar";
import { cn } from "@/ui/lib/utils";
import { Menu } from "lucide-react";

function SidebarTrigger({
    className,
    onClick,
    ...props
  }: React.ComponentProps<typeof Button>) {
    const { toggleSidebar } = useSidebar();
  
    return (
      <Button
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        variant="ghost"
        size="icon"
        className={cn("h-7 w-7 cursor-pointer text-white", className)}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <Menu className="!w-full !h-full" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    );
  }
  
  export default SidebarTrigger;