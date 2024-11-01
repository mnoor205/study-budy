import Sidebar from "@/components/sidebar";

export default function Home() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6"> 
                <h1 className="text-xl font-bold">This is the Flashcards page</h1>
            </div>
        </div>
    );
}
