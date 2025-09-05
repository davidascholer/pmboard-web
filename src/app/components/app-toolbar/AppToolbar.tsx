import { cn } from "@/ui/lib/utils";
import {
  Toolbar,
  ToolbarAvatarDropdown,
  ToolbarAvatarLink,
  ToolbarBadge,
  ToolbarGroup,
} from "./Toolbar";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/state/hooks";
import { accountPaths } from "@/app/router/RouterPaths";
import { Button } from "@/ui/components/button";
import { DOMAIN } from "@/shared/constants";
import { NotificationBadge } from "../notification/NotificationBadge";

type AppToolbarProps = {
  sidebarTrigger?: React.ReactNode | boolean;
  className?: string;
  searchbar?: React.ReactNode;
  back?: boolean;
  logo?: boolean;
  customItem?: React.ReactNode;
  children?: React.ReactNode;
};

export const AppToolbar = ({
  className,
  sidebarTrigger = true,
  searchbar,
  back = false,
  logo = false,
  customItem,
  children,
}: AppToolbarProps) => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const profileImageURL =
    user && typeof user.profile_picture_url === "string"
      ? user.profile_picture_url
      : "";
  const notificationCount = user?.notifications?.filter(
    (notification) => !notification.is_read
  ).length;

  return (
    <div>
      <Toolbar
        className={cn(
          "w-screen fixed top-0 left-0 flex justify-between px-4 py-2 z-50 h-16 bg-toolbar-background text-toolbar-text",
          className
        )}
      >
        <ToolbarGroup className="gap-4">
          {/* Sidebar trigger can be false|true|a custom component */}
          {!sidebarTrigger ? null : typeof sidebarTrigger === "boolean" ? (
            <></>
          ) : (
            sidebarTrigger
          )}
          {back ? (
            <Button
              className="p-2 cursor-pointer hover-highlight rounded-full w-20"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft />
            </Button>
          ) : null}
          {logo ? (
            <button
              className="p-2 cursor-pointer hover-highlight rounded-full flex flex-col gap-1 justify-center items-center"
              onClick={() => navigate("/")}
            >
              <img src="/pmboard_icon.svg" alt={DOMAIN} className="w-8 h-8" />
              <span className="text-xs ">{DOMAIN}</span>
            </button>
          ) : null}
          {customItem ? customItem : null}
        </ToolbarGroup>
        <ToolbarGroup className="flex-1 justify-center">
          {searchbar}
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarBadge
            count={notificationCount}
            href="/notifications"
            iconSize={24}
          >
            <NotificationBadge
              count={0}
              iconSize={24}
              iconClassName="text-sidebar-primary-foreground"
              className="hover:bg-none"
            />
          </ToolbarBadge>
          {accountPaths ? (
            <ToolbarAvatarDropdown
              imageSrc={profileImageURL}
              paths={accountPaths}
            />
          ) : (
            <ToolbarAvatarLink imageSrc={profileImageURL} href="/account" />
          )}
        </ToolbarGroup>
      </Toolbar>
      {children}
    </div>
  );
};
