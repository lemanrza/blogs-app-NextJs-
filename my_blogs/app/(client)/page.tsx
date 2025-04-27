"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { blogs } from '@/data/blogs';
import { BlogCard } from '@/components/client/BlogCard';
import { Blog } from '@/types/blog';
import { getBlogs } from '@/services/blogServices';
const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const allBlogs = await getBlogs(null);
        setBlogs(allBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);
  return (
    <>
      <section className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4">
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
      <section className="py-16 px-6 md:px-10">
        <div className="flex justify-between items-center pb-8">
          <h2 className="font-bold text-4xl text-gray-900 dark:text-white">Featured Blogs</h2>
          <Link href="/blogs">
            <p className="text-sm p-3 font-medium cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-200 rounded transition">View All →</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {loading ? (
            <div className="w-full h-48 flex justify-center items-center text-lg text-gray-500">Loading...</div>
          ) : (
            blogs.length === 0 ? (
              <div className="w-full h-48 flex justify-center items-center text-lg text-gray-500">No blogs available</div>
            ) : (
              blogs.map((blog) => (
                blog.featured ? (
                  <BlogCard
                    key={blog.id}
                    title={blog.title}
                    tags={blog.tags}
                    createdAt={new Date(blog.createdAt).toLocaleDateString()}
                    coverImage={blog.coverImage}
                    comments={blog.comments}
                    content={blog.content}
                  />
                ) : null
              ))
            )
          )}
        </div>
      </section>

    </>
  )
}

export default Home