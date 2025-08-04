"use client";
import { useState } from "react";

export function useViewModel() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => setCollapsed((prev) => !prev);

    // You can add more sidebar logic here

    return {
        collapsed,
        toggleSidebar,
        sidebarWidth: collapsed ? 56 : 356,
    };
}
