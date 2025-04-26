"use client"

import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ui/mode-toggle'

const ClientHeader = () => {
    return (
        <div className="bg-gray-100 dark:bg-black-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <header className="fixed w-full z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border-b border-gray-300/30 dark:border-gray-700/30 transition-colors duration-300">
                <nav className="container mx-auto px-6 py-3">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-primary-light dark:text-primary-dark">
                            ModernBlog
                        </Link>
                        <div className="hidden md:flex space-x-6">
                            <Link href="/" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">
                                Home
                            </Link>
                            <Link href="/blogs" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">
                                Blogs
                            </Link>
                            <Link href="/comments" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">
                                Comments
                            </Link>
                            <Link href="/contact" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">
                                Contact
                            </Link>
                            <Link href="/admin" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">
                                Admin
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <ModeToggle />
                            <button id="mobileMenuToggle" className="md:hidden focus:outline-none" aria-label="Toggle mobile menu">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
                <div id="mobileMenu" className="md:hidden hidden bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg transition-colors duration-300">
                    <Link href="/" className="block py-2 px-4 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                        Home
                    </Link>
                    <Link href="/blogs" className="block py-2 px-4 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                        Blogs
                    </Link>
                    <Link href="/projects" className="block py-2 px-4 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                        Projects
                    </Link>
                    <Link href="/contact" className="block py-2 px-4 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                        Contact
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default ClientHeader

