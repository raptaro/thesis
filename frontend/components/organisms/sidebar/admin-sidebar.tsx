"use client";
import { LayoutDashboard, ChartNoAxesGantt } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/molecules/nav-user";
import Image from "next/image";

import Link from "next/link";
const menu_items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    url: "/admin/user-management",
    icon: ChartNoAxesGantt,
  },
  {
    title: "Doctor Management",
    url: "/admin/doctor-management",
    icon: ChartNoAxesGantt,
  },
  {
    title: "Secretary Management",
    url: "/admin/secretary-management",
    icon: ChartNoAxesGantt,
  },
];

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
  },
};
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex">
          <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
            <Image
              className="aspect-square h-full w-full"
              src="/logo.png"
              alt="logo"
              width={64}
              height={64}
            />
          </span>
          <h1 className="ms-2 text-2xl">MediTrakk</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarGroup>
                {menu_items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarGroup>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
