"use client";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

import { useViewModel } from "../components/sidebar/useViewModel";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { collapsed, toggleSidebar, sidebarWidth } = useViewModel();

    return (
        <>
            <Navbar />
            <Sidebar collapse={collapsed} toggleSidebar={toggleSidebar} />
            <main
                className="min-h-[calc(100vh-56px)] flex items-center justify-center transition-all duration-300"
                style={{ marginLeft: sidebarWidth }}
            >
                {children}
            </main>
        </>
    );
}
