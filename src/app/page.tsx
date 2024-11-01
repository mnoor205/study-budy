import Navigation from "@/components/navbar";
import Image from "next/image";

export default function Quiz() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Navigation />
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-16 lg: xl:py-16">
                    <div className="container px-4 md:px-6 ms-20">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center h-full">
                            <div className="flex flex-col justify-center">
                                <h1 className="text-8xl bg-gradient-to-b from-blue-400 to-cyan-300 text-transparent bg-clip-text relative font-bold tracking-tighter sm:text-8xl xl:text-8xl/none">
                                    The only study tool you'll ever need
                                </h1>
                            </div>
                            <div className="flex justify-center items-center">
                                <Image 
                                    src="https://media.tenor.com/CigpzapemsoAAAAi/hi-robot.gif" 
                                    alt="Description of GIF" 
                                    width={500} 
                                    height={300}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
