"use client"
import { BlogCard } from '@/components/client/BlogCard'
import { Input } from '@/components/ui/input'
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getBlogs } from '@/services/blogServices'
import { Blog } from '@/types/blog'
import { Select } from '@radix-ui/react-select'
import React, { useEffect, useState } from 'react'

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
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
      <div className='mx-auto max-w-4xl p-8'>
        <h1 className='font-bold text-3xl'>Blogs</h1>
        <div className='flex gap-5 items-center'>
          <Input className='max-w-md my-4' placeholder='Search blogs...' />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="asc">A-Z</SelectItem>
                <SelectItem value="desc">Z-A</SelectItem>
                <SelectItem value="most-comments">Most Comments</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='all'>All Tags</SelectItem>
                <SelectItem value="ai">AI</SelectItem>
                <SelectItem value="azerbaijan">Azerbaijan</SelectItem>
                <SelectItem value="cooking">Cooking</SelectItem>
                <SelectItem value="culture">Culture</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="eco-friendly">Eco-friendly</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="italian-cuisine">Italian Cuisine</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="machine-learning">Machine Learning</SelectItem>
                <SelectItem value="meditation">Meditation</SelectItem>
                <SelectItem value="mental-health">Mental Health</SelectItem>
                <SelectItem value="mindfulness">Mindfulness</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="recipes">Recipes</SelectItem>
                <SelectItem value="sustainability">Sustainability</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="wellness">Wellness</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : blogs.length > 0 ? (
          <div className=" grid grid-cols-2 gap-6">
            {blogs.map((blog, index) => (
              <BlogCard
                key={index}
                title={blog.title}
                tags={blog.tags}
                createdAt={new Date(blog.createdAt).toLocaleDateString()}
                coverImage={blog.coverImage}
                comments={blog.comments}
                content={blog.content}
                slug={blog.slug}
              />
            ))}
          </div>
        ) : (
          <div>No blogs found.</div>
        )}
      </div>

    </>
  )
}

export default Blogs