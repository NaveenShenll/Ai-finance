// Sidebar/navigation shell. Desktop uses Sidebar (a persistent rail); mobile
// swaps to SidebarDrawer (a Sheet). Both share SidebarContent so nav markup
// only has to be written once by the consumer.
export { Sidebar } from "./sidebar";
export type { SidebarProps } from "./sidebar";

export { SidebarDrawer } from "./sidebar-drawer";
export type { SidebarDrawerProps } from "./sidebar-drawer";

export { SidebarContent } from "./sidebar-content";
export type { SidebarContentProps } from "./sidebar-content";
