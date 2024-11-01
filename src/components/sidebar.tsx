import { Bot, CreditCard, Home, Settings } from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-200 shadow-lg p-5">
      <h2 className="text-3xl font-bold tracking-tighter mb-4 bg-gradient-to-b from-blue-400 to-cyan-400 text-transparent bg-clip-text relative">
        Study Budy
      </h2>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="flex items-center w-full text-left text-gray-700 p-3 rounded-xl hover:bg-blue-500/15">
            <Home className="h-6 w-6 mr-2" aria-hidden="true" />
            Home
          </Link>
        </li>
        <li>
          <Link href="/quiz/new" className="flex items-center w-full text-left text-gray-700 p-3 rounded-xl hover:bg-blue-500/15">
            <Bot className="h-6 w-6 mr-2" aria-hidden="true" />
            Quiz
          </Link>
        </li>
        <li>
          <Link href="/flashcards" className="flex items-center w-full text-left text-gray-700 p-3 rounded-xl hover:bg-blue-500/15">
            <CreditCard className="h-6 w-6 mr-2" aria-hidden="true" />
            Flashcards
          </Link>
        </li>
        <li>
          <Link href="/settings" className="flex items-center w-full text-left text-gray-700 p-3 rounded-xl hover:bg-blue-500/15">
            <Settings className="h-6 w-6 mr-2" aria-hidden="true" />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
