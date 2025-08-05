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
            <main className="h-screen pt-16 px-2 pb-2 transition-all duration-300" style={{ marginLeft: sidebarWidth }}>
                <div className="h-full w-full flex items-center justify-center">{children}</div>
            </main>
        </>
    );
}
