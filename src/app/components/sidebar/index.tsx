import React from "react";
import Link from "next/link";
interface SidebarProps {
    collapse: boolean;
    toggleSidebar: () => void;
}

const Sidebar = ({ collapse, toggleSidebar }: SidebarProps) => {
    const sidebarWidth = collapse ? 56 : 356;
    return (
        <aside
            className="fixed top-14 left-0 h-[calc(100vh-56px)] bg-white shadow-md flex flex-col z-40 transition-all duration-300"
            style={{ width: sidebarWidth }}
        >
            <button
                className="h-10 w-10 m-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                onClick={toggleSidebar}
                aria-label={collapse ? "Expand sidebar" : "Collapse sidebar"}
            >
                {collapse ? "→" : "←"}
            </button>
            {!collapse && (
                <div className="p-4 flex flex-col">
                    <Link href="/" className="hover:underline">
                        Dashboard Page
                    </Link>
                    <Link href="/to-do" className="hover:underline">
                        Todo Page
                    </Link>
                    <Link href="/expenses" className="hover:underline">
                        Expenses Page
                    </Link>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
