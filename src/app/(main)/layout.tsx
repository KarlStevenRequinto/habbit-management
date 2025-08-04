import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "../globals.css";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const SIDEBAR_WIDTH = 356; // px

    return (
        <>
            <Navbar />
            <Sidebar />
            <main className={`min-h-[calc(100vh-56px)] ml-[${SIDEBAR_WIDTH}px] flex items-center justify-center transition-all duration-300`}>
                {children}
            </main>
        </>
    );
}
