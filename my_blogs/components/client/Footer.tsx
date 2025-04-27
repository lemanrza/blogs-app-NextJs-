import { Copyright, Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const Footer = () => {
  return (
    <>
    <div className='flex flex-col'>

    <div className='flex justify-between p-8 py-10 border border-t-1'>
        <div className='max-w-[300px]'>
            <h3 className='font-bold mb-4'>Modern Blog</h3>
            <p className='text-xs mb-4'>A modern blog application built with Next.js, Tailwind CSS, and shadcn/ui.</p>
            <div className='flex gap-1'>
                <Twitter size={20}/>
                <Facebook size={20}/>
                <Instagram size={20}/>
                <Github size={20}/>
                <Linkedin size={20}/>
            </div>
        </div>

        <div>
          <h3 className='font-bold mb-4'>Quick Links</h3>
          <div className='flex flex-col text-sm gap-3'>
            <Link href={"/"}>Home</Link>
            <Link href={"/blogs"}>Blogs</Link>
            <Link href={"/comments"}>Comments</Link>
            <Link href={"/contact"}>Contact</Link>
          </div>
          </div>

          <div>
            <h3 className='font-bold mb-4'>Categories</h3>
            <div className='flex flex-col text-sm gap-3'>
            <Link href={"/blogs"}>Technology</Link>
            <Link href={"/blogs"}>History</Link>
            <Link href={"/blogs"}>Food</Link>
            <Link href={"/blogs"}>GTravel</Link>
            </div>
          </div>

          <div>
            <h3 className='font-bold mb-4'>Subscribe</h3>
            <p className='mb-4 text-xs'>Subscribe to our newsletter to get the latest updates.</p>

            <div>
              <Input placeholder='Your email' className='mb-3'/>
              <Button className='w-full'>Subscribe</Button>
            </div>
          </div>
    </div>

    <div className='flex items-center justify-center py-10 border border-t-1 gap-1'>
    <Copyright size={13}/>
      <p className='text-sm'>2025 ModernBlog. All rights reserved.</p>
    </div>

    </div>
    </>
  )
}

export default Footer