/*
Include the title, url, and icon for each route that is displayed in the navigation bar.
*/
import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  Home,
  LucideProps,
  User,
  Settings,
  History,
  Bookmark,
} from "lucide-react";

import paths from "./paths";

export type RouterPathsType = {
  title: string;
  url: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export const routerPaths: RouterPathsType[] = [

  {
    title: "Home",
    url: `/${paths.home}`,
    icon: Home,
  },
  {
    title: "Saved",
    url: `/${paths.saved}`,
    icon: Bookmark,
  },
  {
    title: "History",
    url: `/${paths.history}`,
    icon: History,
  },
];

export const bottomPaths: RouterPathsType[] = [
  {
    title: "Terms of Use",
    url: `/${paths.termsOfService}`,
  },
  {
    title: "Privacy Policy",
    url: `/${paths.privacyPolicy}`,
  },
];

export const accountPaths: RouterPathsType[] = [
  {
    title: "Account",
    url: `/${paths.account}`,
    icon: User,
  },
  {
    title: "Settings",
    url: `/${paths.settings}`,
    icon: Settings,
  },
];
