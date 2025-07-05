import { cn } from "@/ui/lib/utils";
import { Bell } from "lucide-react";
import React from "react";

interface NotificationBadgeProps {
  count: number;
  iconSize: number;
  className?: string;
  iconClassName?: string;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  iconSize,
  className,
  iconClassName
}) => {
  return (
    <div className={cn("relative bg-none", className)}>
      <Bell size={iconSize} className={iconClassName}/>
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            background: "red",
            borderRadius: "50%",
            color: "white",
            padding: "2px 6px",
            fontSize: `${iconSize/3}px`,
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
};
