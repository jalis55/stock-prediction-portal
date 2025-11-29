import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export default function Header() {
    const [open, setOpen] = useState(false);

    const navLinks = [

        { label: 'Login', href: '/login' },
        { label: 'Register', href: '/register' },
    ];

    return (
        <header className="col-span-4 col-start-1 sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold text-gray-900">
                    <Link to="/" >
                        DevHack <span className="text-indigo-600">Stocx</span>
                    </Link>
                    
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map(({ label, href }) => (

                        <Link key={label} to={href} className="text-gray-700 hover:text-indigo-600 transition-colors">
                            <Button variant="outline">{label}</Button>
                        </Link>

                        
                    ))}
                    
                    {/* <a
                        href="#contact"
                        className="ml-4 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    >
                        Get Started
                    </a> */}
                </nav>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        {open ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'
                    }`}
            >
                <nav className="flex flex-col items-center gap-4 pb-6">
                    {navLinks.map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="text-gray-700 hover:text-indigo-600"
                        >
                            {label}
                        </a>
                    ))}
                    {/* <a
                        href="#contact"
                        onClick={() => setOpen(false)}
                        className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Get Started
                    </a> */}
                </nav>
            </div>
        </header>
    );
}