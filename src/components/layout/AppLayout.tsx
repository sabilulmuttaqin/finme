"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Inactivity Auto-Logout
  const updateActivity = useCallback(() => {
    localStorage.setItem('lastActivity', Date.now().toString());
  }, []);

  useEffect(() => {
    // Initialize activity timestamp
    if (!localStorage.getItem('lastActivity')) {
      updateActivity();
    }

    const checkInactivity = async () => {
      const lastActivity = parseInt(localStorage.getItem('lastActivity') || '0', 10);
      const currentTime = Date.now();
      
      if (currentTime - lastActivity >= INACTIVITY_TIMEOUT) {
        // Log out user
        await supabase.auth.signOut();
        localStorage.removeItem('lastActivity');
        router.push('/login');
      }
    };

    // Check every minute
    const intervalId = setInterval(checkInactivity, 60 * 1000);

    // Activity event listeners
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    
    activityEvents.forEach((eventName) => {
      document.addEventListener(eventName, updateActivity);
    });

    return () => {
      clearInterval(intervalId);
      activityEvents.forEach((eventName) => {
        document.removeEventListener(eventName, updateActivity);
      });
    };
  }, [updateActivity, router, supabase]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSidebar();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <MobileHeader onOpenSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      {children}
    </div>
  );
}
