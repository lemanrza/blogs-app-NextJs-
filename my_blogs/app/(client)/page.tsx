import React from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
const Home = () => {
  return (
    <>
  <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl md:text-6xl px-90 font-bold mb-6">
        Discover Insights, Share Knowledge
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-8 text-lg md:text-xl">
        Explore a world of diverse topics from technology to culture, written by passionate experts.
      </p>
      <div className="flex gap-4">
        <Link href="/blogs">
          <Button size="lg">
            Browse Blogs →
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" size="lg">
            Contact Us
          </Button>
        </Link>
      </div>
    </section>
    </>
  )
}

export default Home