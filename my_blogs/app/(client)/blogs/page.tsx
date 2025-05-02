'use client'

import { BlogCard } from '@/components/client/BlogCard'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getBlogs } from '@/services/blogServices'
import { Blog } from '@/types/blog'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function  Blogs () {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('newest');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const router = useRouter();
  const searchParams = useSearchParams();

//   const blogs= await prisma.blog.findMany()
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const allBlogs = await getBlogs(null);
        setBlogs(allBlogs);
        setFilteredBlogs(allBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    const tag = searchParams.get('tag');
    if (tag) {
      setTagFilter(tag);
    } else {
      setTagFilter('all');
    }
  }, [searchParams]);

  useEffect(() => {
    let updatedBlogs = [...blogs];

    if (tagFilter !== 'all') {
      updatedBlogs = updatedBlogs.filter(blog =>
        blog.tags?.some(tag => tag.toLowerCase() === tagFilter.toLowerCase())
      );
    }

    if (searchTerm.trim() !== '') {
      updatedBlogs = updatedBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === 'newest') {
      updatedBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOption === 'oldest') {
      updatedBlogs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortOption === 'asc') {
      updatedBlogs.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'desc') {
      updatedBlogs.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === 'most-comments') {
      updatedBlogs.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
    }

    setFilteredBlogs(updatedBlogs);
  }, [blogs, tagFilter, sortOption, searchTerm]);

  const handleTagChange = (value: string) => {
    setTagFilter(value);
    const params = new URLSearchParams(window.location.search);
    if (value === 'all') {
      params.delete('tag');
    } else {
      params.set('tag', value);
    }
    router.push(`/blogs?${params.toString()}`);
  };

  const handleClearAll = () => {
    setTagFilter('all');
    const params = new URLSearchParams(window.location.search);
    params.delete('tag');
    router.push(`/blogs`);
  };

  return (
    <div className='mx-auto max-w-4xl p-8'>
      <h1 className='font-bold text-3xl'>Blogs</h1>

      <div className='flex flex-col mb-5'>
        <div className='flex gap-5 items-center my-4'>
          <Input
            className='max-w-md'
            placeholder='Search blogs...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select value={sortOption} onValueChange={(value) => setSortOption(value)}>
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

          <Select value={tagFilter} onValueChange={handleTagChange}>
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

        {tagFilter !== 'all' && (
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium">Active Filters:</span>
            <div className="flex items-center gap-2 bg-[#F5F5F5] px-3 py-1 rounded-full text-sm">
              Tag: {tagFilter}
              <span
                className='cursor-pointer font-bold'
                onClick={handleClearAll}
              >
                ×
              </span>
            </div>
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1 bg-[#F5F5F5] px-3 py-1 rounded-full text-sm font-semibold cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlogs.map((blog, index) => (
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
          
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  )
}

// app/(client)/blogs/page.tsx
// import { BlogCard } from '@/components/client/BlogCard'
// import { prisma } from '@/lib/prisma'

// export default async function Blogs() {
//   // Fetch the blogs from the database
//   const blogs = await prisma.blog.findMany()

//   return (
//     <div className='mx-auto max-w-4xl p-8'>
//       <h1 className='font-bold text-3xl'>Blogs</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {blogs.map((blog, index) => (
//           <BlogCard
//             key={index}
//             title={blog.title}
//             tags={blog.tags}
//             createdAt={new Date(blog.createdAt).toLocaleDateString()}
//             coverImage={blog.coverImage}
//             comments={blog.comments}
//             content={blog.content}
//             slug={blog.slug}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// import { BlogCard } from '@/components/client/BlogCard'
// import { prisma } from '@/lib/prisma'
// import { Prisma } from '@prisma/client'

// export default async function Blogs() {
//   // Fetch the blogs from the database with the necessary fields and related comments if needed
//   const blogs = await prisma.blog.findMany({
//     include: {
//       comments: true, // Make sure to include the related comments if needed
//     },
//   })

//   return (
//     <div className='mx-auto max-w-4xl p-8'>
//       <h1 className='font-bold text-3xl'>Blogs</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {blogs.map((blog, index) => (
//           <BlogCard
//             key={index}
//             title={blog.title}
//             tags={blog.tags || []} // Ensure tags is an array
//             createdAt={new Date(blog.createdAt).toLocaleDateString()} // Format the date
//             coverImage={blog.coverImage || '/default-image.jpg'} // Handle fallback image
//             comments={blog.comments || []} // Handle empty comments if no comments exist
//             content={blog.content}
//             slug={blog.slug}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

