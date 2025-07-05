import config from "@/appgen.config";
import AppNavbar from "@/app/components/app-navbar/AppNavbar";
import { AppSidebar } from "@/app/components/app-sidebar/AppSidebar";
import { Outlet } from "react-router";
import { AppToolbar } from "./app-toolbar/AppToolbar";

export const AppNav = () => {
  if (config.navigationType === "side") return <AppSidebar />;

  if (config.navigationType === "bottom")
    return (
      <>
        <AppToolbar />
        <AppNavbar />
      </>
    );

  return <Outlet />;
};
