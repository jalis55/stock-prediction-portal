import React, { useContext, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/AuthProvider';

export default function Header() {
    const [open, setOpen] = useState(false);
    const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext);
    const navigate=useNavigate()

    const navLinks = [
        { label: 'Login', href: '/login' },
        { label: 'Register', href: '/register' },
    ];
    const handleLogout=()=>{
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
        navigate('/login');

    }

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
                    {!isLoggedIn && navLinks.map(({ label, href }) => (

                        <Link key={label} to={href} className="text-gray-700 hover:text-indigo-600 transition-colors">
                            <Button variant="outline">{label}</Button>
                        </Link>

                        
                    ))}
                    
                    { isLoggedIn && <Button className="bg-amber-800" onClick={handleLogout} variant="outline">Logout</Button>}
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

                        <Link key={label} to={href} className="text-gray-700 hover:text-indigo-600 transition-colors">
                            <Button variant="outline">{label}</Button>
                        </Link>
                    ))}
                   { isLoggedIn && <Button onClick={handleLogout} variant="outline">Logout</Button>}
                </nav>
            </div>
        </header>
    );
}