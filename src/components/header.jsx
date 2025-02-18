import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="w-full h-[100px] shadow-xl flex justify-center items-center relative bg-gray-100 dark:bg-gray-900 dark:text-white">
      <img
        src="/logo.png"
        alt="logo"
        className="w-[100px] h-[100px] object-cover border-[3px] absolute left-1 rounded-full"
      />
      <Link to="/" className="text-[25px] font-bold m-1">
        Home
      </Link>
      <Link to="/contact" className="text-[25px] font-bold m-1">
        Contact
      </Link>
      <Link to="/gallery" className="text-[25px] font-bold m-1">
        Gallery
      </Link>
      <Link to="/items" className="text-[25px] font-bold m-1">
        Items
      </Link>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute right-5 p-2 rounded-full bg-gray-300 dark:bg-gray-700"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </header>
  );
}
