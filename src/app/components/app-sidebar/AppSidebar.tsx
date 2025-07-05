import { Outlet } from "react-router";

// import SidebarHeader from "./components/SidebarHeader"
// import SidebarFooter from "./components/SidebarFooter"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  SidebarProvider,
  SidebarFooter,
  useSidebar,
} from "@/ui/components/sidebar";
import { AppToolbar } from "@/app/components/app-toolbar/AppToolbar";
import { bottomPaths, routerPaths } from "@/app/router/RouterPaths";
import SidebarTrigger from "./AppSidebarTrigger";
import { useEffect, useState } from "react";
import { cn } from "@/ui/lib/utils";
// import config from "@/appgen.config";

// const menuItems = config.toolbar.menuItems;
// const filterItems = config.toolbar.filterItems;

export const AppSidebarFooter = ({ styles }: { styles?: string }) => {
  const { open } = useSidebar();
  const [show, setShow] = useState(open);

  useEffect(() => {
    if (open) setTimeout(() => setShow(open), 200);
    else setShow(open);
  }, [open]);

  if (!show) return null;

  return (
    <SidebarFooter
      className={cn("mt-auto md:mb-14 p-4 gap-0 w-[1]:hidden", styles)}
    >
      <img src="/icon.svg" alt="Icon" className="h-20 mb-4" />
      {bottomPaths.map((item) => (
        <a href={item.url} key={item.title} className="border-t-2 p-1">
          <span className="text-xs hover-highlight">{item.title}</span>
        </a>
      ))}
    </SidebarFooter>
  );
};

export const AppSidebar = ({
  side = "left",
  variant = "sidebar",
  collapsible = "icon",
}: {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset" | undefined;
  collapsible?: "icon" | "offcanvas" | "none" | undefined;
}) => {
  return (
    <SidebarProvider>
      <Sidebar
        side={side}
        variant={variant}
        collapsible={collapsible}
        className="border-none mt-16 min-w-[54px]"
      >
        <SidebarContent className="">
          <SidebarGroup>
            {/* <SidebarGroupLabel>{config.title}</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>
                {routerPaths.map((item) => (
                  <SidebarMenuItem key={item.title} className="my-1">
                    <a href={item.url}>
                      <SidebarMenuButton className="hover-highlight mr-3 min-w-[40px] cursor-pointer">
                        <div className="flex items-center gap-4">
                          <span>
                            {item.icon ? <item.icon size={24} /> : null}
                          </span>
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <AppSidebarFooter />
      </Sidebar>
      <AppToolbar
        sidebarTrigger={<SidebarTrigger className="mr-5 border-none" />}
        // menuItems={menuItems}
        // filterItems={filterItems}
      />
      <main className="mt-16 p-2 w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
