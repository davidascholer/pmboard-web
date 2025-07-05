"use client";

import * as React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";

import { Avatar,AvatarImage, AvatarFallback } from "@/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/components/dropdown-menu";
import { User } from "lucide-react";
import { RouterPathsType } from "@/app/router/RouterPaths";
import { useNavigate } from "react-router";
import { cn } from "@/ui/lib/utils";
import { NotificationBadge } from "../notification/NotificationBadge";

type ToolbarProps = {
  className?: string;
  children?: React.ReactNode;
};
const Toolbar = ({ className, children, ...props }: ToolbarProps) => (
  <ToolbarPrimitive.Root
    className={cn(
      "flex h-10 w-full space-x-1 p-1 shadow-sm bg-sidebar",
      className
    )}
    {...props}
  >
    {children}
  </ToolbarPrimitive.Root>
);
Toolbar.displayName = ToolbarPrimitive.Root.displayName;

type ToolbarButtonProps = {
  inset?: boolean;
  className?: string;
  children?: React.ReactNode;
};
const ToolbarButton = ({
  inset,
  className,
  children,
  ...props
}: ToolbarButtonProps) => (
  <ToolbarPrimitive.Button
    className={cn(
      "relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-lg outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
  </ToolbarPrimitive.Button>
);
ToolbarButton.displayName = ToolbarPrimitive.Button.displayName;

type ToolbarIconProps = {
  icon: React.ReactElement<SVGElement>;
  className: string;
  href: string;
};
const ToolbarIcon = ({ icon, className, href, ...props }: ToolbarIconProps) => (
  <ToolbarPrimitive.Link
    className={cn(
      "relative flex items-center rounded-full outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
    href={href}
  >
    {icon}
  </ToolbarPrimitive.Link>
);
ToolbarIcon.displayName = ToolbarPrimitive.Link.displayName;

type ToolbarBadgeProps = {
  href: string;
  count?: number;
  className?: string;
  iconSize?: number;
  pingClassName?: string;
};

const ToolbarBadge = ({
  href,
  count = 0,
  iconSize = 24,
  className,
  ...props
}: ToolbarBadgeProps) => (
  <ToolbarPrimitive.Link
    className={cn(
      "hidden min-[360px]:flex relative p-2 bg-none hover:bg-none items-center rounded-full outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    href={href}
    {...props}
  >
    <NotificationBadge count={count} iconSize={iconSize} iconClassName="text-sidebar-primary-foreground" className="hover:bg-none"/>
  </ToolbarPrimitive.Link>
);
ToolbarBadge.displayName = ToolbarPrimitive.Link.displayName;

type ToolbarAvatarLinkProps = {
  href: string;
  imageSrc: string;
  className?: string;
};
const ToolbarAvatarLink = ({
  href,
  imageSrc,
  className,
  ...props
}: ToolbarAvatarLinkProps) => (
  <ToolbarPrimitive.Link
    className={cn(
      "relative flex items-center rounded-full outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    href={href}
    {...props}
  >
    <Avatar>
      <AvatarImage src={imageSrc} />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  </ToolbarPrimitive.Link>
);
ToolbarAvatarLink.displayName = ToolbarPrimitive.Link.displayName;

type ToolbarAvatarDropdownProps = {
  imageSrc: string;
  paths: RouterPathsType[];
  className?: string;
};
const ToolbarAvatarDropdown = ({
  imageSrc,
  paths,
  className,
}: // ...props
ToolbarAvatarDropdownProps) => {
  const navigate = useNavigate();
  return (
    // <ToolbarPrimitive.Button
    //   className={cn(
    //     "relative flex items-center rounded-full outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    //     className
    //   )}
    //   {...props}
    // >
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "relative flex items-center rounded-full outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer",
          className
        )}
      >
        <Avatar>
          <AvatarImage src={imageSrc} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-accent">
        {/* <DropdownMenuLabel>Account</DropdownMenuLabel>
      <DropdownMenuSeparator /> */}
        {paths.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="p-2 hover:bg-primary focus:bg-primary rounded-sm"
          >
            {/* use "window.location.href = item.ur" if react-router is not used */}
            <button
              className="container flex justify-around gap-2 items-center cursor-pointer hover:text-sidebar-primary-foreground dark:hover:text-black"
              onClick={() => navigate(item.url)}
              >
              {item.icon ? <item.icon /> : null}
              <span >{item.title}</span>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    // </ToolbarPrimitive.Button>
  );
};
ToolbarAvatarDropdown.displayName = ToolbarPrimitive.Button.displayName;

type ToolbarGroupProps = {
  children: React.ReactNode;
  className?: string;
};

const ToolbarGroup = ({ children, className }: ToolbarGroupProps) => (
  <div
    className={cn(
      "flex flex-row items-center justify-between gap-5",
      className
    )}
  >
    {children}
  </div>
);

export {
  Toolbar,
  ToolbarButton,
  ToolbarIcon,
  ToolbarAvatarLink,
  ToolbarAvatarDropdown,
  ToolbarBadge,
  ToolbarGroup,
};
