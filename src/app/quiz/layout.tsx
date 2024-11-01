import Sidebar from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar /> {/* Render the Sidebar here */}
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}
