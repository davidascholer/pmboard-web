// import type { Meta, StoryObj } from "@storybook/react";
// import { AppSidebar } from "./AppSidebar";
// import { ComponentProps } from "react";
// import {
//   Calendar,
//   Home as HomeIcon,
//   Inbox,
//   Search,
//   Settings,
// } from "lucide-react";
// import {
//   within,
//   expect,
//   waitFor,
// } from "@storybook/test";
// import "@/index.css";
// import { SidebarContentType } from "@/ui/components/sidebar/utils/types";

// // Menu items.
// const items: SidebarContentType[] = [
//   {
//     title: "Home",
//     url: "/home",
//     icon: HomeIcon,
//   },
//   {
//     title: "Inbox",
//     url: "/inbox",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "/calendar",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "/search",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "/settings",
//     icon: Settings,
//   },
// ];
// type StoryProps = ComponentProps<typeof AppSidebar>;

// const meta = {
//   title: "Components/AppSidebar",
//   component: AppSidebar,
//   parameters: {
//     // Optional parameter to center the component in the Canvas.
//     layout: "centered",
//   },
//   tags: ["autodocs"],
//   argTypes: {
//     side: {
//       options: ["left", "right"],
//       control: { type: "select" },
//     },
//     variant: {
//       options: ["sidebar", "floating", "inset"],
//       control: { type: "select" },
//     },
//     collapsible: {
//       options: ["offcanvas", "icon", "none"],
//       control: { type: "select" },
//     },
//   },
// } satisfies Meta<StoryProps>;

// export default meta;

// type Story = StoryObj<typeof meta>;

// // offcanvas sidebar
// export const Primary: Story = {
//   args: {
//     items: items,
//   },
// };

// // icon sidebar
// export const Icon: Story = {
//   args: {
//     items: items,
//     collapsible: "icon",
//   },
// };

// export const None: Story = {
//   args: {
//     items: items,
//     collapsible: "none",
//   },
// };

// /* Tests */

// Primary.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);

//   const sidebarElement = canvas.getByTestId("sidebar");
//   const sidebarMenuElement = canvas.getByTestId("sidebar-menu");
//   const sidebarTriggerElement = canvas.getByTestId("sidebar-trigger");

//   await waitFor(() => expect(sidebarElement).toBeInTheDocument());
//   await waitFor(() => expect(sidebarMenuElement).toBeInTheDocument());
//   await waitFor(() => expect(sidebarTriggerElement).toBeInTheDocument());

//   let children = sidebarMenuElement.children;

//   // Test the child elements of the sidebar menu to make sure each text matches the tite of the menu item
//   for (const item in items) {
//     await waitFor(() => {
//       const text = items[item].title;
//       const element = children[item];
//       const rect = element.getBoundingClientRect();
//       expect(children[item].textContent).toBe(text);
//       expect(children[item]).toBeVisible();
//       expect(rect.right).toBeGreaterThan(0);
//     });
//   }

//   // Test the sidebar trigger to make sure it is clickable
//   await sidebarTriggerElement.click();
//   await new Promise((r) => setTimeout(r, 1000));

//   children = sidebarMenuElement.children;

//   // Test the child elements of the sidebar menu again to make sure each text no longer exists
//   for (const item in items) {
//     const element = children[item];
//     const rect = element.getBoundingClientRect();
//     await waitFor(() => {
//       // Verify the right side is out of view
//       expect(rect.right).toBeLessThanOrEqual(0);
//     });
//   }
// };

// Icon.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);

//   const sidebarElement = canvas.getByTestId("sidebar");
//   const sidebarMenuElement = canvas.getByTestId("sidebar-menu");
//   const sidebarTriggerElement = canvas.getByTestId("sidebar-trigger");
//   const initialMenuWidth = sidebarMenuElement.getBoundingClientRect().width;

//   await waitFor(() => expect(sidebarElement).toBeInTheDocument());
//   await waitFor(() => expect(sidebarMenuElement).toBeInTheDocument());
//   await waitFor(() => expect(sidebarTriggerElement).toBeInTheDocument());

//   let children = sidebarMenuElement.children;

//   // Test the child elements of the sidebar menu to make sure each text matches the tite of the menu item
//   for (const item in items) {
//     const text = items[item].title;
//     const element = children[item];
//     const icon = element.querySelector("svg");
//     const rect = element.getBoundingClientRect();
//     const iconRect = icon?.getBoundingClientRect();
//     await waitFor(() => {
//       expect(children[item].textContent).toBe(text);
//       expect(children[item]).toBeVisible();
//       expect(icon).toBeVisible();
//       expect(rect.right).toBeGreaterThan(iconRect?.width || Infinity);
//     });
//   }

//   // Test the sidebar trigger to make sure it is clickable
//   await sidebarTriggerElement.click();
//   await new Promise((r) => setTimeout(r, 1000));

//   children = sidebarMenuElement.children;

//   // Test the child elements of the sidebar menu again to make sure each text no longer exists
//   for (const item in items) {
//     const text = items[item].title;
//     const element = children[item];
//     const icon = element.querySelector("svg");
//     const rect = element.getBoundingClientRect();
//     const iconRect = icon?.getBoundingClientRect();
//     await waitFor(() => {
//       expect(children[item].textContent).toBe(text);
//       expect(children[item]).toBeVisible();
//       expect(icon).toBeVisible();
//       // Verify the size is between the icon size and the initial menu width
//       expect(rect.right).toBeLessThan(initialMenuWidth);
//       expect(rect.right).toBeGreaterThan(iconRect?.right || Infinity);
//     });
//   }
// };

// None.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);

//   const sidebarElement = canvas.getByTestId("sidebar");
//   const sidebarMenuElement = canvas.getByTestId("sidebar-menu");
//   const sidebarTriggerElement = canvas.getByTestId("sidebar-trigger");
//   const initialMenuWidth = sidebarMenuElement.getBoundingClientRect().width;

//   await waitFor(() => expect(sidebarElement).toBeInTheDocument());
//   await waitFor(() => expect(sidebarMenuElement).toBeInTheDocument());
//   await waitFor(() => expect(sidebarTriggerElement).toBeInTheDocument());

//   let children = sidebarMenuElement.children;

//   // Test the child elements of the sidebar menu to make sure each text matches the tite of the menu item
//   for (const item in items) {
//     await waitFor(() => {
//       const text = items[item].title;
//       const element = children[item];
//       const rect = element.getBoundingClientRect();
//       expect(children[item].textContent).toBe(text);
//       expect(children[item]).toBeVisible();
//       expect(rect.right).toBeGreaterThan(0);
//     });
//   }

//   // Test the sidebar trigger to make sure it is clickable
//   await sidebarTriggerElement.click();
//   await new Promise((r) => setTimeout(r, 1000));

//   children = sidebarMenuElement.children;

//   // Test the child elements of the sidebar menu again to make sure each text still exists
//   for (const item in items) {
//     const element = children[item];
//     const rect = element.getBoundingClientRect();
//     await waitFor(() => {
//       // Verify the size did not shrink
//       expect(rect.right).toBeGreaterThanOrEqual(initialMenuWidth);
//     });
//   }
// };
