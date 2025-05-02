"use client"

import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '../ui/mode-toggle'
import { Button } from '../ui/button'
import LoginPage from '@/app/auth/login/[[...sign-in]]/page'
import { LogIn, UserPlus } from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'

const ClientHeader = () => {
    const { isSignedIn, user } = useUser();
    return (
        <div className="bg-gray-100 dark:bg-black-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <header className="sticky w-full z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border-b border-gray-300/30 dark:border-gray-700/30 transition-colors duration-300">
                <nav className="container mx-auto px-6 py-3">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-primary-light dark:text-primary-dark">
                            ModernBlog
                        </Link>
                        <div className="hidden md:flex space-x-6 items-center">
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
                            {/* 
                            <Button variant={'outline'}>
                            <Link href={"/auth/register"} className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">
                                Sign-up
                            </Link>
                            </Button> */}
                            {isSignedIn ? (
                                <>
                                    <UserButton />
                                </>
                            ) : (
                                <>
                                    <Button>

                                        <Link
                                            prefetch={true}
                                            className={`hover:scale-95 transition`}
                                            href={"/auth/login"}
                                        >
                                            Log-in
                                        </Link>
                                    </Button>

                                    <Button variant={'outline'}>
                                        <Link
                                            prefetch={true}
                                            className={`hover:scale-95 transition`}
                                            href={"/auth/register"}
                                        >
                                            Sign-up
                                        </Link>
                                    </Button>
                                </>
                            )}
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

