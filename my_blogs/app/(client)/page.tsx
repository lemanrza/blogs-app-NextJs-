"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { BlogCard } from '@/components/client/BlogCard';
import { Blog } from '@/types/blog';
import { getBlogs } from '@/services/blogServices';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation'; 

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

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

  const handleTagClick = (tag: string) => {
    router.push(`/blogs?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <>
      <section className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
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
                blog.featured && (
                  <BlogCard
                    key={blog.id}
                    title={blog.title}
                    tags={blog.tags}
                    createdAt={new Date(blog.createdAt).toLocaleDateString()}
                    coverImage={blog.coverImage}
                    comments={blog.comments}
                    content={blog.content}
                    slug={blog.slug}
                  />
                )
              ))
            )
          )}
        </div>
      </section>

      <section className="px-6 md:px-10 py-16">
        <div className="bg-gray-50 dark:bg-gray-900 p-10 rounded-lg">
          <h3 className="font-bold text-4xl text-gray-900 dark:text-white text-center mb-8">Explore Topics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "Technology", "History", "Food", "Travel", "Politics", "Science",
              "Art", "Health", "React", "Frontend", "Education", "Entertainment"
            ].map((topic) => (
              <Badge
                key={topic}
                className="text-lg px-6 py-3 bg-white text-black text-center w-full hover:bg-gray-100 dark:bg-[#FAFAFA] dark:text-black dark:hover:bg-gray-200 transition duration-200 cursor-pointer"
                onClick={() => handleTagClick(topic)}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className='px-10 py-6 mb-6 '>
          <div className='flex items-center justify-between bg-black dark:bg-white rounded-2xl p-6 '>
          <div className='p-6'>
            <h2 className='text-white font-bold text-3xl mb-5 dark:text-black'>Stay Updated</h2>
            <p className='text-white text-m max-w-lg dark:text-black'>Subscribe to our newsletter to receive the latest blogs and updates directly in your inbox.</p>
          </div>

          <Button variant={'secondary'} className='cursor-pointer'>Subscribe Now</Button>

          </div>
        </section>

    </>
  );
};

export default Home;
