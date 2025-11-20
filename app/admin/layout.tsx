"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "../../components/admin/Sidebar";

const queryClient = new QueryClient();

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex min-h-screen bg-gray-50 dark:bg-black">
          {/* In a real app, you might conditionally render Sidebar based on login status, 
              but middleware handles protection. We hide sidebar on login page via route groups 
              or simply styling, but here we assume /admin/* structure */}
          <div className="hidden md:block">
             <Sidebar />
          </div>
          
          <main className="flex-1 overflow-y-auto h-screen">
            <div className="max-w-6xl mx-auto p-8">
              {children}
            </div>
          </main>
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
}
