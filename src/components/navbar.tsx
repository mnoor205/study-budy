import Link from "next/link"
import { Button } from "./ui/button"



export default async function Navigation() {

    return (
        <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10 dark:bg-white/5 bg-zinc-50 backdrop-blur-lg transition-all">
            <aside className="flex items-center gap-2 bg-gradient-to-b from-blue-400 to-cyan-300  text-transparent bg-clip-text relative">
                <Link
                    href='/'
                    className='text-xl font-bold '>
                    <span>Study Budy</span>
                </Link>
            </aside>


            <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">

                <ul className="flex items-center justify-center gap-14">

                    {/* <Link
                        href="/"
                        className="btn btn-ghost rounded-lg">
                        Home
                    </Link>

                    <Link
                        href="/services"
                        className="btn btn-ghost rounded-lg">
                        Services
                    </Link>

                    <Link
                        href="/pricing"
                        className="btn btn-ghost rounded-lg">
                        Pricing
                    </Link>

                    <Link
                        href="/about"
                        className="btn btn-ghost rounded-lg">
                        About Us
                    </Link> */}

                </ul>
            </nav>

            <div className="hidden md:block lg:block">

                <aside className="flex gap-2 items-center">

                    <Button className='btn btn-ghost py-5 rounded-md'>
                       <Link
                        href='/home'
                        >
                        Dashboard
                    </Link> 
                    </Button>
                    
                </aside>
            </div>
        </div>
    )
}