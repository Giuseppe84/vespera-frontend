"use client"

import { ReactNode } from "react"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import Header from "@/components/layout/header"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"


interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: user, isLoading } = useCurrentUser()

  if (isLoading) return null

  return (
    <TooltipProvider>
      <div className="flex h-screen flex-col">




        {/* HEADER FISSO */}
        <div className="sticky top-0 z-40 bg-background border-b">
          <Header
            isAuthenticated={!!user}
            avatarUrl={user?.avatarUrl}
            user={user}
          />

          <div className="h-14 flex items-center gap-2 px-4">

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </TooltipProvider>

  )
}